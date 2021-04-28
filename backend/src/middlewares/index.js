const { s3MiddleWare, pdfMulter } = require('./s3Upload');
const authMiddleware = require('./authMiddleware');

module.exports = {
  s3MiddleWare,
  pdfMulter,
  authMiddleware,
};
