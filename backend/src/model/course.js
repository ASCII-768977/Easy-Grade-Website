const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseEntryCode: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseDesc: {
    type: String,
  },
  startTerm: {
    type: String,
  },
  startYear: {
    type: String,
  },
  rosters: [
    {
      type: String,
    },
  ],
  isDeleted: {
    type: Boolean,
  },
  annoucements: [
    {
      title: String,
      content: String,
      createdDate: String,
    },
  ],
  material: [
    {
      title: String,
      link: String,
    },
  ],
});
const course = mongoose.model('Course', courseSchema);
module.exports = course;
