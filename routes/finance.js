var express = require('express');
var router = express.Router();
var fs = require('fs');
var DOCS_PATH = 'images/docs/';
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
 var monthFiles = [];
  var years = [];
  var today = new Date().getFullYear();
  //years starts from 2012 to nowadays
  for (var i = 2012; i <= today; ++i)
    years.push(i);
  fs.readdir('public/' + DOCS_PATH, function(err, files) {
    var sortFiles = files.sort();
    for (var i = 0; i < sortFiles.length; i++) {
      if (sortFiles[i].match("月份"))
        monthFiles.push( '../' + DOCS_PATH + sortFiles[i]);
    }
    res.render('finance/projects_expenses', {
      title: '项目开支',
      showAll: false,
      years: years,
      month: monthFiles,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});
/* GET monthly-reports page*/
router.get('/monthly-reports', function(req, res) {
  var quarterFiles = [];
  var years = [];
  var today = new Date().getFullYear();
  //years starts from 2012 to nowadays
  for (var i = 2012; i <= today; ++i)
    years.push(i);
  fs.readdir('public/' + DOCS_PATH, function(err, files) {
    var sortFiles = files.sort();
    for (var i = 0; i < sortFiles.length; i++) {
      if (sortFiles[i].match("季度"))
        quarterFiles.push( '../' + DOCS_PATH + sortFiles[i]);
    }
    res.render('finance/monthly_reports', {
      title: '季度报表',
      years: years,
      quarter: quarterFiles,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});
/* GET annually-reports page*/
router.get('/annually-reports', function(req, res) {
  var annualFiles = [];
  var years = [];
  var today = new Date().getFullYear();
  //years starts from 2012 to nowadays
  for (var i = 2012; i <= today; ++i)
    years.push(i);
  fs.readdir('public/' + DOCS_PATH, function(err, files) {
    var sortFiles = files.sort();
    for (var i = 0; i < sortFiles.length; i++) {
      if (sortFiles[i].match("年度"))
        annualFiles.push( '../' + DOCS_PATH + sortFiles[i]);
    }
    res.render('finance/annually_reports', {
      title: '季度报表',
      years: years,
      annual: annualFiles,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});
module.exports = router;