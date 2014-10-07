var express = require('express');
var router = express.Router();
var User = require('../collections/accounts');
var crypto = require('crypto');

router.get('/', function(req, res) {
	if (req.session.user) {
		req.flash('error', '用户已登陆');
		return res.redirect('/');
	}
	res.render('sign/signin', {
		title: '登陆',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.post('/', function(req, res) {
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	User.get(req.body.username, function(err, user) {
		if (!user) {
			req.flash('error', '用户不存在');
			return res.redirect('/signin');
		}
		if (user.password != password) {
			req.flash('error', '密码不正确');
			return res.redirect('/signin');
		}
		req.session.user = user;
		if (user.role == 'admin') {
			req.flash('success', '管理员 ' + user.username + ' 登陆成功');
		} else if (user.role == 'user') {
			req.flash('success', '用户 ' + user.username + ' 登陆成功');
		}
		res.redirect('/');
	});
});

module.exports = router;