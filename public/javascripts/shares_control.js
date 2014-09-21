(function() {
	if (location.pathname == '/background/shares' || location.pathname == "/background/share_period") {
		$('#share_add').click(function() {
			$('#add_choose').addClass('active');
		});
		$('#cancel_new_period').click(function() {
			$('#add_choose').removeClass('active');	
		});
		$('#add').click(function() {
			$('#add_more').addClass('active');
		});
		$('#add_cancel').click(function() {
			$('#add_more').removeClass('active');
		});
	}
})();