var express = require('express');
var router = express.Router();
var User = require('../collections/accounts');
var crypto = require('crypto');

router.get('/', function(req, res) {
	if (req.session.user) {
		req.flash('error', '请先登出');
		return res.redirect('/');
	}
	res.render('sign/signup', {
		title: '注册',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.post('/', function(req, res) {
	//检查两次输入的密码是否一致
	var md5_password = crypto.createHash('md5'),
		password = md5_password.update(req.body.password).digest('hex');
	var md5_password_re = crypto.createHash('md5'),
		password_re = md5_password_re.update(req.body['password-repeat']).digest('hex');
	if(password != password_re) {
		req.flash('error', '两次输入的密码不一致');
		return res.redirect('/signup');
	}

	var username = req.body.username,
		email = req.body.email,
		nickname = req.body.nickname,
		gender = req.body.gender,
		birthday = req.body.birthday,
		job = req.body.job,
		phone = req.body.phone,
		QQ = req.body.QQ,
		weibo = req.body.weibo,
		about = req.body.about,
		date = new Date(),
		month = date.getMonth() + 1;

	var newUser = new User({
		"username": username,
		"email": email,
		"password": password,
		"createdAt": date.getFullYear() + '-' + month + '-' + date.getDate(),
		"role": 'user',
		"profile": {
			"nickname": nickname,
			"gender": gender,
			"birthday": birthday,
			"job": job,
			"phone": phone,
			"QQ": QQ,
			"weibo": weibo,
			"photo": '/images/photo/default.jpg',
			"about": about
		}
	});

	User.get(newUser.username, function(err, user) {
		if (user) {
			req.flash('error', '该用户已存在');
			return res.redirect('/signup');
		}

		newUser.save(function(err, user) {
			if (err) {
				req.flash('error', '插入users数据库失败');
				return res.redirect('/signup');
			}
			req.session.user = user;
			req.flash('success', '注册成功');
			return res.redirect('/');
		});
	});

});

module.exports = router;