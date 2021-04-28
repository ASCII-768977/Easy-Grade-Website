const submissionCollection = require('../../../model/submission');
const courseCollection = require('../../../model/course');
const assignmentCollection = require('../../../model/assignment');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

exports.msg = async (ctx) => {
  ctx.body = 'submission msg from aws';
};

exports.statistic = async (ctx) => {
  const id = ctx.params.id;
  try {
    let resAss = await courseCollection.aggregate([
      {
        $addFields: { id_str: { $toString: '$_id' } },
      },
      {
        $match: { _id: new ObjectId(id) },
      },
      {
        $lookup: {
          from: 'assignments',
          localField: 'id_str',
          foreignField: 'courseId',
          as: 'allAssignments',
        },
      },
      {
        $project: { allAssignments: 1, totalNum: { $size: '$rosters' } },
      },
      {
        $unwind: '$allAssignments',
      },
      {
        $lookup: {
          from: 'submissions',
          localField: 'allAssignments.submission',
          foreignField: '_id',
          as: 'allSubmissions',
        },
      },
      {
        $project: {
          allSubmissions: 1,
          assignmentId: '$allAssignments._id',
          assignmentName: '$allAssignments.assignmentName',
          releaseDate: '$allAssignments.releaseDate',
          dueDate: '$allAssignments.dueDate',
          totalNum: 1,
          submittedNum: {
            $size: '$allSubmissions',
          },
          gradedNum: {
            $size: {
              $filter: {
                input: '$allSubmissions',
                as: 'submission',
                cond: { $eq: ['$$submission.isGraded', true] },
              },
            },
          },
          allocatedNum: {
            $size: {
              $filter: {
                input: '$allSubmissions',
                as: 'submission',
                cond: { $gt: ['$$submission.assignedTo', ''] }, // use greater than to select the elements with fields
              },
            },
          },
        },
      },
      {
        $unwind: {
          path: '$allSubmissions',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          'allSubmissions.assignedTo': {
            $ifNull: ['$allSubmissions.assignedTo', ''],
          },
        },
      },
      {
        $group: {
          _id: {
            assignmentId: '$assignmentId',
            assignedTo: '$allSubmissions.assignedTo',
          },
          num: { $sum: 1 },
          assignmentId: { $first: '$assignmentId' },
          assignmentName: { $first: '$assignmentName' },
          releaseDate: { $first: '$releaseDate' },
          dueDate: { $first: '$dueDate' },
          totalNum: { $first: '$totalNum' },
          submittedNum: { $first: '$submittedNum' },
          gradedNum: { $first: '$gradedNum' },
          allocatedNum: { $first: '$allocatedNum' },
        },
      },
      {
        $group: {
          _id: {
            assignmentId: '$_id.assignmentId',
          },
          allocatedDetails: {
            $push: {
              $cond: {
                if: { $gt: ['$_id.assignedTo', ''] },
                then: { teacher: '$_id.assignedTo', allocatedNum: '$num' },
                else: undefined,
              },
            },
          },
          assignmentId: { $first: '$assignmentId' },
          assignmentName: { $first: '$assignmentName' },
          releaseDate: { $first: '$releaseDate' },
          dueDate: { $first: '$dueDate' },
          totalNum: { $first: '$totalNum' },
          submittedNum: { $first: '$submittedNum' },
          gradedNum: { $first: '$gradedNum' },
          allocatedNum: { $first: '$allocatedNum' },
        },
      },
      {
        $sort: {
          releaseDate: 1,
        },
      },
    ]);
    resAss.map((assignment) => {
      assignment.allocatedDetails.map((property, key) => {
        if (property == null) {
          assignment.allocatedDetails.splice(key, 1);
        }
      });
    });
    ctx.body = resAss;
  } catch (e) {
    console.log(e);
  }
};

exports.show = async (ctx) => {
  const assignmentId = ctx.params.id;
  const { accountEmail, role } = ctx;

  try {
    const res = await submissionCollection
      .find({ 'submittedBy.student': accountEmail, assignmentId: assignmentId })
      .sort({ submitTime: -1 });
    if (res) {
      ctx.body = res;
    } else {
      ctx.body = 'data Not Found';
    }
  } catch (e) {
    console.log(e);
  }
};

exports.store = async (ctx) => {
  const { assignmentId, submittedByName, submittedByEmail, comment } = ctx.request.body;
  const submitTime = Date.now();
  const { pdfName, pdfUrl } = ctx;

  try {
    const submissionData = { assignmentId, submittedByName, comment, submittedByEmail, submitTime, pdfName, pdfUrl };
    const submission = new submissionCollection(submissionData);
    const session = await mongoose.startSession();
    session.startTransaction();
    const oldSubmission = await submissionCollection
      .find({ submittedByName, assignmentId })
      .sort({ submitTime: -1 })
      .session(session);

    if (oldSubmission.length) {
      await assignmentCollection.findByIdAndUpdate(assignmentId, {
        $pull: { submission: oldSubmission[0]._id },
      });
    }

    await assignmentCollection.findByIdAndUpdate(assignmentId, {
      $push: { submission: submission._id },
    });

    await submission.save();
    await session.commitTransaction();
    session.endSession();

    ctx.status = 201;
    ctx.body = { ...submissionData, message: 'The submission has been saved successfully.' };
  } catch (e) {
    ctx.status = 400;
    ctx.body = e;
  }
};

exports.getById = async (ctx) => {
  const id = ctx.params.id;

  try {
    const submission = await submissionCollection.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $addFields: {
          assignmentObjId: { $toObjectId: '$assignmentId' },
        },
      },
      {
        $lookup: {
          from: 'assignments',
          localField: 'assignmentObjId',
          foreignField: '_id',
          as: 'assignment',
        },
      },
      {
        $unwind: '$assignment',
      },
      { $unset: 'assignmentObjId' },
    ]);

    ctx.body = submission[0];
    ctx.status = 200;
  } catch (e) {
    console.log(e);
  }
};

exports.update = async (ctx) => {
  const id = ctx.params.id;
  const { feedback, gradedScore } = ctx.request.body;
  const updateDetails = { feedback, gradedScore, isGraded: true };
  try {
    await submissionCollection.findByIdAndUpdate(id, { $set: updateDetails });
    const msg = `details in this submission ${id} has been updated successfully`;
    ctx.status = 204;
    ctx.body = msg;
  } catch (e) {
    console.log(e);
  }
};

exports.multi = async (ctx) => {
  const submittedByEmail = ctx.accountEmail;
  const { assignmentId } = ctx.request.query;
  try {
    const submissions = await submissionCollection.aggregate([
      { $match: { submittedByEmail, assignmentId } },
      {
        $addFields: {
          assignmentObjId: { $toObjectId: '$assignmentId' },
        },
      },
      {
        $lookup: {
          from: 'assignments',
          localField: 'assignmentObjId',
          foreignField: '_id',
          as: 'assignment',
        },
      },
      {
        $unwind: '$assignment',
      },
      { $unset: 'assignmentObjId' },
      { $sort: { submitTime: -1 } },
    ]);

    ctx.body = submissions;
  } catch (e) {
    console.log(e);
  }
};

exports.allocate = async (ctx) => {
  const { id: assignmentId } = ctx.params;
  const { formInfo } = ctx.request.body;
  let totalNum = 0;
  formInfo.map((item) => {
    totalNum += item.allocatedNum;
  });
  try {
    const assignments = await assignmentCollection.aggregate([
      {
        $match: { _id: new ObjectId(assignmentId) },
      },
      {
        $addFields: {
          submission: {
            $map: {
              input: '$submission',
              in: { $toObjectId: '$$this' },
            },
          },
        },
      },
      {
        $lookup: {
          from: 'submissions',
          localField: 'submission',
          foreignField: '_id',
          as: 'relatedSubmissions',
        },
      },
      {
        $project: { submission: false },
      },
      {
        $project: {
          relatedSubmissions: {
            $filter: {
              input: '$relatedSubmissions',
              as: 'submission',
              cond: { $lte: ['$$submission.assignedTo', ''] }, // use less than to select the elements without fields
            },
          },
        },
      },
    ]);
    const submissionRes = assignments[0].relatedSubmissions;
    if (submissionRes.length < totalNum) {
      ctx.status = 403;
      ctx.body = {
        msg: 'The unallocate submissions are insufficient.',
      };
    } else {
      await formInfo.map(async (item) => {
        let submissionIdList = [];
        for (let i = 0; i < item.allocatedNum; i++) {
          submissionIdList.push(submissionRes.pop()._id);
        }
        let res = await submissionCollection.updateMany(
          {
            _id: { $in: submissionIdList },
          },
          {
            $set: { assignedTo: item.accountEmail },
          },
        );
      });
      ctx.body = await submissionCollection.find();
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getByPage = async (ctx) => {
  const { id, pageNum } = ctx.params;
  let pageSize = +ctx.request.query.pageSize || 8;
  let orderBy = ctx.request.query.orderBy || 'submittedByName';
  orderBy = `allSubmissions.${orderBy}`;
  let order = ctx.request.query.order == 'desc' ? -1 : 1;
  let keywords = ctx.request.query.keywords || '';
  keywords = new RegExp(keywords, 'i');
  let filter = ctx.request.query.filter || '';
  if (filter == 'unallocated') {
    filter = /^.{0}$/gm;
  } else {
    filter = new RegExp(filter);
  }
  try {
    const res = await assignmentCollection.aggregate([
      {
        $match: { _id: new ObjectId(id) },
      },
      {
        $lookup: {
          from: 'submissions',
          localField: 'submission',
          foreignField: '_id',
          as: 'allSubmissions',
        },
      },
      {
        $unwind: '$allSubmissions',
      },
      {
        $match: {
          'allSubmissions.submittedByName': keywords,
          'allSubmissions.assignedTo': filter,
        },
      },
      // use facet to finish pagination
      {
        $facet: {
          allSubmissions: [
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
                allSubmissions: { $push: '$allSubmissions' },
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
          allSubmissions: { $arrayElemAt: ['$allSubmissions.allSubmissions', 0] },
        },
      },
    ]);
    ctx.body = res[0];
  } catch (err) {
    console.log(err);
  }
};
