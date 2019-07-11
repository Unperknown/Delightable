const express = require('express');
const router = express.Router();
const user = require('../users/user');

const assert = require('assert');

router.get('/', (req, res) => {
	if (req.session.user) {
		res.render('tictactoe.html', req.session.user, (err, html) => {
			assert.equal(err, null);
			res.send(html);
		});
	} else {
		res.redirect('/login');
	}
});

router.post('/', (req, res) => {
	if (req.session.user) {
		user.updateValue(req.session.user.username, parseInt(req.body.score))
			.then(_ => {
				req.session.save(err => {
					assert.equal(err, null);
					
					req.session.user.score += parseInt(req.body.score);
					res.redirect('/main');
				});
			})
			.catch(err => {
				console.log(err);
				res.redirect('/main');
			});
	} else {
		res.redirect('/login');
	}
});

module.exports = router;
