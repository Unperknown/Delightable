const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ezamemag.html', (err, html) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(html);
    }
  });
});

module.exports = router;
