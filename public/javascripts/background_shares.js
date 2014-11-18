(function() {
	if (location.pathname == '/background/shares') {
		$('#add_period form').submit(function(e) {
			for (var i = 0; i < 5; ++i) {
				if ($('input[type="file"]').eq(i).val() === "") {
					$('#add_period form h4').css("color", "red");
					e.preventDefault();
				}
			}
		});
	}
})();