exports.insert = function(db, callback) {
	db.collection('money', function(err, money) {
	    if (err) {
	      throw new Error('获取money失败！');
	    }
	    var items = [];
    	items.push({
    		src:"/images/2012_12.jpg"
    	});
    	items.push({
    		src:"/images/2013_12.jpg"
    	});
    	items.push({
    		src:"/images/2014_12.jpg"
    	});
	    money.insert(items, function(err, result) {
	    	if (err) {
	        throw new Error('向money插入数据失败！');
	      	}
	      console.log('插入money成功！');
	      if (callback) {
	        callback();
	      }
	    });
	});
};
