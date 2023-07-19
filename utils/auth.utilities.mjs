import jwt from 'jsonwebtoken'
import config from '../configs/default.config.mjs'

export const generateAccessToken = (user) => {
    return jwt.sign(user, config._access_token_secret, { expiresIn: '47s' })
}
export const generateRefreshToken = (user) => {
    return jwt.sign(user, config._refresh_token_secret)
}
