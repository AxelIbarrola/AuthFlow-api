const { body, param } = require('express-validator');

const validateUserFields = [
    body('email')
    .exists().withMessage('❌ Email is mandatory.').bail()
    .notEmpty().withMessage('❌ Email should not be empty.').bail()
    .isEmail().withMessage('❌ Invalid email.')
    ,
    body('password')
    .exists().withMessage('❌ Password is mandatory.').bail()
    .notEmpty().withMessage('❌ Password should not be empty.').bail()
    .isLength({min:  6}).withMessage(`❌ The password must have a minimum 6 characters`)
]

module.exports =  { validateUserFields }