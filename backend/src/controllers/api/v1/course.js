const courseCollection = require('../../../model/course');
const accountCollection = require('../../../model/account');
const { ObjectId } = require('mongoose').Types;
exports.msg = async (ctx) => {
  ctx.body = 'course msg from aws';
};

exports.index = async (ctx) => {
  try {
    const res = await courseCollection.find({});
    ctx.body = res;
  } catch (e) {
    console.log(e);
  }
};

exports.store = async (ctx) => {
  const { body } = ctx.request;
  const accountRes = await accountCollection.findOne({ accountEmail: body.createdBy });
  if (!accountRes) {
    ctx.status = 404;
    ctx.body = {
      msg: 'Account email does not exist',
    };
    return;
  } else if (!accountRes.role.match(/teacher/i)) {
    //TODO: isTeacherRole function
    ctx.status = 403;
    ctx.body = {
      msg: 'This account is not allowed to perform the operation',
    };
    return;
  }
  const entryCode = () => {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let courseEntryCode = '';
    for (let i = 0; i < 6; i++) {
      let randomPoz = Math.floor(Math.random() * charSet.length);
      courseEntryCode += charSet.substring(randomPoz, randomPoz + 1);
    }
    return courseEntryCode;
  };

  let duplicateState = true;
  while (duplicateState) {
    try {
      let courseEntryCode = entryCode();
      const course = new courseCollection({ ...body, courseEntryCode });
      await course.save();
      duplicateState = false;
      const accountEmail = body.createdBy;
      const updateAccount = await accountCollection.updateOne(
        { accountEmail: accountEmail },
        { $addToSet: { course: courseEntryCode } },
      );
      const updateCourse = await courseCollection.updateOne(
        { courseEntryCode: courseEntryCode },
        { $addToSet: { rosters: accountEmail } },
      );
      //identify whether update
      if (updateAccount.n && updateCourse) {
        ctx.status = 201;
        ctx.body = await getCourseListByAccount(accountEmail);
      } else {
        ctx.status = 400;
        ctx.body = { msg: 'Unknown error, please try again.' };
      }
    } catch (error) {
      if (
        error.message.startsWith(
          'E11000 duplicate key error collection: easy-grade.courses index: courseEntryCode_1 dup key',
        )
      ) {
        duplicateState = true;
        const msg = 'Entry code is duplicate';
        ctx.status = 404;
        ctx.body = msg;
      } else {
        duplicateState = false;
        ctx.status = 403;
        ctx.body = {
          msg: error.message,
        };
        console.log(error);
      }
    }
  }
};

exports.show = async (ctx) => {
  const id = ctx.params.id;
  const { accountEmail } = ctx;
  try {
    const res = await courseCollection.findById(id);
    if (res) {
      if (res.rosters.includes(accountEmail)) {
        ctx.body = res;
      } else {
        ctx.status = 403;
        ctx.body = { msg: 'Access Denied' };
      }
    } else {
      ctx.body = 'data Not Found';
    }
  } catch (e) {
    console.log(e);
  }
};

exports.delete = async (ctx) => {
  const id = ctx.params.id;
  try {
    await courseCollection.findByIdAndRemove(id);
    const msg = `course ${id} has been deleted successfully`;
    ctx.body = msg;
  } catch (e) {
    console.log(e);
  }
};

exports.update = async (ctx) => {
  const id = ctx.params.id;
  try {
    const res = await courseCollection.findByIdAndUpdate(id, ctx.request.body, { new: true });
    const msg = `course ${id} has been updated successfully`;
    ctx.status = 200;
    ctx.body = { msg };
  } catch (e) {
    console.log(e);
  }
};

const getCourseListByAccount = async (accountEmail) => {
  return await accountCollection.aggregate([
    {
      $match: { accountEmail: accountEmail },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: 'courseEntryCode',
        as: 'courses',
      },
    },
    {
      $project: { courses: 1, _id: 0 },
    },
    {
      $unwind: '$courses',
    },
    //Group by startYear and startTerm
    {
      $group: {
        _id: {
          startYear: '$courses.startYear',
          startTerm: '$courses.startTerm',
          seasonOrder: { $indexOfArray: [['Spring', 'Summer', 'Autumn', 'Winter'], '$courses.startTerm'] },
        },
        courses: { $push: '$courses' },
      },
    },
    {
      $sort: { '_id.startYear': -1, '_id.seasonOrder': -1 },
    },
    {
      $project: {
        _id: 0,
        semesterInfo: '$_id',
        courses: 1,
      },
    },
  ]);
};

exports.getCoursesByAccount = async (ctx) => {
  const { accountEmail } = ctx;
  try {
    const res = await getCourseListByAccount(accountEmail);
    ctx.status = 200;
    ctx.body = res;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = err;
  }
};
