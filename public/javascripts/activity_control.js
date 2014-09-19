(function() {
	if (location.pathname == '/news/activity') {
		$('li').click(function( event ) {
			$('li').removeClass('active');
			$(this).addClass('active');
		});
	}
})();