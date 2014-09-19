var express = require('express');
var router = express.Router();

/* GET aiding page. */
router.get('/', function(req, res) {
  res.render('aiding/aiding', {title:'申请资助'});
});

/* GET apply_aiding page. */
router.get('/apply', function(req, res) {
  res.render('aiding/apply_aiding', {});
});

router.post('/apply/submit', function(req, res) {
  var db = req.db,
  name = req.body.name,
  gender = req.body.gender,
  birthYear = req.body.birthYear,
  birthMonth = req.body.birthMonth,
  school = req.body.school,
  classic = req.body.class,
  fee = req.body.fee,
  server = req.body.server,
  age = req.body.age,
  IDCardNo = req.body.IDCardNo,
  cellphone = req.body.cellphone,
  other = req.body.else,
  income = req.body.income,
  possetion = req.body.possetion,
  nowAddress = req.body.nowAddress,
  homeAddress = req.body.homeAddress,
  reason = req.body.reason;
  db.collection('singleAiding', function(err, col) {
    col.insert({
      "name" : name,
      "gender" : gender,
      "birth-year" : birthYear,
      "birth-month" : birthMonth,
      "school" : school,
      "class" : classic,
      "fee" : fee,
      "server" : server,
      "age" : age,
      "ID-cardNo" : IDCardNo,
      "cellphone" : cellphone,
      "else" : other,
      "income" : income,
      "possetion" : possetion,
      "now-address" : nowAddress,
      "home-address" : homeAddress,
      "reason" : reason
    }, function(err, doc) {
      if (err) {
        console.log("Something wrong happened in adding imformation to the aiding database.");
      } else {
        console.log("Add a new apply.");
        res.redirect("/aiding");
      }
    });
  });
});

module.exports = router;
