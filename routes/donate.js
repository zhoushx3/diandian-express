var express = require('express');
var router = express.Router();

router.get('/',  function(req, res) {
	res.render('donate/donate', {
		title: 'donate',
	});
});

module.exports = router;