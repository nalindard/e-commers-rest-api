import { rateLimit } from 'express-rate-limit'

const rateLimiterOptions = rateLimit({
    windowMs: 30 * 1000,
    max: 10,
})

export default rateLimiterOptions
