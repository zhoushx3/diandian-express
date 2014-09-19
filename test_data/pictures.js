exports.insert = function(db, callback){
  db.collection('pictures', function(err, pictures){
    if (err){
      throw new Error('获取pictures失败！');
    }
    var tempPictures = [];
    db.collection('users', function(err, users){
      if (err){
        throw new Error('获取users失败！');
      }
      users.findOne(function(err, doc){
        if (err){
          throw new Error('尚未创建用户');
        }
        for (var i = 1; i <= 10; i++){
          tempPictures.push({
            createdAt: new Date(),
            createdBy: doc._id,
            src: '/images/post1_' + i + '.jpg',
            title: '图片' + i,
            note: '这是图片新闻' + i
          });
        }
        pictures.insert(tempPictures, function(err, result){
          if (err){
            throw new Error('向pictures插入数据失败！');
          }
          console.log('插入pictures成功！');
          if (callback) {
            callback();
          }
        });
      });
    });
  });
};
