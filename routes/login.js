const express = require('express');
const router = express.Router();
const users = require('../users/user');

router.get('/', (req, res) => {
	if (req.session.user) {
		res.redirect('/main');
	} else {
		res.render('login.html', { error_message: "" }, (err, html) => {
			if (err) {
				console.log(err.message);
			} else {
				res.send(html);
			}
		});
	}
});

router.post('/', (req, res) => {
	if (req.body.ID.length < 8 || req.body.password.length < 8) {
		res.render('login.html', { error_message: "ID and password must be more than 8 letters long." }, (err, html) => {
			if (err) {
				console.log(err.message);
			} else {
				res.send(html);
			}
		});
	} else {
		users.validate(req.body)
		.then(result => {
			console.log(result);
			if (result === null) {
				res.render('login.html', { error_message: "That Delightable account doesn't exist. Enter a different account or get a new one below." }, (err, html) => {
					if (err) {
						console.log(err.message);
					} else {
						res.send(html);
					}
				});
			} else {
				req.session.user = result;
				res.redirect('/main');
			}
		});
	}
});

module.exports = router;
