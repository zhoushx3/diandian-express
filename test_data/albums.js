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

      //db.collection('AlbumsPictures', function(err, AlbumsPictures){
        //if (err){
          //throw new Error('获取Albumspictures失败！');
        //}
        //for (var i = 1; i <= 10; i++) {
          //pictureIds.push(AlbumsPictures.insert({
            //src: '/images/post1_' + i + '.jpg',
            //name: '图片' + i,
            //votes: [],
            //commentCount: 0
          //}, function(err, result){
            //if (err){
              //throw new Error('向AlbumsPictures插入数据失败！');
            //}
            //if (callback){
              //callback();
            //}
          //}));
        //}
      //});
      
      for (var i = 1; i <= 10; i++) {
        pictureIds.push({
          src: '/images/post1_' + i + '.jpg',
          name: '\u56fe\u7247' + i,
          votes: [],
          photo_date: "2014-" + i + "-" + (i +10),
          instruction: "有什么好介绍的吗？没有有什么好介绍的吗？没有有什么好介绍的吗？没有有什么好介绍的吗？没有有什么好介绍的吗？没有"
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
            createdBy: doc._id,
            cover: '/images/post1_1.jpg',
            pictures: pictureIds
          },

          {
            name: 'album_2',
            createdAt: new Date(),
            createdBy: doc._id,
            cover: '/images/post1_2.jpg',
            pictures: pictureIds.slice(0, 5)
          },

          {
            name: 'album_3',
            createdAt: new Date(),
            createdBy: doc._id,
            cover: '/images/post1_6.jpg',
            pictures: pictureIds.slice(5)
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
