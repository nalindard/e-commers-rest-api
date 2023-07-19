import express from 'express'

import {
    createCart,
    getCart,
    getCarts,
    updateCart,
    deleteCart,
} from '../../controllers/cart_controller/cart.controller.mjs'

const cartRouter = express.Router()

cartRouter.post('/', createCart)
cartRouter.get('/:id', getCart)
cartRouter.get('/', getCarts)
cartRouter.put('/:id', updateCart)
cartRouter.delete('/:id', deleteCart)

export default cartRouter
