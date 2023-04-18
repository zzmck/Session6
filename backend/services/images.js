const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Sauce = require('../models/Sauce');

async function find(req){
  const result = await Sauce.findById(req);
  return result;
}
function checkType(file, cb) {
    const allowedFileTypes = /jpeg|jpg|png/;
    const ext = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (ext && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error('Seules les images JPEG, JPG et PNG sont acceptées'));
    }
}
async function resize(imageBuffer) {
  const { width, height } = await sharp(imageBuffer).metadata();
  if (width > 500 || height > 500) {
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(500, 500, { fit: 'inside' })
      .toBuffer();
    return resizedImageBuffer;
  }
  return imageBuffer;
}
async function compress(imageBuffer) {
  const MAX_WEIGHT = 500000; // 500Ko
  const weight = imageBuffer.length;
  if (weight > MAX_WEIGHT) {
    const compressedImageBuffer = await sharp(imageBuffer)
      .jpeg({ quality: 75 })
      .toBuffer();
    return compressedImageBuffer;
  }
  return imageBuffer;
}
function save(imageBuffer, filename) {
  const newImagePath = path.join('images', `${filename}`);
  fs.writeFileSync(newImagePath, imageBuffer);
  return newImagePath;
}
  

module.exports = {
  checkType,
  resize,
  compress,
  save,
  find
};
   