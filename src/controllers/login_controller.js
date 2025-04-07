const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

        const payload = {
            user: {
            id: existingUser.id,
            email: existingUser.email
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.status(200).json({ token })

    } catch(error) {
        next(error)
    }

}

module.exports = { login }