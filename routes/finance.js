var express = require('express');
var router = express.Router();

/* GET finance page. */
router.get('/', function(req, res) {
  res.render('finance/finance', {
    title: '财务公开',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

/* GET donation page*/
router.get('/donations', function(req, res) {
  var db = req.db;
  var donations;
  var today = new Date().getFullYear();
  var years = [];
  for (var i = 2012; i <= today; ++i)
    years.push(i);

  db.collection('donations', function(err, col) {
    col.find({}, {
      sort: {
        date: -1
      },
    }).toArray(function(err, docs) {
      donations = docs;
      callback();
    });
  });

  var callback = function() {
    res.render('finance/donations', {
      title: '捐款',
      donations: donations,
      years: years,
      showAll: true,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  };
});
/* GET projects-/*expenses page*/
router.get('/projects-expenses', function(req, res) {
  var db = req.db;
  var cost;
  var today = new Date().getFullYear();
  //years starts from 2012 to nowadays
  var years = [];
  for (var i = 2012; i <= today; ++i)
    years.push(i);

  db.collection('cost', function(err, col) {
    col.find().toArray(function(err, docs) {
      cost = docs;
      callback();
    });
  });
  var callback = function() {
    res.render('finance/projects_expenses', {
      title: '项目开支',
      years: years,
      cost: cost,
      showAll: false,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  };
});
/* GET monthly-reports page*/
router.get('/monthly-reports', function(req, res) {
  var db = req.db;
  var money;
  var today = new Date().getFullYear();
  var years = [];
  for (var i = 2012; i <= today; ++i)
    years.push(i);

  db.collection('money', function(err, col) {
    col.find().toArray(function(err, docs) {
      money = docs;
      callback();
    });
  });

  var callback = function() {
    res.render('finance/monthly_reports', {
      title: '每月报表',
      years: years,
      showAll: false,
      money: money,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  };
});
/* GET annually-reports page*/
router.get('/annually-reports', function(req, res) {
  var db = req.db;
  var annual;
  var today = new Date().getFullYear();
  //years starts from 2012 to nowadays
  var years = [];
  for (var i = 2012; i <= today; ++i)
    years.push(i);

  db.collection('annual', function(err, col) {
    col.find({}).toArray(function(err, docs) {
      annual = docs;
      callback();
    });
  });

  var callback = function() {
    res.render('finance/annually_reports', {
      title: '年报表',
      years: years,
      annual: annual,
      showAll: false,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  };
});

module.exports = router;