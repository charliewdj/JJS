const express = require('express');
const router = express.Router();
const { uploadFile, getFile} = require('../controllers/filesController');
const { isAuthenticated } = require('../middleware/auth');


const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./backend/files");
    console.log('DIRECTORY EXIST')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//files routes

// /api/uploadfile
router.post('/uploadfile', upload.single("file"), uploadFile);

// /api/getfile
router.post('/getfile', getFile);

module.exports = router;