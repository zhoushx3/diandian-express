var express = require('express');
var router = express.Router();

/* GET join-us page. */
router.get('/join-us', function(req, res) {
  var db = req.db;
  var carousels, posts, donations;
  var counter = 0;
  var callback = function(){
    counter++;
    if (counter == 3){
      res.render('volunteer/join-us/join-us', {
        title: 'join-us',
        showDonationScroller: true,
        carousels: carousels,
        posts: posts,
        donations: donations
      });
    }
  };

  db.collection('carousels', function(err, col){
    col.find().toArray(function(err, docs){
      carousels = docs;
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

router.get('/apply', function(req, res) {
  var db = req.db;
  var carousels, posts, donations;
  var counter = 0;
  var callback = function(){
    counter++;
    if (counter == 3){
      res.render('volunteer/join-us/apply', {
        title: 'apply',
        showDonationScroller: true,
        carousels: carousels,
        posts: posts,
        donations: donations
      });
    }
  };

  db.collection('carousels', function(err, col){
    col.find().toArray(function(err, docs){
      carousels = docs;
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

router.get('/share', function(req, res) {
  var db = req.db;
  var share, number;

    db.collection('share', function(err, col) {
    col.find({}, {
      'limit': 5, 
      'skip': 2
    }).toArray(function(err, docs){
      share = docs;
      callback();
    });
  });

    var callback = function() {
    res.render('volunteer/share/shares', {
     title: '分享',
     share: share,
     // number = number,
   });
  };
});

router.get('/shareList', function(req, res) {
  var db = req.db; 
  var share, number;
  db.collection('share', function(err, col) {
    col.find({}).toArray(function(err, docs) {
      share = docs;
      callback();
    });
  });
  var callback = function() {
    res.render('volunteer/share/shareList', {
      title: '分享列表',
      share: share,
    });
  };
});

router.get('/:id', function(req,res) {
  var db = req.db;
  var share_item;

  var ObjectID = require('mongodb').ObjectID;
  db.collection('share', function(err, col) {
      col.findOne({_id: ObjectID(req.params.id)}, function(err, item) {
          res.render('volunteer/share/shareDetail', {
            share_item: item,
          });
      });
  });
});

module.exports = router;
