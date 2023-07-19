import express from 'express'
import {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserStats,
} from '../../controllers/user_controller/user.controller.mjs'

import { isAdmin } from '../../middlewares/adminVerify.mdlw.mjs'

const userRouter = express.Router()

userRouter.get('/:id', getUser)
userRouter.get('/', isAdmin, getAllUsers)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
userRouter.get('/stats', isAdmin, getUserStats)

export default userRouter
