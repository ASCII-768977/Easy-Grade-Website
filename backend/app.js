const koa = require('koa');
const loader = require('./src/loaders');
const bodyParser = require('koa-bodyparser');

const app = new koa();
app.use(bodyParser());

loader.init(app);

module.exports = app;
