exports.insert = function(db, callback) {
	db.collection('annual', function(err, annual) {
	    if (err) {
	      throw new Error('获取annual失败！');
	    }
	    var items = [];
    	items.push({
    		src:"/images/2012.png"
    	});
    	items.push({
    		src:"/images/2013.png"
    	});
    	items.push({
    		src:"/images/2014.png"
    	});
	    annual.insert(items, function(err, result) {
	    	if (err) {
	        throw new Error('向annual插入数据失败！');
	      	}
	      console.log('插入annual成功！');
	      if (callback) {
	        callback();
	      }
	    });
	});
};
