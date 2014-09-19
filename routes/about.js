var express = require('express');
var router = express.Router();

/* GET About page. */
router.get('/', function(req, res) {
  res.render('about/about', {
    title: '关于我们'
  });
});

module.exports = router;