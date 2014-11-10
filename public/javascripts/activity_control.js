(function() {
	if (location.pathname == '/news/activity') {
		$('#activity_content #contents').css('display', 'none');
		$('#activity_content #contents').eq(0).css('display', 'block');
		$('li.foreshow').eq(0).addClass('active');

		$('li').click(function( event ) {
			$('li').removeClass('active');
			$(this).addClass('active');
			$('#activity_content #contents').css('display', 'none');
			$('#activity_content #contents').eq($(this).index()/2).css('display', 'block');
		});
	}
})();