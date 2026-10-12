if (typeof Uint8Array === 'undefined') {
    global.Uint8Array = require('typedarray').Uint8Array;
}

const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()


app.use(cors({
    // origin:"https://interview-master-gray.vercel.app",
    origin:'http://localhost:5173',
    credentials:true,
     methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type","Authorization"]
}))

app.use(express.json())
app.use(cookieParser())

// imported routes here
const appRouter = require("./Routes/Auth.route.js")
const interviewRouter = require("./Routes/interview.routs.js")

// used routes here
app.use("/api/auth" , appRouter)
app.use('/api/interview', interviewRouter)

module.exports = app