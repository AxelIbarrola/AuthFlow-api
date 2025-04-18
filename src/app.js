const express = require('express')
const app = express()
const {errorHandler} = require('./middlewares/errorHandler')
require('dotenv').config()
const PORT = process.env.PORT
const registerRoutes = require('./routes/register_routes');
const loginRoutes = require('./routes/login_routes');
const profileRoutes = require('./routes/profile_routes');
const refreshRoutes = require('./routes/refresh_routes');
const logoutRoutes = require('./routes/logout_routes');
const logoutAllRoutes = require('./routes/logoutAll_routes');



app.use(express.json())

app.listen(PORT,
    () => { console.log(`✅ Server running in port: ${PORT}`) }
)

app.get('/', (req, res) => {res.send('Ax')})

app.use('/api/auth', registerRoutes)
app.use('/api/auth', loginRoutes)
app.use('/api', profileRoutes)
app.use('/api', refreshRoutes)
app.use('/api', logoutRoutes)
app.use('/api', logoutAllRoutes)


app.use(errorHandler)