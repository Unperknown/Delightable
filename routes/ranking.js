const express = require('express');
const router = express.Router();
const users = require('../users/user');

const assert = require('assert');

router.get('/', (req, res) => {
	if (req.session.user) {
		users.getAll().then(result => {
			res.render('ranking.html', { users: result, session: req.session.user }, (err, html) => {
				assert.equal(err, null);
				res.send(html);
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
