const router = require('express').Router();
const {validateUserFields} = require('../validators/validators');
const {handleValidation} = require('../middlewares/handleValidation');
const { register } = require('../controllers/register_controller');

router
.post(`/register`,
    validateUserFields,
    handleValidation,
    register
)

module.exports =  router 