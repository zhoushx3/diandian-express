exports.insert = function(db, callback){
  db.collection('carousels', function(err, carousels){
    if (err){
      throw new Error('获取carousels失败！');
    }

    carousels.insert([
      {
        src: '/images/banners/1.jpg',
        link: '/'
      },

      {
        src: '/images/banners/2.jpg',
        link: '/'
      },

      {
        src: '/images/banners/3.jpg',
        link: '/'
      }
    ], function(err, result){
      if (err){
        throw new Error('向carousels插入数据失败！');
      }
      console.log('插入carousels成功！');
      if (callback){
        callback();
      }
    });
  });
};