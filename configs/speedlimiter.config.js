import SlowDown from 'express-slow-down'

const speedLimiterOptions = SlowDown({
    windowMs: 30 * 1000,
    delayAfter: 1,
    delayMs: 500,
})

export default speedLimiterOptions