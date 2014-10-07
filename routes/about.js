var express = require('express');
var router = express.Router();

/* GET About page. */
router.get('/', function(req, res) {
	res.render('about/about', {
		title: '关于我们',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

module.exports = router;