const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
const path = require('path');
// app.use("/files", express.static("files"));
// app.use(express.static(path.join(__dirname, './files')));
app.use(cors());
app.use('/files', express.static(path.join(__dirname, './files')));




// import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoute = require('./routes/jobsTypeRoutes');
const jobRoute = require('./routes/jobsRoutes');
const filesRoutes = require('./routes/filesRoutes');

const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// //database connection
// const client = mongoose.connect(process.env.DATABASE, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// })
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log(err));


// // create GridFS bucket instance named "myBucketName"
// const bucket = new mongoose.GridFSBucket(client, {
//   bucketName: "myBucketName"
// })


// database connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log("DB connected");
  // create GridFS bucket instance named "myBucketName"
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "myBucketName"
  });
}) 
.catch((err) => console.error(err));


//MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());
app.use(cors());


//ROUTES MIDDLEWARE
// app.get('/', (req, res) => {
//     res.send("Hello from Node Js");
// })
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);
app.use('/api', jobRoute);
app.use('/api', filesRoutes);

__dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

// error middleware
app.use(errorHandler);

//port
const port = process.env.PORT || 9000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
