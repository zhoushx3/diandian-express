var express = require('express');
var router = express.Router();

/* GET aiding page. */
router.get('/', function(req, res) {
  res.render('aiding/aiding', {
    title: '申请资助',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

/* GET apply_aiding page. */
router.get('/apply', function(req, res) {
  if(!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  res.render('aiding/apply_aiding', {
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/apply/submit', function(req, res) {
  var db = req.db,
    date  = new Date(),
    name = req.body.name,
    gender = req.body.gender,
    nation = req.body.nation,
    birthYear = req.body.birthYear,
    birthMonth = req.body.birthMonth,
    school = req.body.school,
    classic = req.body.class,
    fee = req.body.fee,
    watcher = req.body.watcher,
    age = req.body.age,
    IDCardNo = req.body.IDCardNo,
    work = req.body.work,
    cellphone = req.body.cellphone,
    other = req.body.else,
    income = req.body.income,
    posession = req.body.posession,
    nowAddress = req.body.nowAddress,
    homeAddress = req.body.homeAddress,
    reason = req.body.reason;
  db.collection('fundsApply', function(err, col) {
    col.insert({
      "name": name,
      "gender": gender,
      "nation": nation,
      "birth-year": birthYear,
      "birth-month": birthMonth,
      "school": school,
      "class": classic,
      "fee": fee,
      "watcher": watcher,
      "age": age,
      "ID-cardNo": IDCardNo,
      "work": work,
      "cellphone": cellphone,
      "else": other,
      "income": income,
      "home-address": homeAddress,
      "now-address": nowAddress,
      "posession": posession,
      "reason": reason,
      "date": date,
      "type": "unchecked",
      "label": []
    }, function(err, doc) {
      if (err) {
        console.log("Something wrong happened in adding imformation to the aiding database.");
      } else {
        res.redirect("/aiding");
      }
    });
  });
});

module.exports = router;