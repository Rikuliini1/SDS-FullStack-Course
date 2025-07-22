import express from 'express'
import { registerUser, loginUser } from './routeHandlers/userHandler.js'

const userRouter = express.Router()

userRouter.post('/register_user', registerUser)
userRouter.post('/login_user', loginUser)

export default userRouter

// EOF
