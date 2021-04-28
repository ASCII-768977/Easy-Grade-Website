'use strict';

const getToken = require('../../../utils/getToken.js');
const getRandomPassword = require('../../../utils/getRandomPassword');

const bcrypt = require('bcrypt');
const accountCollection = require('../../../model/account');
const notificationCollection = require('../../../model/emailNotification');

exports.login = async (ctx) => {
  const { accountEmail, accountPwd } = ctx.request.body;
  try {
    const account = await accountCollection.findOne({ accountEmail });

    if (!account) {
      ctx.status = 401;
      return (ctx.body = { message: "The user doesn't exist." });
    }

    const isRightPassword = await bcrypt.compare(accountPwd, account.accountPwd);

    if (isRightPassword) {
      ctx.status = 200;
      ctx.body = {
        _id: account._id,
        accountName: account.accountName,
        accountEmail: account.accountEmail,
        role: account.role,
        token: getToken(account._id),
      };
    } else {
      ctx.status = 401;
      ctx.body = { message: 'The password is incorrect.' };
    }
  } catch (e) {
    ctx.body = e;
  }
};

exports.googlelogin = async (ctx) => {
  const { accountEmail, accountName } = ctx.request.body;
  try {
    const account = await accountCollection.findOne({ accountEmail });
    const defaultRole = 'teacher';

    if (account) {
      return (ctx.body = {
        _id: account._id,
        accountName: account.accountName,
        accountEmail: account.accountEmail,
        role: defaultRole,
      });
    }

    if (!account) {
      const accountPwd = getRandomPassword();
      const newAccount = new accountCollection({ accountName, accountEmail, accountPwd, role: defaultRole });
      await newAccount.save();
      ctx.status = 201;
      return (ctx.body = {
        _id: newAccount._id,
        accountName: newAccount.accountName,
        accountEmail: newAccount.accountEmail,
        role: defaultRole,
      });
    }
    ctx.status = 401;
    ctx.body = { message: 'Google login failed.' };
  } catch (e) {
    ctx.body = e;
  }
};

exports.verify = async (ctx) => {
  const now = new Date();
  const { id } = ctx.params;
  try {
    const notiRes = await notificationCollection.findOne({ _id: id });
    if (now <= notiRes.expire) {
      const accountRes = await accountCollection.findByIdAndUpdate(notiRes.accountId, { status: 'verified' });
      ctx.status = 200;
      ctx.body = { msg: `User ${notiRes} has been activated` };
    } else {
      ctx.status = 403;
      ctx.body = { msg: 'Link has been expired' };
    }
  } catch (err) {
    console.log(err);
  }
};
