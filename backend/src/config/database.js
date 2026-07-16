const mongoose = require("mongoose")

async function connectDB() {
    try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("database connected")
    }
    catch(err) {
        console.log("data base connection error ::",err)
    }
}

module.exports = connectDB;