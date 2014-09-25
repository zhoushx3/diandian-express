(function() {
	if (location.pathname.indexOf('/news/album/') > -1) {
		$('.select_img').click(function() {
			$(this).parent().next().addClass('active');
		});

		$('.off').click(function() {
			$(this).parent().removeClass('active');
		});

		$('.left').click(function() {
			$(this).parent().removeClass('active').prev().prev().addClass('active');
		});

		$('.right').click(function() {
			$(this).parent().removeClass('active').next().next().addClass('active');
		});
	}
})();