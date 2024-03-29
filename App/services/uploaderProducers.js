const path = require('path');
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'storage/images/producersImages/')
    },
    filename: function(req, file, cb){
        const name = Date.now() + path.extname(file.originalname);
        cb(null, name);
    }
});



const upload = multer({ storage });

module.exports = upload;