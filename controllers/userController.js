const account = require('./account/lib.js');
var express = require('express');
var router = express.Router();

router.post('/login',account.login);
router.post('/signup',account.signup);

module.exports = router;