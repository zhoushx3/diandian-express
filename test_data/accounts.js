exports.insert = function(db, callback) {
  db.collection('users', function(err, col) {
    if (err) {
      throw new Error('获取users失败！');
    }
    col.insert({
      "username": "testUser",
      "email": "test@test.com",
      "password": "testtesttest",
      "createdAt": "1999-09-09",
      "role": 'user',
      "profile": {
        "nickname": "nickname",
        "gender": "male",
        "birthday": "1993-08-22",
        "job": "学生",
        "phone": "8008208820",
        "QQ": "479791014",
        "weibo": "testWeibo",
        "photo": '/images/photo/default.jpg',
        "about": "我是大傻逼"
      }
    }, function(err, result) {
      if (err) {
        throw new Error('向users插入数据失败');
      }
      console.log('插入users成功！');
      if (callback) {
        callback();
      }
    });

  });
};