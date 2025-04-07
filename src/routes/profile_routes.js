const router = require('express').Router()
const { verifyToken } = require('../middlewares/verify_token')

router
.get('/profile',
    verifyToken,
    (req, res) => {
        res.status(200).json({
            message: 'Profile access granted.',
            user: req.user
        })
    }
)

module.exports = router