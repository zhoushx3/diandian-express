exports.insert = function(db, callback){
  db.collection('users', function(err, col){
    if (err){
      throw new Error('获取users失败！');
    }
    col.insert({
      username: '我是测试君',
      email: {address: 'test@test.com', verified: true},
      createdAt: Date.now,
      source: 'register',
      role: 'user',
      profile: {
        nickname: 'Test',
        gender: 'male',
        birthday: '1990-06-12',
        job: '学生',
        phone: '13800000000',
        QQ: '10010',
        weibo: 'http://weibo.com/test',
        photo: '/images/photo/default.jpg',
        about: '得即高歌失即休，多愁多恨亦悠悠。',
        isPublic: {
          birthday: true,
          job: true,
          phone: true,
          QQ: true,
          weibo: true
        }
      },
      password: {
        identity: '',
        salt: ''
      }
    }, function(err, result){
      if (err){
        throw new Error('向users插入数据失败');
      }
      console.log('插入users成功！');
      if (callback){
        callback();
      }
    });
    
  });
};