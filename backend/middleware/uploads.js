const multer = require('multer');
const path = require('path');

const uploadPath = path.join(__dirname, '../uploads');
console.log("UPLOAD PATH:", uploadPath); // log ini penting untuk debug

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
