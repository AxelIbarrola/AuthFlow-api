const { User } = require('../models/User')
const { RefreshTokens } = require('../models/RefreshTokens');
const bcrypt = require('bcrypt');
const { generateToken, generateRefreshToken } = require('../utils/generate_token');

const register = async(req, res, next) => {

    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ where: { email }});

        if (existingUser) {
            return res.status(409).json({ error: '❌ Email already in use.'})
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await User.create({
            email,
            password: hashedPassword
        })

        const token = generateToken({
            id: newUser.id,
            email: newUser.email
        })

        const refreshToken = generateRefreshToken({
            id: newUser.id,
            email: newUser.email
        })

        await RefreshTokens.create({ 
            token: refreshToken,
            userId: newUser.id
        })

        res.status(201).json({
            message: '✅ User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                createdAt: newUser.createdAt
            },
            token,
            refreshToken
        })

    } catch(error) {
        next(error)
    }
}

module.exports = { register }