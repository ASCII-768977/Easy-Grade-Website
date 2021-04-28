const mongoose = require('mongoose');

const noticSchema = new mongoose.Schema({
  accountId: {
    type: String,
    required: true,
  },
  expired: {
    type: String,
    required: true,
  },
});

const notification = mongoose.model('notification', noticSchema);

module.exports = notification;
