exports.insert = function(db, callback){
  db.collection('activity', function(err, col){
    if (err){
      throw new Error('获取activity失败！');
    }
    col.insert([
      {
        headline: '雷锋预告',
        dest_time: new Date(2014, 3, 10),
        create_time: new Date(2014, 2, 11),
        logo: '珠海口岸广场“重温雷锋精神，传递美好祝福”',
        author: '阿平 ',
        source: '点点公益',
        summary: '这是在逗我',
        destination: '目标是逗你',
        contents: '期西方文明的伟大人物',
        host: '阿里巴巴',
        guest: '腾讯',
        help: '百度'
      },

      {
        headline :'快乐游园',
        dest_time: new Date(2014, 4, 2),
        create_time: new Date(2014, 3, 2),
        logo: '珠海口岸广场“重温雷锋精神，传递美好祝福”',
        author: '阿平 ',
        source: '点点公益',
        summary: '这是在逗我',
        destination: '目标是逗你',
        contents: '期西方文明的伟大人物',
        host: '阿里巴巴',
        guest: '百度',
        help: '腾讯'
      },

      {
        headline: '公益课堂',
        dest_time: new Date(2014, 1, 2),
        create_time: new Date(2014, 0, 2),
        logo: '珠海口岸广场“重温雷锋精神，传递美好祝福”',
        author: '阿平 ',
        source: '点点公益',
        summary: '这是在逗我',
        destination: '目标是逗你',
        contents: '期西方文明的伟大人物',
        host: '百度',
        guest: '腾讯',
        help: '阿里巴巴'
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