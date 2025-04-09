const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: '❌ Invalid token format.' })
    }

    const token = authHeader.split(' ')[1]
    
    jwt.verify(token, process.env.JWT_SECRET, 
        (err, decoded) => {
            if (err){
                return res.status(403).json({ error: '❌ Invalid token.'})
            }
            req.user = decoded.user
            next()
        })
}

module.exports = { verifyToken }