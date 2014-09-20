var querystring = require('querystring');
var express = require('express'),
      router = express.Router(),
      formidable = require('formidable'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      DOCS_PATH = 'docs/',
      MAXFILESZIZE = 4 * 1024 * 1024;

/* GET About page. */
router.get('/', function(req, res) {
  res.render('background_layout', {
    title: 'background'
  });
});

router.get('/finances', function(req, res) {
  res.render('background/finances', {
    title: 'finances'
  });
});

router.post('/finances', function(req, res) {
	// using formidable
	var form = new formidable.IncomingForm();
	form.uploadDir = DOCS_PATH;  // set upload dir
   form.keepExtensions = true;  // 保留后缀
   form.maxFieldSize =  MAXFILESZIZE;  // file size
   //var fileName = 
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
   	fs.renameSync(files.add.path,newPath);
    });
   res.render('background/finances', {
  		title: 'finances'
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

router.get('/volunteers_apply', function(req, res) {
  res.render('background/volunteers_apply', {
    title: 'volunteers_apply '
  });
});

router.get('/banners', function(req, res) {
  res.render('background/banners', {
    title: 'banners'
  });
});

router.get('/accounts', function(req, res) {
  res.render('background/accounts', {
    title: 'accounts'
  });
});

router.get('/passwords', function(req, res) {
  res.render('background/passwords', {
    title: 'passwords'
  });
});

router.get('/donations', function(req, res) {
  res.render('background/donations', {
    title: 'donations'
  });
});


module.exports = router;
