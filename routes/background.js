var querystring = require('querystring');
var express = require('express'),
  router = express.Router(),
  formidable = require('formidable'),
  fs = require('fs'),
  bodyParser = require('body-parser'),
  assert = require('assert'),
  User = require('../collections/accounts'),
  crypto = require('crypto'),
  DOCS_PATH = 'images/docs/',
  PICTURES_NEWS_PATH = 'public/images/picture_news/',
  PICTURES_POST_PATH =  'public/images/posts/',
//  VOLUNTEER_HEADIMG_PATH = 'volunteer_headImg/',
  MAXFILESZIZE = 4 * 1024 * 1024,
  MAX_PICTURES_NEWS_SIZE = 1 * 1024 * 1024;
  MAX_PICTURES_POST_SIZE = 1 * 1024 * 1024;
//  MAXHEADIMGSZIZE = 2 * 1024 * 1024;


/* GET About page. */
router.get('/', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  res.redirect('/background/accounts');
});

router.get('/finances', function(req, res) {
  fs.readdir('public/' + DOCS_PATH, function(err, files) {
    var itemFiles = [],
      seasonFiles = [],
      annualFiles = [];
    var sortFiles = files.sort();
    for (var i = 0; i < sortFiles.length; i++) {
      var fileName = sortFiles[i];
      if (fileName.match("月份"))
        itemFiles.push(fileName);
      else if (fileName.match("季度"))
        seasonFiles.push(fileName);
      else if (fileName.match("年度"))
        annualFiles.push(fileName);
    }

    res.render('background/finances', {
      title: '财务报告',
      itemFiles: itemFiles,
      seasonFiles: seasonFiles,
      annualFiles: annualFiles,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});

router.post('/finances', function(req, res) {
  // using formidable
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) {
      // expection handling
      res.locals.error = err;
      console.log(err);
      return;
    }
    if (files.add.size === 0) {
      res.redirect('./finances');
      return;
    }
    form.uploadDir = DOCS_PATH; // set upload dir
    form.keepExtensions = true; // 保留后缀
    form.maxFieldSize = MAXFILESZIZE; // file size
    var newPath;
    // 判断报表类型
    if (fields.month !== undefined) {
      newPath = DOCS_PATH + fields.year + "-" + fields.month + '.' + (files.add.name + "").split('.')[1];
    } else {
      newPath = DOCS_PATH + "年度-" + fields.year + '.' + (files.add.name + "").split('.')[1];
    }
    // 重命名 文件
    fs.renameSync(files.add.path, 'public/' + newPath);
  });
  res.redirect('finances');
});


// delete file post router
router.post('/finances_deleteFiles', function(req, res) {
  // request body fileName
  fs.unlink('public/' + DOCS_PATH + req.body.fileName, function() {
    console.log("Delete " + DOCS_PATH + req.body.fileName + "  !");
  });
  res.redirect('finances');
});

// view file post router
router.post('/finances_ViewFiles', function(req, res) {
  // fs.readFile(DOCS_PATH + req.body.fileName, {
  //     encoding: "UTF-8"
  //   },

    // function(errr, data) {
      res.send({
        content: '../' + DOCS_PATH + req.body.fileName,
      });
});


function volunteer_apply(requstBody) {

  function returnObject(object) {
    return object === undefined ? '' : object;
  }
  var date = new Date();
  var day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();
  return {
    username: returnObject(requstBody.name),
    gender: returnObject(requstBody.gender),
    birthYear: returnObject(requstBody.birthYear),
    birthMonth: returnObject(requstBody.birthMonth),
    province: returnObject(requstBody.province),
    city: returnObject(requstBody.city),
    politicalStatus: returnObject(requstBody.politicalStatus),
    workUnit: returnObject(requstBody.workUnit),
    position: returnObject(requstBody.postion),
    IDCardNo: returnObject(requstBody.IDCardNo),
    speciality: returnObject(requstBody.speciality),
    address: returnObject(requstBody.address),
    postcode: returnObject(requstBody.postcode),
    cellphone: returnObject(requstBody.cellphone),
    phone: returnObject(requstBody.phone),
    email: returnObject(requstBody.email),
    QQ: returnObject(requstBody.QQ),
    languages: returnObject(requstBody.languages),
    vihicles: returnObject(requstBody.vihicles),
    volunteerTime: returnObject(requstBody.volunteerTime),
    serviceMessage: returnObject(requstBody.serviceMessage),
    serviceActivity: returnObject(requstBody.serviceActivity),
    serviceOthers: returnObject(requstBody.serviceOthers),
    opinions: returnObject(requstBody.opinions),
    time: (year + "/" + month + "/" + day),
    isPassed: false
  };
}

// handle uploaded volunteer form
router.post("/upload_volunteer_form", function(req, res) {
  var db = req.db.collection('volunteers_apply');
  var volunteerApply = volunteer_apply(req.body);
  // insert volunteerApply
  db.find({IDCardNo: volunteerApply.IDCardNo}).toArray(function(err, docs) {
    if(err) {
      console.log(err);
    } else {
        // 完成不可重复申请 未做重复申请提醒
        if(docs.length === 0) {
         db.insert(volunteerApply, function(err, item) {
           assert.equal(null, err);
          });
         req.flash('success', '申请表格投递成功,请等候审核');
         res.redirect("/volunteer/apply");
        } else {
          req.flash('err', '请勿重复申请');
          res.redirect("/volunteer/apply");
        }
      }
  });

});

// pass volunteer form
router.post("/pass_volunteer_form", function(req, res) {
  var db = req.db.collection('volunteers_apply');
  db.update({
    IDCardNo: req.body.IDCardNo
  }, {
    $set: {
      "isPassed": true
    }
  }, function(err, item) {
    res.redirect('volunteers_apply');
  });
});

router.post("/delete_volunteer_form", function(req, res) {
  var db = req.db.collection('volunteers_apply');
  db.findAndRemove({
    IDCardNo: req.body.IDCardNo
  }, function(err, item) {
    res.redirect('volunteers_apply');
  });
});

router.get('/volunteers_apply', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/');
  }
  var db = req.db.collection('volunteers_apply');
  db.find().toArray(function(err, docs) {
    var volunteersApply = [],
      volunteersPassed = [];
    assert.equal(null, err);
    for (var i in docs) {
      if (docs[i].isPassed) {
        volunteersPassed.push(docs[i]);
      } else {
        volunteersApply.push(docs[i]);
      }
    }
    res.render('background/volunteers_apply', {
      title: '志愿者申请表 ',
      volunteersApply: volunteersApply,
      volunteersPassed: volunteersPassed,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});
// 动态新闻
router.get('/dynamics', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  var db = req.db.collection('posts');
  db.find({}, {sort: {createdAt: -1}}).toArray(function(err, docs) {
    var data = docs;
    res.render('background/dynamics', {
      title: '动态新闻',
      posts: data,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});
// 动态新闻 编辑

// 删除动态新闻,保留插图
router.post('/delete_post', function(req, res) {
  var db = req.db.collection('posts');
  var ObjectID = require('mongodb').ObjectID;
  db.remove({_id: ObjectID(req.body.post_id)}, function(err, item) {
    if (err) console.log(err);
    else res.redirect('dynamics');
  });
});
//修改动态新闻
router.post('/dynamics/update_posts', function(req, res) {
  var db = req.db.collection('posts');
  var ObjectID = require('mongodb').ObjectID;
  db.update({_id: ObjectID(req.query.id)}, {$set: {title: req.body.title, content: req.body.content, createdAt: req.body.createdAt}}, function(err, item) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('../dynamics');
    } 
  });
});
// 添加动态新闻
router.get('/dynamics/dynamics-edit', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  res.render('background/dynamics-edit', {
    title: '动态新闻',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
router.post('/dynamics/upload_post', function(req, res) {
  var db = req.db.collection('posts');
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.locals.error = err;
      console.log(err);
      return;
    } else if (files.newCover.size === 0) {
      res.redirect('../dynamics/dynamics-edit');
      return;
    } else {
          form.uploadDir = PICTURES_POST_PATH;
          form.keepExtensions = true;
          form.maxFieldSize = MAXFILESZIZE;
          var newPost = newPicture_post(fields, files);
          db.insert(newPost, function(err, item) {
            assert.equal(null, err);
            fs.renameSync(files.newCover.path,  PICTURES_POST_PATH + files.newCover.name);
            res.redirect('../dynamics');
          });
        }
          function newPicture_post(fields,files) {
            return {
              createdAt: new Date(),
              viewCount: 0,
              commentCount: 0,
              author: fields.newsCreator,
              title: fields.newsTitle,
              cover: '/images/posts/' + files.newCover.name,
              content: fields.newContent,
            };
          }
    });
});
// 图片新闻 部分  
router.get('/news', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  var db = req.db.collection('pictures');
  db.find().toArray(function(err, docs){
    var data = docs;
    res.render('background/news', {
      title: '图片新闻 ',
      pictureNews: data,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});

router.get('/news/news-edit', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/');
  }
  res.render('background/news-edit', {
    title: '图片新闻编辑',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/news/update_picture', function(req, res){
  var db = req.db.collection('pictures');
  db.update({src: req.query.src}, {$set: {title: req.body.title, note: req.body.note}}, function(err, item){
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('../news');
    }
  });
});

router.post('/news/upload_picture_news', function(req, res) {
  var db = req.db.collection('pictures');
  // using formidable
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) {
      // expection handling
      res.locals.error = err;
      console.log(err);
      return;
    }
    if (files.newsImage.size === 0) {
      res.redirect('../news/news-edit');
      return;
    }
    form.uploadDir = PICTURES_NEWS_PATH; // set upload dir
    form.keepExtensions = true; // 保留后缀
    form.maxFieldSize = MAXFILESZIZE; // file size
    var newPictureNews = newPicture_news(fields, files);
    db.findOne(
      {src: '/images/pircture_news' + files.newsImage.name},
      function(err, docs) {
        if (docs) {
            res.redirect('../news');
        } else {
          db.insert(newPictureNews, function(err, item) {
            assert.equal(null, err);
            // 重命名 文件
            fs.renameSync(files.newsImage.path,  PICTURES_NEWS_PATH + files.newsImage.name);
            res.redirect('../news');
          });
        }
      });
  });


  function newPicture_news(fields,files) {
    var date = new Date();
    var day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();
    return {
      createdAt: (year + "/" + month + "/" + day),
      createdBy: fields.newsCreator,
      src: '/images/picture_news/' + files.newsImage.name,
      title: fields.newsTitle,
      note: fields.newNote
    };
  }
});

// delete picture
router.post('/delete_picture', function(req, res) {
  var db = req.db.collection('pictures');
  db.remove({src: req.body.src},
    function(err, item){
      if(err) {
        console.log(err);
      } else {
        res.redirect('news');
      }
    });
    fs.unlink("public" + req.body.src);
});


router.get('/accounts', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  //从数据库获取用户
  var db = req.db.collection('users');
  db.find().toArray(function(err, users) {
    var account_admin = [],
      account_user = [];
    assert.equal(null, err);
    for (var i in users) {
      if (users[i].role == 'admin') {
        account_admin.push(users[i]);
      } else if (users[i].role == 'user') {
        account_user.push(users[i]);
      }
    }

    res.render('background/accounts', {
      title: '账户管理',
      account_admin: account_admin,
      account_user: account_user,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});

/**
 ** 后台 捐赠明细
 **/
router.get('/donations', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  res.render('background/donations', {
    title: '捐赠明细',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
/**
 ** 后台 捐赠明细   添加操作    不会检查直接插入 !~!~!~!~
 **/
router.get('/addToDonation', function(req, res) {
  var db = req.db;
  var texts = req.query.texts;
  if (texts[0] === '0') {
    db.collection('donations', function(err, col) {
      col.insert({
        type: 0,
        donator: texts[4],
        amount: texts[5],
        // 必须传入月份数减一 
        date: new Date(texts[1], texts[2] - 1, texts[3])
      }, {
        save: true
      }, function(err, result) {
        if (err) {
          res.send('非限定性捐款 no');
        } else {
          res.send('非限定性捐款 ok');
        }
      });
    });
  } else if (texts[0] === '1') {
    db.collection('donations', function(err, col) {
      col.insert({
        type: 1,
        donator: texts[4],
        amount: texts[5],
        date: new Date(texts[1], texts[2] - 1, texts[3]),
        note: texts[6]
      }, {
        save: true
      }, function(err, result) {
        if (err) {
          res.send('限定性捐款 no');
        } else {
          res.send('限定性捐款 ok');
        }
      });
    });
  } else {
    db.collection('donations', function(err, col) {
      col.insert({
        type: 2,
        donator: texts[4],
        goods: texts[5],
        date: new Date(texts[1], texts[2] - 1, texts[3]),
        note: texts[6]
      }, {
        save: true
      }, function(err, result) {
        if (err) {
          res.send('物资捐款 no');
        } else {
          res.send('物资捐款 ok');
        }
      });
    });
  }
});
/**
 ** 后台 捐赠明细   历史记录
 **/
router.get('/donationHistory', function(req, res) {
  var db = req.db;
  var type = req.query.type;
  var year = req.query.year;
  var month = req.query.month;
  var donationHistory;
  db.collection('donations', function(err, col) {
    col.find({
      'type': parseInt(type),
      'date': {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1)
      }
    }).toArray(function(err, docs) {
      donationHistory = docs;
      res.send(donationHistory);
    });
  });
});
/**
 ** 后台 捐赠明细   批量填写 非限定性捐款
 **/
router.post('/sendUnlimitedRecords', function(req, res) {
  var db = req.db;
  var donators = req.body.donators;
  var amounts = req.body.amounts;
  var count = 0;
  var callback = function(err, results) {
    ++count;
    if (count === donators.length)
      res.send("sendUnlimitedRecords success");
  };
  db.collection('donations', function(err, col) {
    for (var i = 0; i < donators.length; ++i) {
      col.insert({
        type: 0,
        donator: donators[i],
        amount: amounts[i],
        date: new Date()
      }, {
        save: true
      }, callback);
    }
  });
});
/**
 ** 后台 捐赠明细   批量填写 限定性捐款
 **/
router.post('/sendlimitedRecords', function(req, res) {
  var db = req.db;
  var donators = req.body.donators;
  var amounts = req.body.amounts;
  var notes = req.body.notes;
  var count = 0;
  var callback = function(err, results) {
    ++count;
    if (count === donators.length)
      res.send("sendlimitedRecords success");
  };
  db.collection('donations', function(err, col) {
    for (var i = 0; i < donators.length; ++i) {
      col.insert({
        type: 1,
        donator: donators[i],
        amount: amounts[i],
        date: new Date(),
        note: notes[i],
      }, {
        save: true
      }, callback);
    }
  });
});
/**
 ** 后台 活动预告
 **/
router.get('/foreshows', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  var db = req.db;
  var activity = [];
  db.collection('activity', function(err, col) {
    col.find({}).toArray(function(err, docs) {
      activity = docs;
      res.render('background/foreshows', { // 放在外边里面不一样，异步的关系？
        title: '活动预告',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
        activity: activity,
      });
    });
  });
});
/**
 ** 后台 活动预告
 **/
router.get('/foreshows/foreshows-edit', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  res.render('background/foreshows-edit', {
    title: '活动预告编辑',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
/**
 ** 后台 活动预告 修改
 **/
router.post('/foreshows/update_activity', function(req, res) {
  var db = req.db.collection('activity');
  var ObjectID = require('mongodb').ObjectID;
  db.update({_id: ObjectID(req.query.id)}, {$set: {
    headline: req.body.headline,
    logo: req.body.logo,
    source: req.body.source,
    host: req.body.host,
    guest: req.body.guest,
    help: req.body.help,
    destination: req.body.destination,
    contents: req.body.contents,
  }}, function(err, item) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('../foreshows');
    } 
  });
});
/**
 ** 后台 添加活动预告
 **/
router.post('/foreshows/upload_foreshow', function(req, res) {
  var db = req.db.collection('activity');
  var getNewForeshow = function() {
    return {
        headline: req.body.activity_headline,
        dest_time: new Date(),
        create_time: new Date(),
        author: req.body.activity_author,
        source: req.body.activity_source,
        contents: req.body.activity_contents,
        viewCount: 1
    };
  };
  db.insert(getNewForeshow(), {w:1}, function(err, records) {
    if (err)  {
      console.log(err);
      return;
    }
    else {
      console.log(records);
      res.redirect('../foreshows');
    }
  });
});
/*
** 后台活动预告 修改截止时间  
*/
router.get('/modifyDestTime', function(req, res) {
  var db = req.db;
  var year = req.query.year;
  var month = req.query.month;
  var day = req.query.day;
  var id = req.query.id;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('activity', function(err, col) {
    col.update({_id: ObjectID(id)}, {$set : {'dest_time': new Date(year, month-1, day)}}, function(err, result) {
      res.send('ok');
    });
  });
});
/*
** 后台活动预告 删除活动预告  
*/
router.post('/deleteForeshow', function(req, res) {
  var db = req.db;
  var id = req.body.id;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('activity', function(err, col) {
    col.remove({_id: ObjectID(id)}, function(err, result) {
      res.send("ok");
    });
  });
});


/**
 ** 分享交流基本页面
 ** 获得查询到的所有条目的总数，进而确定分期数目，每期5个
 ** show==0表示初始时候所有的内容都不展开
 **/
router.get('/shares', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  var db = req.db;
  var count = 0;
  var share;
  var record_number;
  db.collection('share', function(err, col) {
    col.find({}, {sort: {'period': -1}}).toArray(function(err, docs) {
      if (err) {
        console.log(err.message);
      } else {
        share = docs;
        callback();
      }
    });
  });
  db.collection('share', function(err, col) {
    col.find(function(err, cursor) {
      cursor.count(function(err, count) {
        record_number = count;
        callback();
      });
    });
  });
  var callback = function() {
    count++;
    if (count == 2) {
      res.render('background/shares', {
        title: '分享交流',
        share: share,
        record_number: record_number,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    }
  };
});
/**
 ** 分享页面修改文本
 **/
router.post('/shares/update_oneShare', function(req, res) {
  var db = req.db.collection('share');
  var ObjectID = require('mongodb').ObjectID;
  db.update({_id: ObjectID(req.query.id)}, {$set: {headline: req.body.headline, summary: req.body.summary, contents: req.body.contents, author: req.body.author}}, function(err, item) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('../shares');
    } 
  });
});
/**
 ** 分享页面修改文本和照片
 **/
// router.post('/modifyTexts/:id', function(req, res) {
//   var ObjectID = require('mongodb').ObjectID;
//   var id = req.params.id;
//   var files = [];
//   var texts = [];
//   var db = req.db;
//   var form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.encoding = "utf-8";
//   form.on('field', function(field, value) {
//     texts.push(value);
//   });
//   form.on('file', function(field, file) {
//     if (file.size !== 0) { // 没上传文件也照吃
//       fs.renameSync(file.path, 'public/images/share/' + file.name);
//       files.push({
//         path: '/images/share/' + file.name
//       });
//     }
//   });
//   form.parse(req, function() {
//     db.collection('share', function(err, col) {
//       if (files.length === 0) {
//         col.update({
//           _id: ObjectID(id)
//         }, {
//           $set: {
//             'summary': texts[0],
//             'contents': texts[1]
//           }
//         }, function(err, result) {
//           if (err) {
//             console.log(err.message);
//             return;
//           }
//           res.redirect('/background/shares');
//         });
//       } else {
//         col.update({
//           _id: ObjectID(id)
//         }, {
//           $set: {
//             'summary': texts[0],
//             'contents': texts[1],
//             'path': files[0].path
//           }
//         }, function(err, result) {
//           if (err) {
//             console.log(err.message);
//             return;
//           }
//           res.redirect('/background/shares');
//         });
//       }
//     });
//   });
// });
/**
 ** 分享页面添加新的一期
 **/
router.post('/shares/addNewPeriod', function(req, res) {
  var number = req.query.id;
  var fileNames = [];
  var arr = [];
  var db = req.db;
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.encoding = "utf-8";
  form.on('file', function(field, file) { // 这一步我主要是得到上传文件的位置并移到指定的位置
      fs.renameSync(file.path, 'public/images/share/' + file.name);
      fileNames.push(file.name);
  });
  form.parse(req, function(err) {
    for (var i = 0; i < 5; ++i) {
        fileNames[i] = '/images/share/' + fileNames[i];
      arr.push({
        period: number,
        date: new Date(),
        author: "点点",
        path: fileNames[i],
        headline: "点点",
        contents: "点点",
        summary: "点点"
      });
    }
    db.collection('share', function(err, col) {
      col.insert(arr, function(err, result) {
        if (err) {
          console.log(err.message);
          return;
        }
        res.redirect('/background/shares');
      });
    });
  });
});
/**
 **  后台点点相册
 **/
router.get('/albums', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  var db = req.db;
  var albums;
  db.collection('albums', function(err, col) {
    col.find({}, {
      sort: {
        _id: -1
      }
    }).toArray(function(err, docs) {
      albums = docs;
      callback();
    });
    var callback = function() {
      res.render('background/albums', {
        titile: "albums",
        albums: albums,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    };
  });
});
/**
 **  后台点点相册的照片
 **/
router.get('/albums/:id', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  var db = req.db;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('albums', function(err, col) {
    col.findOne({
      _id: ObjectID(req.params.id)
    }, function(err, item) {
      res.render('background/album_details', {
        title: req.params.name,
        album: item,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });
});
/**
 **  删除相册 [][][][]
 **/
router.post('/albums/deleteAlbum', function(req, res) {
  var db = req.db;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('albums', function(err, col) {
    col.remove({
      _id: ObjectID(req.param('hiddenAlbumId'))
    }, {
      safe: true
    }, function(err, result) {
      if (err)
        console.log(err.message);
      else
        res.redirect('/background/albums');
    });
  });
});
/**
 **  删除相册内的照片 [][][][][]
 **/
router.post('/albums/deletePitures', function(req, res) {
  var db = req.db;
  var ObjectID = require('mongodb').ObjectID;
  var picture_name = req.body.pictureName;
  var album_id = req.body.album_id;
  db.collection('albums', function(err, col) {
    col.update({
      _id: ObjectID(album_id)
    }, {
      $pull: {
        pictures: {
          headline: picture_name,
        }
      }
    }, function(err, result) {
      res.redirect('/background/albums/' + album_id);
    });
  });
});
/**
 **  上传相册 [][][][]
 **/
router.post('/albums/uploadAlbum', function(req, res) {
  var db = req.db,
    new_album_name,
    new_album_src,
    actual_album_src,
    form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.encoding = "utf-8";
    form.parse(req, function(error, fields, files) {
    if (files.upload.size !== 0) { // 没上传文件也照吃
      new_album_name = fields.new_album_name;
      new_album_src = "public/images/albums/" + files.upload.name;
      actual_album_src = "/images/albums/" + files.upload.name;
      fs.renameSync(files.upload.path, new_album_src);
      db.collection('albums', function(err, col) {
        col.insert({
            name: new_album_name,
            createdAt: new Date(),
            cover: actual_album_src,
            pictures: []
          }, {
            w: 1
          },
          function(err, records) {
            if (err) {
              console.log(err);
              return;
            }
            res.redirect('/background/albums');
          });
      });
    } else
      res.redirect('/background/albums');
  });
});
/**
 **  上传相册的照片 [][][][]
 **/
router.post('/albums/uploadPhotos', function(req, res) {
  var db = req.db,
    files = [],
    fields = [],
    ObjectID = require('mongodb').ObjectID,
    form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.encoding = "utf-8";
  form.on('field', function(field, value) {
    fields.push([field, value]);
  });
  form.on('file', function(field, file) {
    if (file.size !== 0) { // 没上传文件也照吃
      fs.renameSync(file.path, 'public/images/albums/' + file.name);
      files.push({
        src: '/images/albums/' + file.name,
        headline: file.name.split('.')[0],
        index: '/images/albums/' + file.name,
        introduction: "暂时还没有介绍内容"
      });
    }
  });
  form.parse(req, function() {
    db.collection('albums', function(err, col) {
      col.update({
        _id: ObjectID(fields[0][1])
      }, {
        $pushAll: {
          pictures: files
        }
      }, function(err, result) {
        if (err) {
          console.log(err.message);
          return;
        } else
          res.redirect('/background/albums/' + fields[0][1]);
      });
    });
  });
});
/**
 **  修改相册封面 [][][][]
 **/
router.post('/albums/modifyAlbumCover', function(req, res) {
  var db = req.db;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('albums', function(err, col) {
    col.update({
      _id: ObjectID(req.body.album_id),
    }, {
      $set: {
        'cover': req.body.pictureSrc,
      }
    }, function(err, result) {
      if (err) {
        console.log(err.message);
        return;
      }
    });
    res.redirect('/background/albums/' + req.body.album_id);
  });
});
/**
 **  修改照片信息 [][][][][]
 **/
router.post('/albums/modifyPictureContents', function(req, res) {
  var db = req.db.collection('albums');
  var ObjectID = require('mongodb').ObjectID;
  db.update({
        $and: [{
          _id: ObjectID(req.body.album_id)
        }, {
          'pictures.index': req.body.pictureIndex,
        }]
      }, {
        $set: {
          'pictures.$.introduction': req.body.introduction,
          'pictures.$.headline' : req.body.headline,
        }
      }, function(err, result) {
        res.redirect('/background/albums/' + req.body.album_id);
      });
});
/**
 **  修改相册名称 [][][][]
 **/
router.post('/albums/modifyAlbumName', function(req, res) {
  var db = req.db;console.log(req.body.album_name);
  var ObjectID = require('mongodb').ObjectID;
  db.collection('albums', function(err, col) {
      col.update({
        _id: ObjectID(req.body.album_id)
      }, {
        $set: {
          name: req.body.album_name,
        }
      }, function(err, result) {
        res.redirect('/background/albums');
      });
    });
});
/*
 **  后台横幅管理基本页面
 */
router.get('/banners', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  var db = req.db;
  var banners = [];
  db.collection('carousels', function(err, col) {
    col.find().toArray(function(err, docs) {
      banners = docs;
      res.render('background/banners', {
        banners: banners,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });
});

/*
 **  后台横幅 添加横幅
 */
router.post('/bannersubmitt', function(req, res) {
  var db = req.db;
  var form = new formidable.IncomingForm();
  form.parse(req, function(req, fields, files) {
    if (files.addImage.size !== 0) {
      var tmpPath = files.addImage.path;
      var targetPath = './public/images/banners/' + files.addImage.name;
      fs.rename(tmpPath, targetPath);
      db.collection('carousels', function(err, col) {
        col.update({
          src: '/images/banners/' + files.addImage.name
        }, {
          src: '/images/banners/' + files.addImage.name,
          link: '/'
        }, {
          upsert: true,
          w: 1
        }, function(err, result) {
          if (err) {
            console.log(err.message);
            return;
          }
        });
      });
    }
    res.redirect('/background/banners');
  });
});
/*
 **  后台横幅 添加链接
 */
router.post('/addLink', function(req, res) {
  var db = req.db;
  var activity = [];
  var posts = [];
  var all = [];
  var count = 0;
  db.collection('activity', function(err, col) {
    col.find({}, {'headline': 1, _id: 1}).toArray(function(err, docs) {
      activity = docs;
      callback();
      });
    });
  db.collection('posts', function(err, col) {
    col.find({}, { 'title': 1,  _id: 1, }).toArray(function(err, docs) {
      posts = docs;
      callback();
    });
  });
  function callback() {
    if (count === 0)
      count  = 1;
    else {
      all.push(activity);
      all.push(posts);
      res.send(all);
    }
  }
});
router.post('/modifyLink', function(req, res) {
  var db = req.db;
  var src = req.body.src;
  var type = req.body.type;
  var id = req.body.id;
  if (type === 'foreshowUL') {
    db.collection('carousels', function(err, col) {
      col.update({'src': src}, {$set: {'link': '/news/activity/' + id}}, function(err, item) {
        res.send(item);
      });
    });
  } else {
    db.collection('carousels', function(err, col) {
      col.update({'src': src}, {$set: {'link': '/news/posts/'+id}}, function(err, item) {
        res.send(item);
      });
    });
  }
});

/*
 **  后台横幅 删除横幅 删除数据库条目 以及存储位置的原文件
 */
router.post('/deleteBanner', function(req, res) {
  var db = req.db;
  var banner = req.body.hiddenBanner;
  db.collection('carousels', function(err, col) {
    col.remove({
      src: banner
    }, {
      w: 1
    }, function(err, numberOfRemoved) {
      if (err) {
        console.log(err.message);
        return;
      } else {
        res.redirect('/background/banners');
      }
    });
  });
});
/*
 **  后台资助申请
 */
router.get('/funds_apply', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/');
  }
  var db = req.db;
  db.collection('fundLabels', function(err, labels) {
    labels.find().toArray(function(err, doc) {
      var label = [];
      label = doc;
      db.collection('fundsApply', function(err, col) {
        col.find().toArray(function(err, docs) {
          var fundsApply = [];
          var fundsPassed = [];
          var fundsUnPassed = [];
          assert.equal(null, err);
          for (var i in docs) {
            if (docs[i].type === "Pass")
              fundsPassed.push(docs[i]);
            else if (docs[i].type === 'unPass')
              fundsUnPassed.push(docs[i]);
            else
              fundsApply.push(docs[i]);
          }
          res.render('background/funds_apply', {
            title: '资助申请',
            labels: label,
            fundsApply: fundsApply,
            fundsPassed: fundsPassed,
            fundsUnPassed: fundsUnPassed,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
          });
        });
      });
    });
  });
});
/*
 **  后台资助申请 获得某份具体申请
 */
router.post('/getFundInfo', function(req, res) {
  var fundsID = req.body.fundsID;
  var db = req.db;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('fundsApply', function(err, col) {
    col.findOne({
      _id: ObjectID(fundsID)
    }, function(err, item) {
      if (err) {
        res.send(null);
      } else {
        res.send(item);
      }
    });
  });
});
/*
 **  后台资助申请 否决 通过
 */
router.get('/passFund', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/');
  }
  var fundsID = req.query.fundsID;
  var type = req.query.type;
  var db = req.db;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('fundsApply', function(err, col) {
    col.update({
      _id: ObjectID(fundsID)
    }, {
      $set: {
        'type': type
      }
    }, function(err, item) {
      if (err) {
        res.send(null);
      } else {
        res.send('ok');
      }
    });
  });
});
/*
 **  后台资助申请 增标签
 */
router.post('/modifyLabels', function(req, res) {
  var ObjectID = require('mongodb').ObjectID;
  var db = req.db;
  var fundsID = req.body.fundsID;
  var label = req.body.label;
  db.collection('fundsApply', function(err, cols) {
    cols.update({
      _id: ObjectID(fundsID)
    }, {
      $addToSet: {
        'label': {
          $each: label
        }
      }
    }, function(err, result) {
      db.collection('fundLabels', function(err, col) {
        col.update({}, {
          $addToSet: {
            'label': {
              $each: label
            }
          }
        }, function(err, results) {
          res.send('success');
        });
      });
    });
  });
});
/*
 **  后台资助申请 删标签 历史标签会遗留
 */
router.post('/deleteLable', function(req, res) {
  var ObjectID = require('mongodb').ObjectID;
  var db = req.db;
  var fundsID = req.body.fundsID;
  var theLabel = req.body.theLabel;
  db.collection('fundsApply', function(err, cols) {
    cols.update({
      _id: ObjectID(fundsID)
    }, {
      $pull: {
        'label': theLabel
      }
    }, function(err, result) {
      res.send('success');
    });
  });
});
/*
 **  后台资助申请 通过标签看表
 */
router.get('/getFundsByLabel', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/');
  }
  var db = req.db;
  var label = req.query.theLabel;
  db.collection('fundsApply', function(err, col) {
    col.find({
      'label': label
    }).toArray(function(err, docs) {
      res.send(docs);
    });
  });
});

router.post('/delete-user', function(req, res) {
  var username = req.param('username');
  var db = req.db.collection('users');
  db.remove({
    username: username
  }, {
    safe: true
  }, function(err, result) {
  });

  res.redirect("/background/accounts");
});

router.get('/profile', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/');
  }
  var editUser;
  var username = req.param('username');
  var db = req.db.collection('users');
  db.findOne({
    username: username
  }, function(err, doc) {
    editUser = doc;

    //把该用户的信息传进去
    res.render('background/profile', {
      title: "账户编辑",
      editUser: editUser,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});

//编辑用户
router.post('/profile', function(req, res) {
  var oriUsername = req.body.oriusername,
    username = req.body.username,
    email = req.body.email,
    nickname = req.body.nickname,
    gender = req.body.gender,
    birthday = req.body.birthday,
    job = req.body.job,
    phone = req.body.phone,
    QQ = req.body.QQ,
    weibo = req.body.weibo,
    about = req.body.about,
    db = req.db.collection('users');

  db.findOne({
    username: oriUsername
  }, function(err, doc) {
    //检查是否修改了密码
    var password;
    if (req.body.password === "") {
      password = doc.password;
    } else {
      var md5 = crypto.createHash('md5');
      password = md5.update(req.body.password).digest('hex');
    }

    //更新数据
    db.update({
      username: oriUsername
    }, {
      $set: {
        "username": username,
        "password": password,
        "email": email,
        "profile": {
          "nickname": nickname,
          "gender": doc.profile.gender,
          "birthday": birthday,
          "job": job,
          "phone": phone,
          "QQ": QQ,
          "weibo": weibo,
          "about": about
        }
      }
    }, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        if (doc.role == "admin" && doc.username !== username) {
          req.flash("success", "管理员用户名修改成功");
          res.redirect("/logout");
        } else if ((doc.role == "admin" && doc.username == username) || doc.role == "user") {
          res.redirect("/background/accounts");
        }
      }
    });
  });
});

router.get('/addAdmin', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/');
  }

  res.render('background/addAdmin', {
    title: "添加管理员",
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

//添加管理员
router.post('/addAdmin', function(req, res) {
  //检查两次输入的密码是否一致
  var md5_password = crypto.createHash('md5'),
    password = md5_password.update(req.body.password).digest('hex');
  var md5_password_re = crypto.createHash('md5'),
    password_re = md5_password_re.update(req.body['password-repeat']).digest('hex');
  if (password != password_re) {
    req.flash('error', '两次输入的密码不一致');
    return res.redirect('/background/addAdmin');
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
    "role": 'admin',
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
      return res.redirect('/background/addAdmin');
    }

    newUser.save(function(err, user) {
      if (err) {
        req.flash('error', '插入users数据库失败');
        return res.redirect('/background/addAdmin');
      }
      return res.redirect('/background/accounts');
    });
  });
});

//搜索用户
router.post('/search-users', function(req, res) {
  var username = req.param('keyword');
  var user;
  var account_admin = [];
  var account_user = [];
  //从数据库获取用户
  var db = req.db.collection('users');
  db.findOne({
    username: username
  }, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      user = doc;
      res.send(user);
    } 
  });
});

module.exports = router;