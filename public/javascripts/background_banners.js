(function() {
	if (location.pathname == '/background/banners') {
			$('.delete').click(function(event) {
				$('.hiddenBanner').attr('value', $(event.target).parent().children('img').attr('src'));
			});

			$('deletebanner .yes').click(function() {
				$.ajax({
					url: "/background/deleteBanner",
					method: 'post',
					data: {hiddenBanner: $('.hiddenBanner').attr('value')},
					success: function(data) {
						location.reload();
					}
				});
			});
			// 显示可链接到的文章
			$('#background_banners img').click(function(event) {
				$('.hiddenBanner').attr('value', $(event.target).attr('src')); //后面添加链接的时候需要用到
				$('#addLink').modal();
				$.ajax({
					url: "/background/addLink",
					method: 'post',
					success: function(data) {
						$('#addLink').find('label').remove();
						for (var i = 0; i < data[0].length; ++i) {
							$('.foreshowUL').append("<label><input data-group='foreshowUL' data-id='"+data[0][i]._id + "' name='forBanner' type='radio'/>"+data[0][i].headline+"</label> ");
						}
						for (var j = 0; j < data[1].length; ++j ) {
							$('.postsUL').append("<label><input data-group='postsUL' data-id='"+data[1][j]._id + "' name='forBanner' type='radio'/>"+data[1][j].title+"</label> ");
						}
						$('.foreshowUL').find('input').eq(0).attr('checked', 'checked');
					}
				});
			});

			$('#addLink .yes').click(function() {
				$('#addLink .close').click();
				if ($('#addLink label').length !== 0) 
					$.ajax({
						url: "/background/modifyLink",
						method: 'post',
						data: {
							src: $('.hiddenBanner').attr('value'),
							id: $('#addLink input:checked').attr('data-id'),
							type: $('#addLink input:checked').attr('data-group'),
						},
						success: function(data) {
						}
					});
			});
	}
})();