(function() {
	if (location.pathname == '/background/donations') {
		// 将输入框的值通过ajax传给服务器
		$('.send').click(function() {
				var texts = [];
				var $input = $(this).parent().parent().find('input');
				for (var i = 1; i < $input.length; ++i) {
					if ($input.eq(i).val() === '') {
						$('#warning-every-fault').modal();
						return;						
					}
					texts.push($input.eq(i).val());
				}
				$.ajax({
					type: 'get',
					url: '/background/addToDonation',
					data: {texts: texts},
					success: function(data) {
						if(data)
							$('#operation-success').modal();
						else
							$('#operation-fail').modal();
					}
				});
		});
		// 将输入框初始化
		$('.cancel').click(function() {
			$(this).parent().parent().find('input').val('');
		});
		var getHistory = function(event) {
			var type = $(event.target).attr('name');
			var year = $("select  option:selected").eq(0+parseInt(type)*2).text().replace(/[^0-9]/, "");
			var month = $("select  option:selected").eq(1+parseInt(type)*2).text().replace(/[^0-9]/, "");
			$.ajax({
				type: 'get',
				url: '/background/donationHistory',
				data: {type: type, year: year, month: month},
				success: function(data) {
					if (data) {
						for (var i  = 0; i < data.length; ++i)
							$('.donation-history').append('<li>'  + '    ' + getDonationString(data[i]) + '</li>');
					}
				}
			});
		};
		// 不知道这个函数怎么直接拿来用
		var getDonationString = function(donation) {
			if (!donation)
				return '';
			switch (donation.type) {
				case 0:
					return donation.donator + '捐款' + donation.amount + '元';
				case 1:
					return donation.donator + '捐款' + donation.amount + '元' + '用于' + donation.note;
				case 2:
					return donation.donator + '捐赠' + donation.goods + '用于' + donation.note;
			}
			return '';
		};
		// 点击历史记录 
		$('.historyRecord').click(function(event) {
			$('.donation-history').children('li').remove();
			getHistory(event);
		});
		// 检测下拉列表值的变化
		$('select').change(function(event) {
			$('.donation-history').children('li').remove();
			getHistory(event);
		});
		// 非限定性捐款 批量填写
		$('#unlimited-mul button.right-btn').click(function(event) {
			var records = $(this).parent().parent().find('textarea').val().split('\n');
			var donators = [];
			var amounts = [];
			var flag = 0;
			for (var i = 0; i < records.length; ++i) {
				flag = 0;
				for (var j = 0; j < records[i].split(" ").length; ++j)  {
					if (records[i].split(" ")[j] !== "" && flag === 0) {
						++flag;
						donators.push(records[i].split(" ")[j]);
					}
					else if (records[i].split(" ")[j] !== "" && flag === 1) {
						amounts.push(records[i].split(" ")[j]);
						++flag;
						break;
					}
					else ;
				}
				if (flag === 1) {
					$(this).parent().prev().find('.remiding').css('color', 'red');
					return;
				}
			}
			$.ajax({
				type: "post",
				url: '/background/sendUnlimitedRecords',
				data: {
					donators: donators,
					amounts: amounts,
				},
				success: function(data) {
					if (data)
						$('#operation-success').modal();
					else
						$('#operation-fail').modal();
				}
			});
		});
		// 限定性捐款 批量填写
		$('#limited-mul button.right-btn').click(function(event) {
			var records = $(this).parent().parent().find('textarea').val().split('\n');
			var donators = [];
			var amounts = [];
			var notes = [];
			var flag = 0;
			for (var i = 0; i < records.length; ++i) {
				flag = 0;
				for (var j = 0; j < records[i].split(" ").length; ++j)  {
					if (records[i].split(" ")[j] !== "" && flag === 0) {
						++flag;
						donators.push(records[i].split(" ")[j]);
					}
					else if (records[i].split(" ")[j] !== "" && flag === 1) {
						amounts.push(records[i].split(" ")[j]);
						++flag;
					}
					else if (records[i].split(" ")[j] !== "" && flag === 2) {
						notes.push(records[i].split(" ")[j]);
						++flag;
						break;
					}
				}
				if (flag === 2) {
					window.alert('请不要有多余空行\n捐款者与捐款金额与目的分别用空格键隔开');
					return;
				}
			}
			$.ajax({
				type: "post",
				url: '/background/sendlimitedRecords',
				data: {
					donators: donators,
					amounts: amounts,
					notes: notes,
				},
				success: function(data) {
					if (data)
						$('#operation-success').modal();
					else
						$('#operation-fail').modal();
				}
			});
		});

	}
})();