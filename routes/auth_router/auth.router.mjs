import express from 'express'

import {
    signup,
    login,
    logout,
    getAccessToken,
} from '../../controllers/auth_controller/auth.controller.mjs'

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.delete('/logout', logout)
authRouter.post('/getAccesstoken', getAccessToken)

export default authRouter
