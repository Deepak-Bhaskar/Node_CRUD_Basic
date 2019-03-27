const AWS = require('aws-sdk')
const path = require('path')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION
});

const s3 = new AWS.S3();

const _uploadImage = async (file) => {
  try {
    let name = file.name;
    let ext = path.extname(name);
    let pathFile = `${name}`

    let params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: pathFile,
      Body: file.data,
      ACL: 'public-read',
    }
    return new Promise((resolve, reject) => {
      s3.putObject(params, async function (err, data) {
        if (err) {
          return reject({
            status: false,
            message: err.message.toString()
          });
        } else {
          return resolve();
        }
      });
    }).then(async () => {
      let link = `https://s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${pathFile}`;
      return link;
    }).catch((err) => {
      return Promise.reject(err);
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  _uploadImage
}