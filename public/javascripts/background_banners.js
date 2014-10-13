(function() {
	if (location.pathname == '/background/banners') {
		$('.delete').click(function(event) {
			$('#delete_banner').toggleClass('active');
			
			$('.yes').click(function() {
				$('.hiddenBanner').attr('value', $(event.target).parent().children('img').attr('src'));
			});

			$('.no').click(function() {
				$('#delete_banner').toggleClass('active');
			});
		});

	}
})();