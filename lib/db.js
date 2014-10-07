var connection;
var crypto = require('crypto');
var settings = require('../settings'),
  Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
  Server = require('mongodb').Server;

exports.getConnection = function(callback) {
  if (connection)
    callback(connection);
  else {
    var MongoClient = require('mongodb').MongoClient;
    var config = require('../config/config').database;
    var uri = 'mongodb://' + config.host + ':' + config.port + '/' + config.name;

    MongoClient.connect(uri, function(err, db) {
      if (err) {
        throw new Error('连接数据库失败！');
      }
      callback(db);
    });
  }
};

//清空数据库
exports.clear = function(callback) {
  exports.getConnection(function(db) {
    db.dropDatabase(function(err, result) {
      if (err) {
        throw new Error('清空数据库失败！');
      }
      if (callback)
        callback();
    });
  });
};

//插入即使是生产模式下也需要的数据
exports.initialize = function(callback) {
  var date = new Date(),
        month = date.getMonth() + 1;

  exports.getConnection(function(db) {

    //插入超级管理员帐号
    db.collection('users', function(err, col) {
      if (err) {
        throw new Error('获取users collection失败！');
      }
      var md5 = crypto.createHash('md5'),
     password = md5.update('admin').digest('hex');

      col.insert({
        "username": "admin",
        "email": "yeshenxue@qq.com",
        "password": password,
        "createdAt": date.getFullYear() + '-' + month + '-' + date.getDate(),
        "role": 'admin',
        "profile": {
          "nickname": "夜夜",
          "gender": "male",
          "birthday": "1993-08-22",
          "job": "学生",
          "phone": "13824474170",
          "QQ": "479791014",
          "weibo": "yeshenxue",
          "photo": '/images/photo/default.jpg',
          "about": "YOOOOOOOO"
        }
      }, function(err) {
        if (err) {
          throw new Error('向users插入数据失败');
        }

        if (callback) {
          callback();
        }
      });

    });
  });
};

exports.createDB = function(callback) {
  return new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT), {
    safe: true
  });
};