const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: String,
    required: true,
  },
  submitTime: {
    type: Number,
    required: true,
  },
  submittedByEmail: {
    type: String,
    required: true,
  },
  submittedByName: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    default: '',
  },
  gradedBy: {
    type: String,
    default: '',
  },
  gradedScore: {
    type: Number,
    default: 0,
  },
  isGraded: {
    type: Boolean,
    default: false,
  },
  pdfName: {
    type: String,
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  feedback: {
    type: String,
    default: '',
  },
});

const submission = mongoose.model('Submission', submissionSchema);
module.exports = submission;
