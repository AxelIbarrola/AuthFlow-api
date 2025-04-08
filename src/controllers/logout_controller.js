const RefreshTokens = require('../models/refresh_tokens');

const logout = async (req, res, next) => {

    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: '❌ Refresh token not required.'})
    }

    try {

        const tokenFound = await RefreshTokens.findOne({ where: 
            {
                token: refreshToken
            }})

        if (!tokenFound) {
            return res.status(404).json({ error: '❌ Refresh token not found or already revoked.'})
        }

        await tokenFound.destroy()

        res.status(200).json({ message: '✅ Logged out successfully.'})
        

    } catch (error) {
        next(error)
    }
}

module.exports = { logout };