(function() {
	if (location.pathname == '/background/banners') {
			$('.delete').click(function(event) {
				$('.hiddenBanner').attr('value', $(event.target).parent().children('img').attr('src'));
			});

			$('.yes').click(function() {
				$.ajax({
					url: "/background/deleteBanner",
					method: 'post',
					data: {hiddenBanner: $('.hiddenBanner').attr('value')},
					success: function(data) {
						location.reload();
					}
				});
			});
	}
})();