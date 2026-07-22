const userModel = require("../models/user.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model.js")

// controller for user registration 
// user resgistration required username, email, password, name
// used bcryptjs for password hashing and jwt for token generation
async function registerUserController(req, res) {
    const { username, email, password, name } = req.body

    if (!username || !email || !password || !name) {
        return res.status(400).json({
            message: "Please fill all the details to register."
        })
    }

    const isUserAlreadyExits = await userModel.findOne({
        $or : [{username}, {email}]
        })

        if(isUserAlreadyExits) {
            if(isUserAlreadyExits.username === username ){
            return res.status(400).json({
                message : "user with this username already exists"
            })
            }

        
           if(isUserAlreadyExits.email === email ){
            return res.status(400).json({
                message : "user with this email already exists"
            })

            }

        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password : hash,
            name
        })

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email
        }, process.env.JWT_SECRET, {expiresIn : "1d"})

        res.cookie("token", token)

        res.status(201).json({
            message : "user registered successfully!! welcome :) " ,       
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name
        }
        })

}

// controller for user login

async function loginUserController(req, res) {

    const {email, username, password} = req.body
 
    const user = await userModel.findOne({
        $or : [{email}, {username}]
    })

    if(!user){
        return res.status(400).json({
            message : "user with this email or username does not exists"
        })
    }
 
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        return res.status(400).json({
            message: "invalid password!! please enter correct password to login "
        })
    } 

     const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email
        }, process.env.JWT_SECRET, {expiresIn : "1d"})

        res.cookie("token", token,{
            httpOnly: true,
            sameSite:'lax',
            maxAge:24*60*60*1000
        })

        res.status(201).json({
            message : "user logged in successfully!! welcome back :)" ,       
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name
        }
        })

}

// GET /api/auth/logout route controller for user logout
// clear token from user cookie and add token in blacklist collection for token invalidation

async function logoutUserController(req, res) {
    const token = req.cookies.token

    if(token){
        await blacklistModel.create({token})
    }
    res.clearCookie("token")
    res.status(200).json({
        message: "user logged out successfully!!"
    })
}

// get-me controller ie GET /api/auth/get-me 
// used to ge information about logedin user

async function getMeController(req, res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"user details fetched successfully",
        user:{
            id:user._id,
            email :user.email,
            name:user.name,
            username: user.username
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
