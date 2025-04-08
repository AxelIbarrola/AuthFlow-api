const jwt = require('jsonwebtoken')
require('dotenv').config()
const { generateToken } = require('../utils/generate_token')
const { RefreshTokens } = require('../models/RefreshTokens')

const refresh = async (req, res, next) => {

    const { refreshToken } = req.body

    if (!refreshToken) {
        return res.status(401).json({ error: '❌ Refresh token required.'})
    }

    try {

        const storedToken = await RefreshTokens.findOne({ where: {token: refreshToken }})

        if (!storedToken) {
            res.status(403).json({error: '❌ Refresh token not found or revoked.'})
        }
        
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {

            if (err) {
                return res.status(403).json({ error: '❌ Invalid refresh token.'})
            }
    
            const accessToken = generateToken(decoded.user)
    
            res.status(200).json({ message: accessToken })
        })

    } catch (error) {
        next(error)
    }
}

module.exports =  refresh 