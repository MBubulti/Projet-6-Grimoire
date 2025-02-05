const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl');

router.post('/login', authCtrl.login);
router.post('/signup', authCtrl.signUp);

module.exports = router;
