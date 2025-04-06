const express = require('express')
const app = express()
const {errorHandler} = require('./middlewares/errorHandler')
require('dotenv').config()
const PORT = process.env.PORT
const authRoutes = require('./routes/auth_routes')

app.use(express.json())

app.listen(PORT,
    () => { console.log(`✅ Server running in port: ${PORT}`) }
)

app.get('/', (req, res) => {res.send('Ax')})

app.use('/api', authRoutes)

app.use(errorHandler)