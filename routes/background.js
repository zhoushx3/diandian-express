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
	fs.readdir(DOCS_PATH, function(err, files){
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
        annualFiles: annualFiles
  		});
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
   res.redirect('finances');
});

// delete file post router
router.post('/finances_deleteFiles', function(req, res){
	// request body fileName
	fs.unlink(DOCS_PATH + req.body.fileName, function(){
		console.log("Delete " + DOCS_PATH + req.body.fileName + "  !");
	});

	res.redirect('finances');
});

// view file post router
router.post('/finances_ViewFiles', function(req, res){
	fs.readFile(DOCS_PATH + req.body.fileName,
		{
			encoding: "UTF-8"
		},
		function(errr, data){
		res.send({
			content: data});
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
	res.render('background/news', {
		title:'news'
	});
});

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



/**
** 分享交流基本页面
** 获得查询到的所有条目的总数，进而确定分期数目，每期5个，最新一期可少于5个
** show==0表示所有的内容都不展开
**/
router.get('/shares', function(req, res) {
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
        show: 0
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
    col.find({period: serial_number.toString()},{'limit': 5}).toArray(function(err, docs) {
      if (err) {
        console.log(err.message);
      }
      else {
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
  db.collection('share').findAndModify(
  {_id: id}, // query
  [['_id','asc']],  // sort order
  {
      summary: summary,
      contents: contents
   }, // replacement, replaces only the field "hi"
  {}, // options
  function(err, object) {
      if (err){
          console.warn(err.message);  // returns error if no matching object found
      }else{
          console.log(object);
          callback();
      }
  });
  var callback = function() {
    res.redirect('/background/shares');
  };
});

module.exports = router;
