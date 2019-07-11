const express = require('express');
const router = express.Router();
const users = require('../users/user');
const bcrypt = require('bcrypt');

const assert = require('assert');

const noMessage = "";
const userDataInvaildErrorMessage = "ID and password must be at least 8 letters long.";
const nonExistAccountErrorMessage = "That Delightable account doesn't exist. Enter a different account or get a new one below.";

router.get('/', (req, res) => {
	if (req.session.user) {
		res.redirect('/main');
	} else {
		res.render('login.html', { error_message: noMessage }, (err, html) => {
			assert.equal(err, null);
			res.send(html);
		});
	}
});

router.post('/', (req, res) => {
	if (isUserDataInvaild(req.body)) {
		res.render('login.html', { error_message: userDataInvaildErrorMessage }, (err, html) => {
			assert.equal(err, null);
			res.send(html);
		});
	} else {
		users.validate(req.body)
		.then(result => {
			if (result === null) {
				res.render('login.html', { error_message: nonExistAccountErrorMessage }, (err, html) => {
					assert.equal(err, null);
					res.send(html);
				});
			} else {
				req.session.user = result;

				req.session.save(() => {
					res.redirect('/main');
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.redirect('/login');
		});
	}
});

const isUserDataInvaild = user => {
	return user.ID.length < 8 || user.password.length < 8; 
};

module.exports = router;
