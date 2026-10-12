if (typeof global.DOMMatrix === 'undefined') {
    global.DOMMatrix = class DOMMatrix {};
}

const pdfParse = require('pdf-parse');
const { generateInterviewReport } = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')


// controller to generate interview report
async function generateInterviewReportController(req, res) {
    // const resumeFile = req.file;

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    // const extractedText = resumeContent.text || " ";


    const {selfdescribe, jobdescribe} = req.body


    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent.text,
        selfdescribe,
        jobdescribe
    })
    console.log("AI REPORT:");
console.log(interviewReportByAI);
// console.log(JSON.stringify(interviewReportByAI, null, 2));
     

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

// controller to get interview report by the interview id

async function getInterviewReportByIdController(req, res){
    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({_id: interviewId,user: req.user._id})

    if(!interviewReport){
        return res.status(404).json({
            message:"interview report not found"
        })


    }
    res.status(200).json({
        message:"interview report fetched successfully..",
    interviewReport
}
    )
}


async function getAllInterviewReportsController(req, res){
    const interviewReport  = await interviewReportModel.find({user: req.user._id }).sort({createdAt: -1}).select(" title matchScore createdAt ")
    res.status(200).json({
        message: "interview report fetched successfully",
        interviewReport
    })
}

async function deleteReportById(req,res){
try{
    const interviewReport = await interviewReportModel.findOneAndDelete({_id: req.params.interviewId, user: req.user._id})
    if(!interviewReport){
        return res.status(404).json({
            message:"interview report not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"interview report deleted successfully",
        deleteReport:interviewReport
    
    })
}catch(err){
    console.log(err)
}
}






module.exports = {generateInterviewReportController, getInterviewReportByIdController,getAllInterviewReportsController, deleteReportById} 