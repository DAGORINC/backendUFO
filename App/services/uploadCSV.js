const multer = require('multer');
const fs = require('fs')

const storageFolder = 'storage/CSVfiles';
if (!fs.existsSync(storageFolder)) {
  fs.mkdirSync(storageFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/CSVfiles');
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});

const uploadCSV = multer({ storage });

module.exports = uploadCSV;
