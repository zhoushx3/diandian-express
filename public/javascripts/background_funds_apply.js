(function() {    
	if (location.pathname === "/background/funds_apply") {
		var fundsID;
		$(document).delegate('a.view_fund_apply', 'click', function() {
			fundsID = $(this).attr('name');
			$.ajax({
				type: 'post',
				url: '/background/getFundInfo',
				data: {fundsID: fundsID},
				success: function(data) {
					if (data) {
						var count = 0;
						for (var i in data) {
							if (count !== 20)
								$('#fund .modal-body span').eq(count++).text(data[i]);
						}
						$('#labels').children().remove();
						$('.labelList').val('');
						for (var j = 0; j < data.label.length; ++j) {
							$('#labels').append('<button class="label btn">' + data.label[j] + '</button>');
						}
					} else {
						window.alert('retrieve failed');
					}
				}
			});
		});

		// 增标签
		$('input.edit').click(function() {
			var labels = $(this).prev().val().split(' ');
			var label = [];
			for (var k = 0; k < labels.length; ++k) {
				if (labels[k] !== '')
					label.push(labels[k]);
			}
			if (label.length !== 0)
				$.ajax({
					type: 'post',
					url: '/background/modifyLabels',
					data: {label: label, fundsID: fundsID},
					success: function(data) {
						location.reload();
					},
				});
			else
				location.reload();
		});

		// 删标签
		$(document).delegate('button.label.btn', 'click', function() {
			var theLabel = $(this).text();
			$(this).remove();
			window.alert(theLabel);
			$.ajax({
				type: 'post',
				url: '/background/deleteLable',
				data: {fundsID: fundsID, theLabel: theLabel},
				success: function(data) {
					console.log(data);
				}
			});
		});
		// 标记通过	
		$('a.pass_uncheckedFund_apply').click(function(event) {
			$('a.fund_pass_confirm_button').click(function() {
				var fundsID = $(event.target).attr('name');
				console.log(fundsID);
				$.ajax({
					type: 'get',
					url: '/background/passFund',
					data: {fundsID: fundsID, type: 'Pass'},
					success: function(data) {
						console.log(data);		
						location.reload();
					}
				});
			});
		});
		// 标记不通过
		$('a.dispass_Fund_apply').click(function(event) {
			$('a.fund_delete_confirm_button').click(function() {
				var fundsID = $(event.target).attr('name');
				console.log(fundsID);
				$.ajax({
					type: 'get',
					url: '/background/passFund',
					data: {fundsID: fundsID, type: 'unPass'},
					success: function(data) {
						console.log(data);		
						location.reload();
					}
				});
			});
		});

		$('select').change(function(event) {
			callback(event);
		});

		var callback = function(event) {
			$('#funds_byLables').children('a').remove();
			var label = $(event.target).children('option:selected').val();
			$.ajax({
				type: 'get',
				url: '/background/getFundsByLabel',
				data: {theLabel: label},
				success: function(data) {
					if (data) {
						$('#funds_byLables').children().remove();
						for (var i  = 0; i < data.length; ++i)
							$("<a class='view_fund_apply', role='button', data-toggle='modal', href='#fund'>"  + data[i].name +  '</a>').appendTo('#funds_byLables').attr('name', data[i]._id);
					}
				}
			});
		};
	}
// $(a).click(function() {
// 	$(b).click(function() {
// 		.....因为两次点击a(而且是不一样的a),之后再点击b，b响应了2次，而且用到a的event.target也不一样的;
//			.....是不是事件会累计绑定
// 	});
// });
})();

