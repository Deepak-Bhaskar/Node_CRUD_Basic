const aws = require('aws-sdk')
const path = require('path')


const _uploadImage = async (file) => {
  try {
    console.log('process.env.accessKey', process.env.accessKey)
    console.log('process.env.secretKeyy', process.env.secretKey)
    console.log('process.env.AWS_BUCKET_NAME', process.env.AWS_BUCKET_NAME)
    let name = file.name
    let ext = path.extname(name)
    let filePath = `${name}`
    aws.config.setPromisesDependency()
    aws.config.update({
      accessKeyId: process.env.accessKey,
      secretAccessKey: process.env.secretKey,
      region: 'ap-south-1'
    })

    const s3 = new aws.S3()
    let params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filePath,
      Body: file.data,
    }

    s3.putObject(params, async (err, data) => {
      if (err) {
        return err;
      }
      else {
        return data;
      }
    });
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  _uploadImage
}