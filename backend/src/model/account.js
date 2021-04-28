const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const accountSchema = mongoose.Schema({
  accountEmail: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountPwd: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  course: [
    {
      type: String,
    },
  ],
  notificationType: {
    type: Number,
  },
  status: {
    type: String,
  },
});

//bcrypt middleware for password encryption
accountSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.accountPwd, salt, (err, hash) => {
      if (err) return next(err);
      this.accountPwd = hash;
      next();
    });
  });
});

const account = mongoose.model('account', accountSchema);
module.exports = account;
