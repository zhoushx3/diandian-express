exports.insert = function(db, callback) {
	db.collection('cost', function(err, cost) {
	    if (err) {
	      throw new Error('获取cost失败！');
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
	    cost.insert(items, function(err, result) {
	    	if (err) {
	        throw new Error('向cost插入数据失败！');
	      	}
	      console.log('插入cost成功！');
	      if (callback) {
	        callback();
	      }
	    });
	});
};
