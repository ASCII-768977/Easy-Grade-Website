const cors = require('koa-cors');
const config = require('../../src/config/app');
const apiRouter = require(`../../src/${config.router.prefix}/api`);

module.exports = async (app) => {
  app.use(cors());
  app.use(apiRouter.routes());

  return app;
};
