var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('donate/donate', {
		title: '捐赠明细',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

module.exports = router;