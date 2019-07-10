const express = require('express');
const router = express.Router();
const users = require('../users/user');

const noMessage = "";
const invaildInputErrorMessage = "Each entered sentence must be more than 8 letters long.";

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
        .then(_ => res.redirect('/login'));
    }
})

module.exports = router;

const isUserDataInvaild = user => {
    return user.username.length < 8 || user.ID.length < 8 || user.password.length < 8;
};