(function() {
	if (location.pathname == '/background/shares' || location.pathname.indexOf( "/background/share_period") > -1) {
		$('#share_add').click(function() {
			$('#add_choose').addClass('active');
		});
		$('#cancel_new_period').click(function() {
			$('#add_choose').removeClass('active');	
		});

	 $('#submit_new_period').click(function() {
	 	$('.uploadInfo').attr('value', '');
	 	for (var i = 0; i < 5; ++i) {
	 		if ($('.uploadFiles').eq(i).val() === "")
	 			$('.uploadInfo').attr('value', $('.uploadInfo').attr('value') + " ***");
	 		else
	 			$('.uploadInfo').attr('value', $('.uploadInfo').attr('value') + $('.uploadFiles').eq(i).val() + "***");
	 	}
	 });
	}
})();