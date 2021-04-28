const assignmentCollection = require('../../../model/assignment');
const courseCollection = require('../../../model/course');
const ObjectId = require('mongoose').Types.ObjectId;

exports.msg = async (ctx) => {
  ctx.body = 'assignment msg from aws';
};
exports.index = async (ctx) => {
  const id = ctx.params.id;
  const accountEmail = ctx.accountEmail;
  try {
    const res = await courseCollection.aggregate([
      {
        $addFields: { id_str: { $toString: '$_id' } },
      },
      {
        $match: { _id: new ObjectId(id) },
      },
      {
        $addFields: { isEnroll: { $in: [accountEmail, '$rosters'] } },
      },
      {
        $lookup: {
          from: 'assignments',
          localField: 'id_str',
          foreignField: 'courseId',
          as: 'assignments',
        },
      },
    ]);
    if (res[0].isEnroll) {
      ctx.body = res[0];
    } else {
      ctx.status = 403;
      ctx.body = { msg: 'Access Denied' };
    }
  } catch (e) {
    console.log(e);
  }
};

exports.store = async (ctx) => {
  const assignment = new assignmentCollection({
    ...ctx.request.body,
  });

  try {
    await assignment.save();
    const msg = 'assignment been saved successfully';
    ctx.status = 201;
    ctx.body = { msg };
  } catch (e) {
    console.log(e);
  }
};

exports.show = async (ctx) => {
  const id = ctx.params.id;
  const userEmail = ctx.email;
  try {
    const res = await assignmentCollection.findById(id);
    if (res) {
      ctx.body = res;
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
    await assignmentCollection.findByIdAndRemove(id);
    const msg = `assignment ${id} has been deleted successfully`;
    ctx.body = msg;
  } catch (e) {
    console.log(e);
  }
};

exports.update = async (ctx) => {
  const id = ctx.params.id;

  try {
    await assignmentCollection.findByIdAndUpdate(id, ctx.request.body, { new: true });
    const msg = `assignment ${id} has been modified successfully`;
    console.log(id);
    ctx.status = 204;
    ctx.body = { msg };
  } catch (e) {
    console.log(e);
  }
};
