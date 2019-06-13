const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/logo.html'));
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/login.html'));
});
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/register.html'));
});
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/home.html'));
});

router.post('/register', (req, res) => {
    console.log("Username: " + req.body.username);
    console.log("Password: " + req.body.password);
    console.log("Email: " + req.body.email);
    console.log("Registered");
    res.redirect('/login');
});
router.post('/login', (req, res) => {
    console.log("Username: " + req.body.id);
    console.log("Password: " + req.body.password);
    console.log("Signed Up");
    res.redirect('/home');
})

module.exports = router;