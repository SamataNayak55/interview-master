if (typeof global.DOMMatrix === 'undefined') {
    global.DOMMatrix = class DOMMatrix {};
}

const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

async function generateInterviewReportController(req, res) {
    const resumeFile = req.file;

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();


    const {selfdescribe, jobdescribe} = req.body


    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent.text,
        selfdescribe,
        jobdescribe
    })
    console.log("AI REPORT:");
console.log(interviewReportByAI);
console.log(JSON.stringify(interviewReportByAI, null, 2));
     

    const interviewReport = await interviewReportModel.create({
        user:req.user._id,
        jobdescribe,
        resume: resumeContent.text,
        selfdescribe,
         ...interviewReportByAI
            
        })

    res.status(201).json({
        message:"interview report generated successfully!!!",
        interviewReport
    })
}





module.exports = {generateInterviewReportController} 