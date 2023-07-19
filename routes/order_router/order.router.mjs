import express from 'express'

import {
    createOrder,
    getOrder,
    getOrders,
    updateOrder,
    deleteOrder,
    getMonthIncome,
} from '../../controllers/oder_controller/order.controller.mjs'

import { isAdmin } from '../../middlewares/adminVerify.mdlw.mjs'

const orderRouter = express.Router()

orderRouter.post('/', createOrder)
orderRouter.get('/:id', getOrder)
orderRouter.get('/', isAdmin, getOrders)
orderRouter.put('/:id', updateOrder)
orderRouter.delete('/:id', isAdmin, deleteOrder)
orderRouter.get('/mnthincm', isAdmin, getMonthIncome)

export default orderRouter
