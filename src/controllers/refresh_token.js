const jwt = require('jsonwebtoken')
require('dotenv').config()
const { generateToken, generateRefreshToken } = require('../utils/generate_token')
const { RefreshTokens } = require('../models/RefreshTokens')

const refresh = async (req, res, next) => {

    const { refreshToken } = req.body

    if (!refreshToken) {
        return res.status(401).json({ error: '❌ Refresh token required.'})
    }

    try {

        const storedToken = await RefreshTokens.findOne({ where: {token: refreshToken }})

        if (!storedToken) {
            return res.status(403).json({error: '❌ Refresh token not found or revoked.'})
        }
        
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

        await storedToken.destroy()

        const newAccessToken = generateToken({
            id: decoded.user.id,
            email: decoded.user.email })
        
        const newRefreshToken = generateRefreshToken({
            id: decoded.user.id,
            email: decoded.user.email
        })

        await RefreshTokens.create({
            token: newRefreshToken,
            userId: decoded.user.id
        })

    
        res.status(200).json({ 
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })

        } catch (error) {
        next(error)
    }
}

module.exports =  refresh 