const multer = require('@koa/multer');
const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');
const config = require('../config/app');
const AWS_ID = config.AWS_ID;
const AWS_SECRET = config.AWS_SECRET;
const AWS_BUCKET = config.AWS_BUCKET;

const s3 = new AWS.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
});

exports.s3MiddleWare = async (ctx, next) => {
  try {
    const { submittedByName } = ctx.request.body;
    const myFile = ctx.file.originalname.split('.');
    const fileType = myFile[myFile.length - 1];
    const pdfName = `${submittedByName.split('|').join('_')}_${uuid()}.${fileType}`;
    ctx.pdfName = pdfName;

    const params = {
      Bucket: AWS_BUCKET,
      Key: pdfName,
      Body: ctx.file.buffer,
      ContentType: 'application/pdf',
    };

    await new Promise((resolve) => {
      s3.upload(params, async (error, data) => {
        try {
          ctx.status = 200;
          ctx.pdfUrl = data.Location;
          resolve();
        } catch (e) {
          ctx.status = 500;
          ctx.body = e;
        }
      });
    });

    await next();
  } catch (e) {
    ctx.error(400, 'Uploading pdf failed.');
  }
};

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

const upload = multer({ storage: storage });

exports.pdfMulter = upload;
