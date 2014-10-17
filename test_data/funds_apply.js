exports.insert = function(db, callback){
  db.collection('fundsApply', function(err, col){
    if (err){
      throw new Error('fundsApply');
    }
    console.log("插入fundsApply成功");
    if (callback) {
      callback();
    }
  });
};