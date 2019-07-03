const express = require('express');
const router = express.Router();
const users = require('../users/user');

router.get('/', (req, res) => {
    res.render('register.html', { error_message: "" }, (err, html) => {
        if (err) {
            console.log(err.message);
        } else {
            res.send(html);
        }
    });
});

router.post('/', (req, res) => {
    if (req.body.username.length < 8 || req.body.ID.length < 8 || req.body.password.length < 8) {
        res.render('register.html', { error_message: "Each entered sentence must be more than 8 letters long." }, (err, html) => {
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
