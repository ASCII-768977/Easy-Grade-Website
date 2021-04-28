const getToken = require('../../../utils/getToken.js');
const accountCollection = require('../../../model/account');
const courseCollection = require('../../../model/course');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

exports.signup = async (ctx) => {
  const { accountEmail, accountName, accountPwd, role } = ctx.request.body;

  const hasUser = await accountCollection.findOne({ accountEmail });
  if (hasUser) {
    ctx.status = 401;
    return (ctx.body = { message: 'The user has already existed.' });
  }

  const account = new accountCollection({ accountEmail, accountName, accountPwd, role, status: 'verified' });
  await account.save();
  ctx.status = 201;
  ctx.body = {
    _id: account._id,
    accountName: account.accountName,
    accountEmail: account.accountEmail,
    role: account.role,
    token: getToken(account._id),
  };
};

exports.enroll = async (ctx) => {
  const { accountEmail, courseEntryCode } = ctx.request.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const accountRes = await accountCollection
      .updateOne({ accountEmail: accountEmail }, { $addToSet: { course: courseEntryCode } })
      .session(session);
    const courseRes = await courseCollection
      .updateOne({ courseEntryCode: courseEntryCode }, { $addToSet: { rosters: accountEmail } })
      .session(session);

    if (!accountRes.n || !courseRes.n) {
      // TODO: isExist function
      await session.abortTransaction();
      ctx.status = 400;
      ctx.body = {
        msg: `The account email or course Entry code is invalid`,
      };
    } else {
      await session.commitTransaction();
      ctx.body = {
        msg: `${accountEmail} enroll course ${courseEntryCode} successfully`,
      };
    }
    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    throw err;
  }
};

exports.update = async (ctx) => {
  const id = ctx.params.id;
  try {
    await accountCollection.findByIdAndUpdate(id, ctx.request.body, { new: true });
    const msg = `user account information ${id} has been modified successfully`;
    ctx.status = 204;
    ctx.body = { msg };
  } catch (e) {
    console.log(e);
  }
};

exports.getAccountsByCourse = async (ctx) => {
  const { id, pageNum } = ctx.params;
  let pageSize = +ctx.request.query.pageSize || 8;
  let orderBy = ctx.request.query.orderBy || 'accountName';
  orderBy = `allRosters.${orderBy}`;
  let order = ctx.request.query.order == 'desc' ? -1 : 1;
  let keywords = ctx.request.query.keywords || '';
  keywords = new RegExp(keywords, 'i');
  let filter = ctx.request.query.filter || '';
  filter = new RegExp(filter);
  try {
    const res = await courseCollection.aggregate([
      {
        $match: { _id: new ObjectId(id) },
      },
      {
        $lookup: {
          from: 'accounts',
          localField: 'rosters',
          foreignField: 'accountEmail',
          as: 'allRosters',
        },
      },
      {
        $project: { _id: 1, allRosters: 1, totalCount: 1 },
      },
      // use unwind + group to do sort and filtering
      {
        $unwind: '$allRosters',
      },
      {
        $match: {
          'allRosters.accountName': keywords,
          'allRosters.role': filter,
        },
      },
      //use facet to finish pagination
      {
        $facet: {
          allRosters: [
            //sort+skip+limit optimization
            {
              $sort: { [orderBy]: order },
            },
            {
              $skip: (pageNum - 1) * pageSize,
            },
            {
              $limit: pageSize,
            },
            {
              $group: {
                _id: '',
                allRosters: { $push: '$allRosters' },
              },
            },
          ],
          pagination: [
            { $count: 'totalCount' },
            {
              $addFields: {
                pageNum: +pageNum,
                pageSize: +pageSize,
              },
            },
          ],
        },
      },
      {
        $project: {
          pagination: { $arrayElemAt: ['$pagination', 0] },
          allRosters: { $arrayElemAt: ['$allRosters.allRosters', 0] },
        },
      },
    ]);
    if (res[0].allRosters.length) {
      ctx.status = 200;
      ctx.body = res[0];
    } else {
      ctx.status = 404;
      ctx.body = {
        msg: 'Invaild page number, required data amount exceed.',
      };
    }
  } catch (err) {
    console.log(err);
  }
};
