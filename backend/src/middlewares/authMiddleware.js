const jwt = require('jsonwebtoken');
const account = require('../model/account');

const auth = async (ctx, next) => {
  const authHeader = ctx.headers.authorization;
  const hasToken = authHeader && authHeader.startsWith('Bearer');
  const { requiredRole } = ctx;
  if (!hasToken) {
    ctx.status = 401;
    return (ctx.body = { message: 'Unauthorized: have no token' });
  }

  const token = ctx.headers.authorization.split(' ')[1];
  const isGoogleToken = token.length > 500;
  if (isGoogleToken) {
    try {
      const decodedData = jwt.decode(token);
      const user = await account.findOne({ accountEmail: decodedData.email });
      ctx.accountEmail = user.accountEmail;
      ctx.role = user.role;
      if (requiredRole === undefined || user.role === requiredRole) {
        return next();
      } else {
        ctx.status = 403;
        ctx.body = {
          msg: `Access Denied, account should be a ${requiredRole}`,
        };
        return;
      }
    } catch (error) {
      ctx.status = 403;
      return (ctx.body = { message: 'Forbidden: unregistered user.' });
    }
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await account.findById(decodedData.id);
    ctx.accountEmail = user.accountEmail;
    ctx.role = user.role;
    if (requiredRole === undefined || user.role === requiredRole) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = {
        msg: `Access Denied, account should be a ${requiredRole}`,
      };
      return;
    }
  } catch (error) {
    ctx.status = 403;
    return (ctx.body = { message: 'Forbidden: invalid token ' });
  }
};

const studentAuth = async (ctx, next) => {
  ctx.requiredRole = 'student';
  await next();
};

const teacherAuth = async (ctx, next) => {
  ctx.requiredRole = 'teacher';
  await next();
};

module.exports = {
  teacherAuth,
  studentAuth,
  auth,
};
