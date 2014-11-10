var express = require('express');
var router = express.Router();
var page = 1;
/* GET news page. */
router.get('/', function(req, res) {
  var db = req.db;
  if (req.query.page !== undefined)
    page = req.query.page;
  var albums, posts, donations, pictures;
  var counter = 0;
  var record_num = 0;
  var callback = function() {
    counter++;
    if (counter == 5) {
      res.render('news/news', {
        title: '最新动态',
        showDonationScroller: true,
        albums: albums,
        posts: posts,
        donations: donations,
        pictures: pictures,
        record_num: record_num,
        page: page,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    }
  };

  db.collection('albums', function(err, col) {
    col.find().toArray(function(err, docs) {
      albums = docs;
      callback();
    });
  });

  db.collection('pictures', function(err, col) {
    col.find().toArray(function(err, docs) {
      pictures = docs;
      callback();
    });
  });

  db.collection('donations', function(err, col) {
    col.find({}, {
      sort: {
        date: -1
      },
      limit: 15
    }).toArray(function(err, docs) {
      donations = docs;
      callback();
    });
  });

  db.collection('posts', function(err, col) {
    col.find(function(err, cursor) {
      cursor.count(function(err, count) {
        record_num = count;
        callback();
      });
    });
  });
  db.collection('posts', function(err, col) {
    col.find({}, {
            sort: {
              createdAt: -1
            },
            limit: 4,
            skip: (page-1)*4,
          }).toArray(function(err, docs) {
            posts = docs;
            callback();
          });
  });
});

/* GET news child page. */
router.get('/posts/:id', function(req, res) {
  var db = req.db;
  var posts;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('posts', function(err, col) {
    col.findOne({
      _id: ObjectID(req.params.id)
    }, function(err, item) {
        res.render('news/postPage', {
          title: item.title,
          post: item,
          user: req.session.user,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        });
      });
  });
});

router.get('/album/:name', function(req, res) {
  var db = req.db;
  db.collection('albums', function(err, col) {
    col.findOne({
      name: req.params.name
    }, function(err, item) {
      res.render('news/album_details', {
        title: req.params.name,
        album: item
      });
    });
  });
});

router.get('/activity', function(req, res) {
  var db = req.db;
  var activity;
  var date = new Date();
  db.collection('activity', function(err, col) {
    col.find({'dest_time': {$gt: date}}).toArray(function(err, docs) {
      activity = docs;
      callback();
    });
  });
  var callback = function() {
    res.render('news/activity', {
      title: 'activity',
      items: activity,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  };
});

// 增加查看次数,成功了但是返回error
router.get('/addViewCount', function(req, res) {
  var db = req.db;
  var id = req.query.id;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('posts', function(err, cols) {
    cols.update({_id: ObjectID(id)}, {$inc: {'viewCount': 1}}, function(err, result) {
      res.send("success");
    });
  });
});

// 增加活动预告查看次数,成功了但是返回error
router.get('/addActivityViewCount', function(req, res) {
  var db = req.db;
  var id = req.query.id;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('activity', function(err, cols) {
    cols.update({_id: ObjectID(id)}, {$inc: {'viewCount': 1}}, function(err, result) {
      res.send("success");
    });
  });
});


 
module.exports = router;