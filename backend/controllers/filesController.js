const PdfSchema = require('../models/pdfDetailsModel');
const ErrorResponse = require('../utils/errorResponse');





//upload the pdf file
exports.uploadFile = async (req, res, next) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        await PdfSchema.create({ title: title, pdf: fileName });
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














