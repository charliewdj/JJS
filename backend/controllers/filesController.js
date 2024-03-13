const PdfSchema = require('../models/pdfDetailsModel');
const ErrorResponse = require('../utils/errorResponse');





//upload the pdf file
exports.uploadFile = async (req, res, next) => {
    console.log('UPLOAD FILE BEGINNING')
    console.log(req.file);
    // const title = req.body.title;
    const fileName = req.file.filename;
    console.log(req.file.fileName)
    try {
        await PdfSchema.create({ title: 'TEST', pdf: fileName });
        console.log('SUPPOSED TO BE CREATED PDFSCHEMA')
        res.send({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
}


//get the pdf file
exports.getFile = async (req, res, next) => {
    try {
        PdfSchema.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) { }
}














