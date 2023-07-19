import express from 'express'
import {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
} from '../../controllers/product_controller/product.controller.mjs'

const productRouter = express.Router()

productRouter.post('/', createProduct)
productRouter.get('/:id', getProduct)
productRouter.get('/', getProducts)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)
productRouter.delete('/', deleteAllProducts)

export default productRouter
