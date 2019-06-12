const ticket = require('./ticket/lib.js');
var express = require('express');
var router = express.Router();

router.post('/create', ticket.create);
router.get('/:id', ticket.show);
router.post('/:id/update', ticket.update);
router.get('/', ticket.list);

module.exports = router;