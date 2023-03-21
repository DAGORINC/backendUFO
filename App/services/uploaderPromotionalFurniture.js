const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'storage/images/promotionalFurnitureImages/')
    },
    filename: function(req, file, cb){
        const name = Date.now() + path.extname(file.originalname);
        cb(null, name);
    }
});

const upload = multer({ storage });

const resizeImage = (req, res, next) => {
  if (req.file) {
    const { filename } = req.file;
    const newFilename = `${filename}`;
    const filePath = `storage/images/promotionalFurnitureImages/${filename}`;
    const newFilePath = `storage/images/promotionalFurnitureImages/thumbnailImages/${newFilename}`;
    sharp(filePath)
      .resize({ width: 600, height: 600, fit: 'inside' })
      .toFile(newFilePath, (err, info) => {
        if (err) {
          next(err);
        } else {
          req.body.newFilename = newFilename;
          next();
        }
      });
  } else {
    next();
  }
};

module.exports = { upload, resizeImage };
