exports.insert = function(db, callback){
  db.collection('activity', function(err, col){
    if (err){
      throw new Error('获取activity失败！');
    }
    col.insert([
      {
        headline: '雷锋预告',
        dest_time: new Date(2015, 11, 10),
        create_time: new Date(2014, 2, 11),
        author: '阿平 ',
        source: '点点公益',
        contents: '期西方文明的伟大人物',
        viewCount: 1
      },

      {
        headline :'快乐游园',
        dest_time: new Date(2015, 4, 2),
        create_time: new Date(2014, 3, 2),
        author: '阿平 ',
        source: '点点公益',
        contents: '期西方文明的伟大人物',
        viewCount: 0
      },

      {
        headline: '公益课堂',
        dest_time: new Date(2015, 1, 2),
        create_time: new Date(2014, 0, 2),
        author: '阿平 ',
        source: '点点公益',
        contents: '期西方文明的伟大人物',
        viewCount: 0
      }
    ], function(err, result){
      if (err){
        throw new Error('向acticity插入数据失败');
      }
      console.log('插入activity成功！');
      if (callback){
        callback();
      }
    });
    
  });
};