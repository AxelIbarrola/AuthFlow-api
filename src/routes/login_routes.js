const router = require('express').Router()
const {validateUserFields} = require('../validators/validators')
const {handleValidation} = require('../middlewares/handleValidation')
const { login } = require('../controllers/login_controller')

router
.post('/login', 
    validateUserFields, 
    handleValidation, 
    login)

module.exports =  router 