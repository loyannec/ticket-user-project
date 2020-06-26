const ticket = require('../controllers/ticket/lib.js');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('../config/config');

const authenticateJWT = (req, res, next) => {
    console.log("********authenticateJWT********")
    const token = req.session.token;

    if (token) {

        jwt.verify(token, config.secret, (err, user) => {
            if (err) {
                return res.status(200).render('account/login', {title: 'Connexion'});
            }
            console.log("Value of the user in authenticate method is :"+JSON.stringify(user));
            req.user = user;
            next();
        });
    } else {
        res.status(200).render('account/login', {title: 'Connexion'});
    }
};


router.get('/create', authenticateJWT, ticket.createForm);
router.post('/create', authenticateJWT, ticket.create);
router.get('/:id', authenticateJWT, ticket.show);
router.get('/:id/edit', authenticateJWT, ticket.edit);
router.post('/:id/update', authenticateJWT, ticket.update);
router.post('/:id/assign', authenticateJWT, ticket.assign);
router.get('/', authenticateJWT,ticket.list); 

module.exports = router;