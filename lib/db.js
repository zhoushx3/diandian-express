var connection;

exports.getConnection = function(callback){
  if (connection)
    callback(connection);
  else {
    var MongoClient = require('mongodb').MongoClient;
    var config = require('../config/config').database;
    var uri = 'mongodb://' + config.host + ':' + config.port + '/' + config.name;

    MongoClient.connect(uri, function(err, db) {
      if(err){
        throw new Error('连接数据库失败！');
      }
      callback(db);
    });
  }
};

//清空数据库
exports.clear = function(callback){
  exports.getConnection(function(db){
    db.dropDatabase(function(err, result){
      if (err){
        throw new Error('清空数据库失败！');
      }
      if (callback)
        callback();
    });
  });
};

//插入即使是生产模式下也需要的数据
exports.initialize = function(callback){
  exports.getConnection(function(db){

    //插入超级管理员帐号
    db.collection('users', function(err, col){
      if (err){
        throw new Error('获取users collection失败！');
      }

      col.insert({
        username: 'admin',
        email: {address: 'test@test.com', verified: true},
        createdAt: Date.now,
        source: 'register',
        role: 'admin',
        password: {
          indetity: '',
          salt: ''
        }
      }, function(err){
        if (err){
          throw new Error('向users插入数据失败');
        }

        if (callback){
          callback();
        }
      });
    
    });
  });
};