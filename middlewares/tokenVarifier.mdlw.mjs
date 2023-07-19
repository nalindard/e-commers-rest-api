import jwt from 'jsonwebtoken'
import config from '../configs/default.config.mjs'

// export const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers.authorization
//     const token = authHeader && authHeader.split(' ')[1]

//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, config._access_token_secret, (err, user) => {
//         if (err) return res.sendStatus(403)

//         req.user = user
//         next()
//     })
// }

// -----------------------------------------------------------------------------------------

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    // console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, config._access_token_secret, (err, user) => {
            // console.log(err);
            if (err) return res.status(403).json('Token is not valid!')
            req.user = user
            next()
        })
    } else {
        return res.status(401).json('You are not aurhenticated!')
    }
}

export const verifyTokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('You are not allowed to do that!')
        }
    })
}

// export const verifyTokenAndAdmin = (req, res, next) => {
//     verifyToken(req, res, () => {
//         if (req.user.isAdmin) {
//             next()
//         } else {
//             res.status(403).json('You are not allowed to do that!')
//         }
//     })
// }
