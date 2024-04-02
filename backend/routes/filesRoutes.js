const express = require('express');
const router = express.Router();
const { uploadFile, getFile} = require('../controllers/filesController');
const { isAuthenticated } = require('../middleware/auth');
const GridFsStorage = require("multer-gridfs-storage");

const multer = require("multer");

// const storage = new GridFsStorage({
//   url: process.env.DB,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//       const match = ["image/png", "image/jpeg"];

//       if (match.indexOf(file.mimetype) === -1) {
//           const filename = `${Date.now()}-any-name-${file.originalname}`;
//           return filename;
//       }

//       return {
//           bucketName: "photos",
//           filename: `${Date.now()}-any-name-${file.originalname}`,
//       };
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
    console.log('DIRECTORY EXIST')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now();
    cb(null, file.originalname);
  },
});



const upload = multer({ storage: storage });

//files routes

// /api/uploadfile
router.post('/uploadfile', upload.single("file"), uploadFile);

// /api/getfile
router.post('/getfile', getFile);

module.exports = router;