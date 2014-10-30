(function() {
	if (location.pathname == '/background/foreshows') {
		var dest_id;
		$('button.foreshow-end-date-edit').click(function() {
			var year = $(this).prev().find('input').eq(0).val();
			var month = $(this).prev().find('input').eq(1).val();
			var day = $(this).prev().find('input').eq(2).val();
			dest_id= $(this).parent().parent().find('.hide').attr('value');
			$.ajax({
				type: 'get',
				url: '/background/modifyDestTime',
				data: 
				{
					id: dest_id,
					year: year,
					month: month,
					day: day
				},
				success: function(data) {}
			});
		});
		// 删除前先设置id
		$('.foreshow-href a.delete').click(function() {
			dest_id = $(this).parent().parent().find('.hide').attr('value');
		});
		// 删除活动预告
		$('button.deleteForeshow.btn').click(function(){
			$.ajax({
				type: 'post',
				url: '/background/deleteForeshow',
				data: {id : dest_id},
				success: function(data) {
					location.href = '/background/foreshows';
				}
			});
		});
	}
})();