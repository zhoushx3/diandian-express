(function() {
	if (location.pathname.indexOf('/news/album/') > -1) {
		// slide_pictures_with_modal
		var index;
		$('.select_img').click(function() {
			index = parseInt($(this).attr('data-count'));
			$('#show_picture h3').text($(this).attr('alt'));
			$('#show_picture p').text($(this).next().next().text());
			$('#show_picture .img').css('background', 'url('+$(this).attr('src')+') no-repeat 80%');
		});
		
		$('.left').click(function() {
			if (index !== 1) {
				index = parseInt(index) - 1;
				$('#show_picture h3').text($('.select_img[data-count='+index+']').attr('alt'));
				$('#show_picture p').text($($('.select_img[data-count='+index+']')).next().next().text());
				$('#show_picture .img').css('background', 'url('+$('.select_img[data-count='+index+']').attr('src')+') no-repeat 80%');
			}
		});

		$('.right').click(function() {
			if (index !== $('.select_img').length) {
				index = parseInt(index)+1;
				$('#show_picture h3').text($('.select_img[data-count='+index+']').attr('alt'));
				$('#show_picture p').text($($('.select_img[data-count='+index+']')).next().next().text());
				$('#show_picture .img').css('background', 'url('+$('.select_img[data-count='+index+']').attr('src')+') no-repeat 80%');
			}
		});
	}
})();