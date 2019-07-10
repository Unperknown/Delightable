const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	if (req.session.user) {
		res.render('random-number.html', req.session.user, (err, html) => {
			if (err) {
				console.log(err.message);
			} else {
				res.send(html);
			}
		});
	} else {
		res.redirect('/login');
	}
});

module.exports = router;
