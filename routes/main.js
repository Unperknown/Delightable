const express = require('express');
const router = express.Router();

const assert = require('assert');

router.get('/', (req, res) => {
	if (req.session.user) {
		res.render('home.html', req.session.user, (err, html) => {
			assert.equal(err, null);
			res.send(html);
		});
	} else {
		res.redirect('/login');
	}
});

module.exports = router;
