const koaLoader = require('./koa');
const mongooseLoader = require('./mongoose');

exports.init = (koaApp) => {
  mongooseLoader();
  koaLoader(koaApp);
};
