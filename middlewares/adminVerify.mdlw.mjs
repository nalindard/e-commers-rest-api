import { verifyToken } from './tokenVarifier.mdlw.mjs'

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('You are not allowed to do that!')
        }
    })
}

export const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).json('You are not allowed to do that!')
    next()
}
