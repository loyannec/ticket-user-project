const User = require('../../schema/schemaUser.js');
const crypto = require('crypto');

function signup(req, res) {
    console.log("**********Inside signup method************")
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        //The case where the email or the password is not submitted or null
        console.log(req.body);
        res.status(400).json({
            //Request invalid
            "text": "Requête invalide"
        })
    } else {
        const sha256 = crypto.createHash('sha256');
        const hashedPassword = sha256.update(req.body.password).digest('base64');
        var user = {
            email: req.body.email,
            password: hashedPassword,
            isAdmin:false
        }
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(200)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findUser.then(function () {
            var _u = new User(user);
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    req.session.token = user.getToken();
                    res.redirect('../../ticket/');
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 200:
                    res.status(200).json({
                        "text": "L'adresse email existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
}

function signupForm(req, res) {
    console.log("**********Inside signupForm method************")
    res.status(200).render('account/signup', {title: 'Inscription'});
}

function login(req, res) {
    console.log("**********Inside login method************")
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            }
            else if(!user){
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            }
            else {
                const sha256 = crypto.createHash('sha256');
                const hashedPassword = sha256.update(req.body.password).digest('base64');
                if (user.authenticate(hashedPassword)) {
                    console.log("******after getting token for user********")
                    req.session.token = user.getToken();
                    res.redirect('../../ticket/');
                    /* if(user.checkAdmin()){
                        console.log("******User is admin")
                        res.locals.isAdmin = true;
                        res.redirect('../../ticket/');
                    }else{
                        console.log("******User is normal user")
                        res.redirect('../../ticket/');
                    } */
                    
                }
                else{
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
}

function loginForm(req, res) {
    console.log("**********Inside loginForm method************")
    res.status(200).render('account/login', {title: 'Connexion'});
}

function signout(req, res) {
    console.log("**********Inside signout method************")
    delete req.session.token;
    res.redirect('login');
}

exports.login = login;
exports.loginForm = loginForm;
exports.signup = signup;
exports.signupForm = signupForm;
exports.signout = signout;