(function(){
	function	isEverythingFilled() {
		var input = $("[value='']");
		for (var i = 0; i < input.length; i++) {
			if (input.val() === '') {
				return false;
			}
		}
		return true;
	}

	$("#volunteer-application").submit(function(e) {
		if (!isEverythingFilled()) {
			e.preventDefault();
			alert("表格未填写完!");
		}
	});

})();