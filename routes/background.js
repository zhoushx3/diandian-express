var querystring = require('querystring');
var express = require('express'),
  router = express.Router(),
  formidable = require('formidable'),
  fs = require('fs'),
  bodyParser = require('body-parser'),
  assert = require('assert'),
  DOCS_PATH = 'docs/',
  VOLUNTEER_HEADIMG_PATH = 'volunteer_headImg/',
  MAXFILESZIZE = 4 * 1024 * 1024,
  MAXHEADIMGSZIZE = 2 * 1024 * 1024;


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
  res.render('background_layout', {
    title: '后台',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.get('/finances', function(req, res) {
  fs.readdir(DOCS_PATH, function(err, files) {
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
      title: 'finances',
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
  form.uploadDir = DOCS_PATH; // set upload dir
  form.keepExtensions = true; // 保留后缀
  form.maxFieldSize = MAXFILESZIZE; // file size
  form.parse(req, function(err, fields, files) {
    if (err) {
      // expection handling
      res.locals.error = err;
      console.log(err);
      return;
    }
    var newPath;
    // 判断报表类型
    if (fields.month !== undefined) {
      newPath = DOCS_PATH + fields.year + "-" + fields.month + '.' + (files.add.name + "").split('.')[1];
    } else {
      newPath = DOCS_PATH + "年度-" + fields.year + '.' + (files.add.name + "").split('.')[1];
    }
    // 重命名 文件
    fs.renameSync(files.add.path, newPath);
  });
  res.redirect('finances');
});



// delete file post router
router.post('/finances_deleteFiles', function(req, res) {
  // request body fileName
  fs.unlink(DOCS_PATH + req.body.fileName, function() {
    console.log("Delete " + DOCS_PATH + req.body.fileName + "  !");
  });

  res.redirect('finances');
});

// view file post router
router.post('/finances_ViewFiles', function(req, res) {
  fs.readFile(DOCS_PATH + req.body.fileName, {
      encoding: "UTF-8"
    },
    function(errr, data) {
      res.send({
        content: data
      });
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
  console.log(volunteerApply);
  db.insert(volunteerApply, function(err, item) {
    assert.equal(null, err);
  });
  res.redirect("/volunteer/apply");
});

// pass volunteer form
router.post("/pass_volunteer_form", function(req, res) {
  var db = req.db.collection('volunteers_apply');
  db.update({
    username: req.body.username
  }, {
    $set: {
      "isPassed": true
    }
  }, function(err, item) {
    res.location("volunteers_apply");
  });
});

router.post("/delete_volunteer_form", function(req, res) {
   var db = req.db.collection('volunteers_apply');
   console.log(req.body);
   db.remove({IDCardNo: req.body.IDCardNo}, {w:1}, function(err, item){
       res.location("/");
   });
});

// //wjw
// router.post('/add-administrator', function(req, res) {
//   var db = req.db,
//   name = req.body.administrator-name,
//   email = req.body.email,
//   qq = req.body.qq;
//   db.collection('administrator', function(err, col) {
//     col.insert({
//       "name"  : name,
//       "email" : email,
//       "qq" : qq
//     }, function(err, doc) {
//          if (err) {
//            console.log("add administrator fail!");
//          } else {
//            console.log("add administrator succceed!");
//            res.redirect("/background#accounts");
//          }
//     });
//   });
// });

// router.post('/', function(req,res) {
//   fs.readdir('./public/images/banners', function(err, files) {
//     var count = files.length;
//     res.render('banners', {num:count});
//   });
// });

// //send the image to server
// router.post('/bannerssubmit', function(req, res, next) {
//   fs.readdir('./public/images/banners/', function(err, files) {
//     var count = files.length + 1;
//     console.log(req.files);
//     if (req.files.addImage.size === 0) {
//       res.redirect('../');
//       res.send("<br>" + "<br>" + "<br>" + "please choose your file");
//     }  else {
//       var tmpPath = req.files.addImage.path;
//       var targetPath = './public/images/banners' + req.files.addImage.name;
//       fs.rename(tmpPath, targetPath, function(err) {
//         if (err) throw err;
//         fs.unlink(tmpPath, function() {
//           if (err) throw err;
//           res.redirect('../');
//           res.end();
//         });
//       });
//     }
//   });
// });

// //load the image from server
// router.get('/loadimages', function(req, res) { console.log("22222222222!");
//   fs.readdir('public/images/banners', function(err, files) {
//     var count = files.length, results = [];
//     files.forEach(function(filename) {
//       fs.readFile(filename, function(data) {
//         var tmpResult = {};
//         tmpResult.imageName = filename;
//         tmpResult.imagePath = "/public/images/banners" + filename;
//         results[count - 1] = tmpResult;
//         count--;
//         if (count <= 0) { 
//           console.log(results);
//           res.send(results);
//           res.end();
//           console.log("Response succceed!");
//         }
//       });
//     });
//   });
// });

// //show the image
// router.get('./showimages/:imaNames', function(req, res) {
//   var ima = req.params.imaNames;
//   fs.readFile('public/images/' + ima, 'binary', function(err, file) {
//     if (error) {
//       res.writehead(500, {"Content-Type" : "text/plain"});
//       res.write(error + '\n');
//       res.end();
//     } else {
//       res.writeHead(200, {"Content-Type" : "img/png"});
//       res.write(file, "binary");
//       res.end();
//     }
//   });
// });

// //wjw

router.get('/news', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  res.render('background/news', {
    title: 'news',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});



router.get('/volunteers_apply', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
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
      title: 'volunteers_apply ',
      volunteersApply: volunteersApply,
      volunteersPassed: volunteersPassed,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});

router.get('/banners', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  res.render('background/banners', {
    title: 'banners',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
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
  res.render('background/accounts', {
    title: 'accounts',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.get('/passwords', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  res.render('background/passwords', {
    title: 'passwords',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

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
    title: 'donations',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.get('/dynamics', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  res.render('background/dynamics', {
    title: 'dynamics',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.get('/dynamics-edit', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  res.render('background/dynamics-edit', {
    title: 'dynamics',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.get('/foreshows', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  res.render('background/foreshows', {
    title: 'foreshows',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.get('/foreshows-edit', function(req, res) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/signin');
  }
  if (req.session.user.role != 'admin') {
    req.flash('error', '请用管理员账号登陆后台');
    return res.redirect('/ ');
  }
  res.render('background/foreshows-edit', {
    title: 'foreshows',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});


/**
 ** 分享交流基本页面
 ** 获得查询到的所有条目的总数，进而确定分期数目，每期5个，最新一期可少于5个
 ** show==0表示所有的内容都不展开
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
  var record_num;
  db.collection('share', function(err, col) {
    col.find(function(err, cursor) {
      cursor.count(function(err, count) {
        record_num = count;
        callback();
      });
    });
  });
  var callback = function() {
    res.render('background/shares', {
      title: '分享交流',
      number: Math.floor(record_num / 5) + 1,
      show: 0,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  };
});

/**
 ** 分享页面按期显示，通过点击得到当期期数
 **/
router.post('/share_period', function(req, res) {
  var serial_number = req.param('id');
  var record_number, count = 0;
  var db = req.db;
  var share;
  db.collection('share', function(err, col) {
    col.find({
      period: serial_number.toString()
    }, {
      'limit': 5
    }).toArray(function(err, docs) {
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
        number: Math.floor(record_number / 5) + 1,
        show: serial_number
      });
    }
  };
});
/**
 ** 分享页面修改文本
 **/
router.post('/share_contents', function(req, res) {
  var id = req.param('id');
  var summary = req.param('summary');
  var contents = req.param('contents');
  var db = req.db;
  db.collection('share').findAndModify({
      _id: id
    }, // query
    [
      ['_id', 'asc']
    ], // sort order
    {
      summary: summary,
      contents: contents
    }, // replacement, replaces only the field "hi"
    {}, // options
    function(err, object) {
      if (err) {
        console.warn(err.message); // returns error if no matching object found
      } else {
        console.log(object);
        callback();
      }
    });
  var callback = function() {
    res.redirect('/background/shares');
  };
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
    col.find({}, {sort: {_id: -1}}).toArray(function(err, docs) {
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
    col.findOne({_id: ObjectID(req.params.id)}, function(err, item) {
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
**  删除相册
**/
router.post('/albums/deleteAlbum', function(req, res) {
  var db = req.db;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('albums', function(err, col) {
    col.remove({_id: ObjectID(req.param('hiddenAlbumName'))}, {safe: true}, function(err, result) {
      if (err)
        console.log(err.message);
      else
        res.redirect('/background/albums');
    });
  });
});
/**
**  删除相册内的照片
**/
router.post('/albums/deleteAlbum/:name', function(req, res) {
  var db = req.db;
  var ObjectID = require('mongodb').ObjectID;
  var album_name = req.params.name;
  var picture_name= req.param('hiddenAlbumId');
  var album_id = req.param('hiddenAlbumName');
  db.collection('albums', function(err, col) {
    col.update({_id: ObjectID(album_id)}, {
      $pull: {
        pictures: {
          name: picture_name,
        }
      }
    }, function(err, result) {
        res.redirect('/background/albums/' + album_id);
    });
  });
});
/**
**  上传相册
**/
router.post('/albums/uploadAlbum', function(req, res) {
  var db = req.db,
        new_album_name,
        new_album_src,
        actual_album_src,
        form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.encoding="utf-8";
  form.parse(req, function(error, fields, files) {
    console.log(files.upload);
    if(files.upload.size !== 0) { // 没上传文件也照吃
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
                          },
                          {w: 1},
                          function(err, records) {
                            if (err) {
                              console.log(err);
                              return;
                            }
                            res.redirect('/background/albums');
                          });
      });
    }
    else 
      res.redirect('/background/albums');
  });
});
/**
**  上传相册的照片
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
      if(file.size !== 0) { // 没上传文件也照吃
          fs.renameSync(file.path, 'public/images/albums/' + file.name);
          files.push({
            src: '/images/albums/' + file.name,
            name: file.name,
            instruction: "no instruction for now"
          });
      }
    });
    form.parse(req, function() {
      db.collection('albums', function(err, col) {
        col.update({_id: ObjectID(fields[0][1])}, {
            $pushAll: {  pictures: files  }
          }, function(err, result) {
                if (err) {
                  console.log(err.message);
                  return;
                }
                else
                  res.redirect('/background/albums/' + fields[0][1]);
            });
      });
    });
});
/**
**  修改相册封面和照片简介
**/
router.post('/albums/modifyAlbumInfo/:name', function(req, res) {
  var db = req.db;
  var i = 1;
  var ObjectID = require('mongodb').ObjectID;
  var hiddenAlbum_Id = req.param('hiddenAlbum_Id');
  var hiddenAlbumCoverSrc  = req.param('hiddenAlbumCoverSrc');
  var hiddenPictureNames = req.param('hiddenPictureNames').split("***");
  var hiddenPictureIntroductions = req.param('hiddenPictureIntroductions').split("***");
  var callback = function(err, result) {
      if (err) {
          console.log(err.message);
          return;
      }
    };
  db.collection('albums', function(err, col) {
    for (i = 1; i < hiddenPictureNames.length; ++i) {
        col.update({ $and: [{_id: ObjectID(hiddenAlbum_Id)}, {'pictures.name': hiddenPictureNames[i]}] }, {
            $set: {
                'pictures.$.instruction' : hiddenPictureIntroductions[i]
             }
          }, callback);
      }
        col.update({_id: ObjectID(hiddenAlbum_Id)}, {$set: {'cover' : hiddenAlbumCoverSrc}}, function(err, result) {
          if (err) {
            console.log(err.message);
            return;
          }
        });
    res.redirect('/background/albums/' + hiddenAlbum_Id);
  });
});
/**
**  修改相册名称
**/ 
router.post('/modifyAlbumInfo', function(req, res) {
  var db = req.db;
  var i = 1;
  var ObjectID = require('mongodb').ObjectID;
  var hiddenAlbumIds = req.param('hiddenAlbumIds').split("***");
  var hiddenAlbumNames  = req.param('hiddenAlbumNames').split("***");
  var callback = function(err, result) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log(result);
  };

  db.collection('albums', function(err, col) {
      for (i = 1; i < hiddenAlbumIds.length; ++i) {
        col.update({_id: ObjectID(hiddenAlbumIds[i])}, {
            $set: {
                name : hiddenAlbumNames[i]
             }
          }, callback);
      }
  });
  res.redirect('/background/albums');
});

module.exports = router;
