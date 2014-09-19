exports.insert = function(db, callback) {
	db.collection('cost', function(err, costs) {
	    if (err) {
	      throw new Error('获取costs失败！');
	    }
	    var cost = [];
	    for (var y = 2012; y < 2015; ++y)
		    for (var i = 0; i < 3; ++i)
		    	cost.push({
		    		year: y,
		    		month: i,
		    		src:"/images/banners/" + y +  i + ".jpg"
		    	});
	    costs.insert(cost, function(err, result) {
	    	if (err) {
	        throw new Error('向costs插入数据失败！');
	      	}
	      console.log('插入costs成功！');
	      if (callback) {
	        callback();
	      }
	    });
	});
};
