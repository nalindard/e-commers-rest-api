import dotenv from 'dotenv'
dotenv.config()

const config = {
    port: process.env.PORT,
    // _jwt_secret: process.env.JWT_SECRET,
    _access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    _refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    _password_hash_secret: process.env.PASSWORD_HASH_SECRET,
}

export default config
