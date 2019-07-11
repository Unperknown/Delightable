const express = require('express');
const router = express.Router();
const users = require('../users/user');

const noMessage = "";
const invaildInputErrorMessage = "Username must be at least 4 letters long, and ID and password must be at least 8 letters long.";
const duplicateAccountErrorMessage = "This account is already exist. Try creating another one with different form.";

router.get('/', (req, res) => {
    res.render('register.html', { error_message: noMessage }, (err, html) => {
        if (err) {
            console.log(err.message);
        } else {
            res.send(html);
        }
    });
});

router.post('/', (req, res) => {
    if (isUserDataInvaild(req.body)) {
        res.render('register.html', { error_message: invaildInputErrorMessage }, (err, html) => {
            if (err) {
                console.log(err.message);
            } else {
                res.send(html);
            }
        });
    } else {
        users.create(req.body)
        .then(message => {
            if (message === 'User Created') {
                res.redirect('/login');
            } else {
                res.render('register.html', { error_message: duplicateAccountErrorMessage }, (err, html) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        res.send(html);
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/register');
        });
    }
})

module.exports = router;

const isUserDataInvaild = user => {
    return user.username.length < 3 || user.ID.length < 8 || user.password.length < 8;
};