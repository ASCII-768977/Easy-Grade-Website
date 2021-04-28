require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  port: process.env.PORT || 8000,
  api: {
    prefix: process.env.API_PREFIX || 'api/v1',
  },
  router: {
    prefix: process.env.ROUTER_PREFIX || 'routes/v1',
  },
  mongoose: process.env.MONGOOSE,
  AWS_ID: process.env.AWS_ID,
  AWS_SECRET: process.env.AWS_SECRET,
  AWS_BUCKET: process.env.AWS_BUCKET,
};
