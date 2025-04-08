const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken, generateRefreshToken } = require('../utils/generate_token')
require('dotenv').config()

const login = async (req, res, next) => {

    const { email, password} = req.body;

    try {

        const existingUser = await User.findOne({ where: { email } })

        if (!existingUser) {
            return res.status(400).json({
                error: '❌ User not found'
            })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)

        if (!isMatch) {
            return res.status(400).json({
                error: '❌ Incorrect password'
            })
        }

        const token = generateToken({
            id: existingUser.id,
            email: existingUser.email
        })

        const refreshToken = generateRefreshToken({
            id: existingUser.id,
            email: existingUser.email
        }
        )

        res.status(200).json({ token, refreshToken })

    } catch(error) {
        next(error)
    }

}

module.exports = { login }