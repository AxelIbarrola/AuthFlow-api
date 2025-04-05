const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT

app.listen(PORT,
    () => { console.log(`✅ Server running in port: ${PORT}`) }
)

app.get('/', (req, res) => {res.send('Ax')})

app.use(
    (err, req, res, next) => {

        console.error(err.stack)
        
        res.status(err.status || 500).json({
            error: err.message || 'Internal Server Error',
            details: err.details || null
        })
    }
)