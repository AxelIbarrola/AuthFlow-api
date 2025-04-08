const { RefreshToken } = require('../models/RefreshToken');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const logoutAll = async (req, res, next) => {

    const { refreshToken } = req.body

        if (!refreshToken) {
            return res.status(401).json({ error: '❌ Refresh token not required.'})
        }

    try {

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

        const deleted = await RefreshToken.destroy({ where: { userId: decoded.user.id}})

        res.status(200).json({ message: `✅ Al sessions closed for user ${decoded.user.email}`, tokensDeleted: deleted})


    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ error: '❌ Refresh token expired.' })
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: '❌ Invalid refresh token.'})
        }

        next(error)
    }
}

module.exports = { logoutAll }