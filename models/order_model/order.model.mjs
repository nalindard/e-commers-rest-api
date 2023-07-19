import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        products: [
            {
                productID: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        amount: {
            type: Number,
            min: 1,
            max: 10,
            required: true,
        },
        address: {
            type: Object,
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', OrderSchema)
export default Order
