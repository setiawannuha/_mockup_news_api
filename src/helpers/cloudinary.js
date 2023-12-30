/* eslint-disable no-unused-vars */
const cloudinary = require('cloudinary');

module.exports = {
  destroyFile: (file) => new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(file.filename, (error, result) => {
      resolve();
    });
  }),
  destroyFileByURL: (url) => new Promise((resolve, reject) => {
    const urlToArray = url.split('/');
    const filename = urlToArray.splice(7, 10).join('/').slice(0, -4);
    cloudinary.uploader.destroy(filename, (error, result) => {
      resolve();
    });
  }),
};
