let path = require('path');
let fs = require('fs');

module.exports = {
  async _fileUploder(file) {
    try {
      if (!file) {
        return Promise.reject(new Error().badRequest('File not found.'));
      }
      console.log('dddddddddd', file);

      let name = file.profile.name
      let ext = path.extname(name);
      let dir = './public/images/';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      await file.profile.mv(dir + name);
      dir = '/images/';
      // await this.imageResize(dir, time, ext, [300, 100]);
      return dir + name;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}