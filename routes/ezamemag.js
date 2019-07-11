const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  	if (req.session.user) {
  	  	res.render('ezamemag.html', req.session.user, (err, html) => {
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
