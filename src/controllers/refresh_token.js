const jwt = require('jsonwebtoken')
require('dotenv').config()
const { generateToken } = require('../utils/generate_token')

const refresh = (req, res) => {
    const { refreshToken } = req.body

    if (!refreshToken) {
        return res.status(401).json({ error: '❌ Refresh token required.'})
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {

        if (err) {
            return res.status(403).json({ error: '❌ Invalid refresh token.'})
        }

        const accessToken = generateToken(decoded.user)

        res.status(200).json({ message: accessToken })
    })
}

module.exports =  refresh 