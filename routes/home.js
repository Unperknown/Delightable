const express = require('express');
const router = express.Router();

const assert = require('assert');

router.get('/', (req, res) => {
  	res.render('logo.html', (err, html) => {
  	  	assert.equal(err, null);
  	  	res.send(html);
  	});
});

module.exports = router;
