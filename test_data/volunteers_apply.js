exports.insert = function(db, callback){
  db.collection('volunteers_apply', function(err, col){
    if (err){
      throw new Error('volunteers_apply获取失败！');
    }
    console.log("New volunteers_apply collection!");
    if (callback) {
      callback();
    }
  });
};