const PdfSchema = require('../models/pdfDetailsModel');
const { useState } = require('react');
const ErrorResponse = require('../utils/errorResponse');
const fs = require('fs');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongoose');
const firebase = require("firebase/compat/app");
require("firebase/compat/storage");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfDVdQenz4eMX81M4e9MqCz6RJ1X0S6Ec",
    authDomain: "jjs-files-storage-db.firebaseapp.com",
    projectId: "jjs-files-storage-db",
    storageBucket: "jjs-files-storage-db.appspot.com",
    messagingSenderId: "263748868699",
    appId: "1:263748868699:web:b90334cd377154d88a3d7e"
  };

firebase.initializeApp(firebaseConfig)


exports.uploadFile = async (req, res, next) => {
    
    const file = req.file
    console.log(file)

    const fileName = file.filename
    console.log(fileName)

    if(file) {
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(fileName)

        fileRef.put(file)
        .then((snapshot) => {
            snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
                console.log(downloadURL)
            })
        })
    } else {
        console.log("Error !!")
    }
}

//upload the pdf file
// exports.uploadFile = async (req, res, next) => {
//     console.log('UPLOAD FILE BEGINNING')
//     console.log(req.file);
//     // const title = req.body.title;
//     const fileName = req.file.filename;
//     // console.log(req.file.fileName)
//     try {
//         await PdfSchema.create({ title: 'TEST', pdf: fileName });
//         console.log('SUPPOSED TO BE CREATED PDFSCHEMA')
//         res.send({ status: "ok" });
//     } catch (error) {
//         res.json({ status: error });
//     }
// }




// exports.uploadFile = async (req, res, next) => {
//     const fileName = req.file.filename;
//     const fileStream = fs.createReadStream(req.file.path);

//     const uploadStream = bucket.openUploadStream(fileName);
    
//     fileStream.pipe(uploadStream);

//     uploadStream.on('error', () => {
//         return res.status(500).json({ error: 'Failed to upload file.' });
//     });

//     uploadStream.on('finish', async () => {
//         try {
//             // Save metadata to your collection if needed
//             await PdfSchema.create({ title: 'TEST', pdf: fileName });
//             // Remove the temporary file after successful upload if needed
//             fs.unlinkSync(req.file.path);
//             return res.status(200).json({ status: 'ok' });
//         } catch (error) {
//             return res.status(500).json({ error: 'Failed to save metadata.' });
//         }
//     });
// }


// Define uploadFile function
// exports.uploadFile = async (req, res) => {
//     try {
//         // Access bucket instance from mongoose.connection.db
//         const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//             bucketName: "myBucketName"
//         });

//         // Get input name="file" from client side
//         const file = req.file;
        
//         // Set file path in MongoDB GridFS
//         // This will be saved as "filename" in "fs.files" collection
//         const filePath = (new Date().getTime()) + "-" + file.filename;
        
//         // Read user uploaded file stream
//         fs.createReadStream(file.path)
        
//           // Add GridFS bucket stream to the pipe
//           // It will keep reading and saving file
//           .pipe(
//             bucket.openUploadStream(filePath, {
//               // Maximum size for each chunk (in bytes)
//               chunkSizeBytes: 1048576, // 1048576 = 1 MB
//               // Metadata of the file
//               metadata: {
//                 name: file.filename, // File name
//                 size: file.size, // File size (in bytes)
//                 type: file.mimetype // Type of file
//               }
//             })
//           )
//           // This callback will be called when the file is done saving
//           .on("finish", function () {
//             res.status(200).send("File saved.");
//           })
//           // Handle error if any occurs during file upload
//           .on("error", function (error) {
//             console.error("Error uploading file:", error);
//             res.status(500).send("Error uploading file.");
//           });

//         // Cleanup: Remove the uploaded file from the temp directory
//         fs.unlink(file.path, (err) => {
//             if (err) {
//                 console.error("Error deleting temp file:", err);
//             }
//         });
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         res.status(500).send("Error uploading file.");
//     }
// };


//get the pdf file
// exports.getFile = async (req, res, next) => {
//     try {
//         PdfSchema.find({}).then((data) => {
//             res.send({ status: "ok", data: data });
//         });
//     } catch (error) { }
// }

// Define a route to serve files
exports.getFile = async (req, res) => {

    console.log('ENHEEE')
    const filename = req.query.filename;

    // Specify the path to the folder containing your files
    const filePath = path.join(__dirname, 'files', filename);

    console.log('ENHEEE')

    // Send the file as a response
    res.sendFile(filePath, (err) => {
        if (err) {
            // Handle error if file cannot be sent
            console.error("Error sending file: ", err);
            res.status(err.status).end();
        } else {
            console.log("File sent successfully: ", filename);
        }
    });

};














