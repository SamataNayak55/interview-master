const mongoose = require("mongoose");



const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"technical question is required"]
    },
    intention:{
        type: String,
        required:[true,'intention is required']
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id:false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"technical question is required"]
    },
    intention:{
        type: String,
        required:[true,'intention is required']
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,'skills is required']
    },
    severity:{
        type:String,
        enum:['low','medium','high'],
        required:[true,"severity is required"]
    }
},{
    _id:false
})

const preprationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,'day is required']
    },
    focus:{
        type:String,
        required:[true,'focus is required']
    },
    tasks:[{
        type:String,
        required:[true,'task is required']
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobdescribe: {
        type:String,
        required:[true,'job discription is required']
    },
    resume:{
        type:String
    },
    selfdescribe: {
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionSchema],
    behaviouralQuestions:[behavioralQuestionSchema],
    skillGap:[skillGapSchema],
    preprationPlan:[preprationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },

},{
    timeStamps:true
})

const interviewReportModel = mongoose.model('interviewReport',interviewReportSchema)

module.exports = interviewReportModel