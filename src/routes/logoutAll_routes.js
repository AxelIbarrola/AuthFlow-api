const router = require('express').Router()
const { logoutAll } = require('../controllers/logoutAll_controller')

router
.post('/logout-all',
    logoutAll
)