const express = require('express')
const authMiddleware = require('../middleware/auth.midleware')
const interviewController = require("../controllers/interview.controller")
const upload = require('../middleware/file.middleware')



const interviewRouter = express.Router()

// post api : /api/interview
// enerates interview report
// access : private

interviewRouter.post('/', authMiddleware.authUser,upload.single("resume") ,interviewController.generateInterviewReportController)


module.exports = interviewRouter