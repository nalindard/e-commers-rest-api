import jwt from 'jsonwebtoken'
import config from '../../configs/default.config.mjs'
import User from '../../models/user_model/user.model.mjs'
// import bcrypt from 'bcrypt'
import CryptoJS from 'crypto-js'
import {
    generateAccessToken,
    generateRefreshToken,
} from '../../utils/auth.utilities.mjs'

// Tempory,
let refreshTokens = []

// Post -> Sign-up
export const signup = async (req, res) => {
    const _user = new User({
        userName: req.body.userName,
        email: req.body.email,
        // password: req.body.password,
        age: req.body.age,
        address: req.body.address,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            config._password_hash_secret
        ).toString(),
    })

    try {
        const savedUser = await _user.save()
        res.status(201).json({
            userName: savedUser.userName,
            email: savedUser.email,
        })
    } catch (err) {
        res.status(500).json(err)
    }

    // res.status(200).send('Signing in')
}

// Post -> Log-in
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName })
        !user && res.status(401).json('Wrong credentials!')

        const hassedPassword = CryptoJS.AES.decrypt(
            user.password,
            config._password_hash_secret
        )
        const OriginalPassword = hassedPassword.toString(CryptoJS.enc.Utf8)
        OriginalPassword !== req.body.password &&
        res.status(401).json('Wrong credentials!')

        const {_id, userName, email} = user
        const _user = {_id, userName, email}
        
        const _accessToken = generateAccessToken(_user)
        const _refreshToken = generateRefreshToken(_user)

        refreshTokens.push(_refreshToken)

        // const { password, ...others } = user._doc

        res.status(201).json({ ..._user, _accessToken, _refreshToken })

        //
        //
        //
        //
        // Authenticate user first, -------------------

        // const userName = req.body.userName
        // const _user = { name: userName }

        // console.log('🚀 ~ file: authServer.js:20 ~ server.post ~ user:', user)

        // // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        // const accessToken = generateAccessToken(_user)
        // const refreshToken = generateRefreshToken(_user)

        // refreshTokens.push(refreshToken)

        // res.status(200).json({
        //     accessToken: accessToken,
        //     refreshToken: refreshToken,
        // })
    } catch (error) {
        res.status(500).json(error)
    }

    // res.status(200).send(`login`)
}

// Delete -> Log-out from session
export const logout = (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
    res.sendStatus(204)

    // res.status(200).send(`logoutSession`)
}

// Post -> Get a access token
export const getAccessToken = (req, res) => {
    const refreshToken = req.body.token

    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })

    // res.status(200).send(`getAccessToken`)
}
