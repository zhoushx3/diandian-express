exports.insert = function(db, callback) {
  db.collection('fundLabels', function(err, col){
    var label = [];
    label.push({
    	'label': [],
    });
    col.insert(label, function(err, result) {
	    if (err) {
	      throw new Error('fundLabels');
	    }
	    console.log("插入fundLabels成功");
	    if (callback) {
	      callback();
	    }
    });
  });
};