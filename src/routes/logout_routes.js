const  router  = require("express").Router();
const { logout } = require('../controllers/logout_controller');

router
.post('/logout',
    logout
)

module.exports = router;