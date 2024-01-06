const { loginAdm } = require('../controllers/authController');
const router = require('express').Router();

router.post("/login",loginAdm);

module.exports = router;

