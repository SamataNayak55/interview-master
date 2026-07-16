const {Router} = require("express")
const authController = require("../controllers/auth.controller.js")
const authMiddleware = require("../middleware/auth.midleware.js")


const authRouter = Router()

// route : "/api/auth/register" used for new user register
authRouter.post("/register", authController.registerUserController)

// route : "/api/auth/login" used for user login
authRouter.post("/login", authController.loginUserController)

// route : "/api/auth/logout" used for user logout
authRouter.get("/logout", authController.logoutUserController)

// route : Get "/api/auth/get-me" used to get current logedin user details
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)

module.exports = authRouter