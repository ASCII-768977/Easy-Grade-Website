const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  assignmentName: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  delayDue: {
    type: String,
  },
  status: {
    type: String,
  },
  totalScore: {
    type: Number,
    default: 0,
    required: true,
  },
  attachments: [
    {
      fileName: String,
      fileURL: String,
    },
  ],
  submission: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
  assignmentDesc: {
    type: String,
  },
});

const assignment = mongoose.model('assignment', assignmentSchema);
module.exports = assignment;
