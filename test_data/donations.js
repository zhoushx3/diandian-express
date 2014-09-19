exports.insert = function(db, callback){
  db.collection('donations', function(err, donations){
    if (err){
      throw new Error('获取donations失败！');
    }

    var years = [2012, 2013, 2014],
        donators = ['马小姐', '李小姐', '肖女士(合家)', '戴先生'],
        goods = ['衣物5件', '1个书包', '一个iPad'],
        notes = ['资助贫困外来工学生', '资助贫困学生', '资助贫困外来工子女学生学费', '资助一名贫困大学生'];
    var _ = require('underscore');
    var datas = [];
    for (var i = 0; i < 500; i++) {
      type = _.random(0, 3);
      switch (type) {
        case 0:
          datas.push({
            type: 0,
            donator: _.sample(donators),
            amount: _.random(100, 5000),
            date: new Date(_.sample(years), _.random(0, 12), _.random(1, 28)),
          });
          break;

        case 1:
          datas.push({
            type: 1,
            donator: _.sample(donators),
            amount: _.random(100, 5000),
            date: new Date(_.sample(years), _.random(0, 12), _.random(1, 28)),
            note: _.sample(notes)
          });
          break;

        case 2:
          datas.push({
            type: 2,
            donator: _.sample(donators),
            goods: _.sample(goods),
            date: new Date(_.sample(years), _.random(0, 12), _.random(1, 28)),
            note: _.sample(notes)
          });
          break;
      }
    }

    donations.insert(datas, function(err, result){
      if (err){
        throw new Error('向donations插入数据失败！');
      }
      console.log('插入donations成功！');
      if (callback){
        callback();
      }
    });
  });
};