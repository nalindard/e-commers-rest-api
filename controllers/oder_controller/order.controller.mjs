import Order from '../../models/order_model/order.model.mjs'
// import User from '../../models/user_model/user.model.mjs'

// Create -> A order
export const createOrder = async (req, res) => {
    try {
        // const user = await User.findById(req.body.userID)
        // console.log(user)
        // if (!user) return res.status(404).json({ 404: 'User not found!' })

        const newOrder = new Order(req.body)

        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Get -> A orders
export const getOrder = async (req, res) => {
    try {
        // const orders = await Order.find({ userID: req.params.id })
        const orders = await Order.findById(req.params.id)
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Get -> All orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Update -> A order
export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        )
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Delete -> A order
export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has been deleted...')
    } catch (err) {
        res.status(500).json(err)
    }
}

// Get -> Monthly income
export const getMonthIncome = async (req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(
        new Date().setMonth(lastMonth.getMonth() - 1)
    )

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount',
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sales' },
                },
            },
        ])
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }
}
