const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http:localhost:5173",
    credentials:true
}))

// imported routes here
const appRouter = require("./Routes/Auth.route.js")
const interviewRouter = require("./Routes/interview.routs.js")

// used routes here
app.use("/api/auth" , appRouter)
app.use('/api/interview', interviewRouter)

module.exports = app