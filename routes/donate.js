var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('donate/donate', {
		title: 'donate',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

module.exports = router;