var express = require('express');
var router = express.Router();

/* GET news page. */
router.get('/', function(req, res) {
  var db = req.db;

  var albums, posts, donations, pictures;
  var counter = 0;
  var callback = function(){
    counter++;
    if (counter == 4){
      res.render('news/news', {
        title: '最新动态',
        showDonationScroller: true,
        albums: albums,
        posts: posts,
        donations: donations,
        pictures: pictures
      });
    }
  };

  db.collection('albums', function(err, col){
    col.find().toArray(function(err, docs){
      albums = docs;
      callback();
    });
  });

  db.collection('pictures', function(err, col){
    col.find().toArray(function(err, docs){
      pictures  = docs;
      callback();
    });
  });

  db.collection('donations', function(err, col){
    col.find({}, {
      sort: {
        date: -1
      },
      limit: 15
    }).toArray(function(err, docs){
      donations = docs;
      callback();
    });
  });

  db.collection('posts', function(err, col){
    col.find({}, {
      sort: {
        createdAt: -1
      },
      limit: 3,
      fields: {
        content: 0
      }
    }).toArray(function(err, docs){
      posts = docs;
      callback();
    });
  });

});

/* GET news child page. */
router.get('/posts/:id', function(req, res){
  var db = req.db;
  var posts;
  var ObjectID = require('mongodb').ObjectID;
  db.collection('posts', function(err, col){
    db.collection('users', function(err, users){
      col.findOne({_id: ObjectID(req.params.id)}, function(err, item){
        users.findOne({_id: ObjectID(item.createdBy)}, function(err, user){
          res.render('news/postPage', {
            title: item.title,
            post: item,
            author: user.username
          });
        });
      });
    });
  });
});

router.get('/album/:name', function(req, res) {
  var db = req.db;
  db.collection('albums', function(err, col) {
    col.findOne({name: req.params.name}, function(err, item) {
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

  db.collection('activity', function(err, col){
    col.find({}).toArray(function(err, docs){
      activity  = docs;
      callback();
    });
  });
  var callback = function() {
    res.render('news/activity', {
      title: 'activity',
      items: activity
    });
  };
});

module.exports = router;
