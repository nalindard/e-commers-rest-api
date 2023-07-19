import userRouter from './user_router/user.router.mjs'
import productRouter from './product_router/product.router.mjs'
import authRouter from './auth_router/auth.router.mjs'
import cartRouter from './cart_router/cart.router.mjs'
import orderRouter from './order_router/order.router.mjs'

// ------------Middlewares------------
import { verifyToken } from '../middlewares/tokenVarifier.mdlw.mjs'
import { isAdmin } from '../middlewares/adminVerify.mdlw.mjs'

// ------------Limiters------------
import rateLimiterOptions from '../configs/ratelimiter.config.mjs'
import speedLimiterOptions from '../configs/ratelimiter.config.mjs'

const router = (app) => {
    // Checking server running status,
    // app.get('/health-check', (req, res) => res.status(200).send('OK'))
    app.get('/health-check', verifyToken, isAdmin, (req, res) =>
        res.status(200).send('OK')
    )

    // user router,
    app.use(
        '/users',
        speedLimiterOptions,
        rateLimiterOptions,
        verifyToken,
        userRouter
    )

    // product router,
    app.use(
        '/products',
        speedLimiterOptions,
        rateLimiterOptions,
        verifyToken,
        isAdmin,
        productRouter
    )

    // cart router,
    app.use(
        '/carts',
        speedLimiterOptions,
        rateLimiterOptions,
        verifyToken,
        cartRouter
    )

    // order router,
    app.use(
        '/orders',
        speedLimiterOptions,
        rateLimiterOptions,
        verifyToken,
        orderRouter
    )

    // auth router,
    app.use('/auth', authRouter)
}

export default router
