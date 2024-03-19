const express = require('express');
const router = express.Router();
const { createJob, singleJob, updateJob, showJobs, deleteJob } = require('../controllers/jobsController');
// const { uploadFile, getFile} = require('../controllers/filesController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// const multer = require("multer");
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./backend/files");
//       console.log('DIRECTORY EXIST')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null, uniqueSuffix + file.originalname);
//     },
//   });
  
//   const upload = multer({ storage: storage });
  
//   //files routes
  
//   // /api/uploadfile
//   router.post('/uploadfile', upload.single("file"), uploadFile);
  
//   // /api/getfile
//   router.post('/getfile', getFile);
// const multer = require('multer');
// const upload = multer();

// Add middleware to parse multipart/form-data
// router.use(upload.any());


//jobs routes

// /api/job/create
router.post('/job/create', isAuthenticated, isAdmin, createJob);
// /api/job/id
router.get('/job/:id', singleJob);
// /api/job/update/job_id
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);
// /api/job/delete/job_id
router.delete('/job/delete/:job_id', isAuthenticated, isAdmin, deleteJob);
// /api/jobs/show
router.get('/jobs/show', showJobs);



module.exports = router;