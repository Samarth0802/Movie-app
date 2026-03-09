import express from 'express'
import { loginUser, logoutUser, registerUser,getUser } from '../controllers/auth.controller.js'
import handleError from '../middleware/error.middleware.js'
import { loginValidator, registerValidator } from '../validators/auth.validator.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const authRouter = express.Router()

authRouter.post('/register',registerValidator,registerUser)
authRouter.post('/login',loginValidator,loginUser)
authRouter.post('/logout',logoutUser)
authRouter.get('/getUser',authMiddleware,getUser)

export default authRouter