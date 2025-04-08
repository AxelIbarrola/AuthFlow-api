const router  = require("express").Router();
const  refresh  = require('../controllers/refresh_token');

router.
post('/refresh-token', refresh)

module.exports = router