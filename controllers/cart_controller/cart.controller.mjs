import Cart from '../../models/cart_model/cart.model.mjs'
import User from '../../models/user_model/user.model.mjs'

// Create -> A cart
export const createCart = async (req, res) => {
    try {
        const user = await User.findById(req.body.userID)
        // console.log(user)
        if (!user) return res.status(404).json({ 404: 'User not found!' })
        const newCart = new Cart(req.body)

        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Get -> A cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.find({ userID: req.params.id })
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Get -> All carts
export const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Update -> A cart
export const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        )
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Delete -> A cart
export const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart has been deleted...')
    } catch (err) {
        res.status(500).json(err)
    }
}
