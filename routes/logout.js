const express = require('express');
const router = express.Router();

const assert = require('assert');

router.get('/', (req, res) => {
	req.session.destroy(err => {
		assert.equal(err, null);

		res.redirect('/login');
	});
});

module.exports = router;