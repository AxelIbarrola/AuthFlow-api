const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id,
            email: user.email
        }
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m'})

    return token
}

const generateRefreshToken = (user) => {
    const payload = {
        user: {
            id: user.id,
            email: user.email
        }
    }

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'})

    return refreshToken

}

module.exports = { generateToken, generateRefreshToken }