exports.insert = function(db, callback){
  db.collection('albums', function(err, albums){
    if (err){
      throw new Error('获取albums失败！');
    }

    db.collection('users', function(err, users){
      if (err){
        throw new Error('获取users失败！');
      }
      var pictureIds = [];
      
      for (var i = 1; i <= 10; i++) {
        pictureIds.push({
          index: '/images/post1_' + i + '.jpg',
          src: '/images/post1_' + i + '.jpg',
          headline: '\u56fe\u7247' + i,
          introduction: "有什么好介绍的吗？没有有什么好介绍的吗？没有有什么好介绍的吗？没有有什么好介绍的吗？没有有什么好介绍的吗？没有"
        });
      }

      users.findOne(function(err, doc){
        if (err){
          throw new Error('尚未创建用户');
        }

        albums.insert([
          {
            name: 'album_1',
            createdAt: new Date(),
            cover: '/images/post1_1.jpg',
            pictures: pictureIds
          },

          {
            name: 'album_2',
            createdAt: new Date(),
            cover: '/images/post1_2.jpg',
            pictures: pictureIds.slice(0, 5)
          },

          {
            name: 'album_3',
            createdAt: new Date(),
            cover: '/images/post1_6.jpg',
            pictures: pictureIds.slice(5)
          },

          {
            name: 'album_4',
            createdAt: new Date(),
            cover: '/images/post1_2.jpg',
            pictures: pictureIds.slice(2,3)
          },

          {
            name: 'album_5',
            createdAt: new Date(),
            cover: '/images/post1_6.jpg',
            pictures: pictureIds.slice(2,4)
          }

        ], function(err, result){
          if (err){
            throw new Error('向albums插入数据失败！');
          }
          console.log('插入albums成功！');
          if (callback){
            callback();
          }
        });
      });
    });
  });
};
