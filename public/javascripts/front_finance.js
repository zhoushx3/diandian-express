(function() {
	if (location.pathname == '/finance/donations'){
		var totalMoney = 0;
		var month = -1;
		var li = document.getElementById('records').getElementsByTagName('li');
		var selectYear = document.getElementById('year').getElementsByTagName('select')[0];
		var monthLi = document.getElementById('months').getElementsByTagName('li');
		
		var getMoneys = function() {
			totalMoney = 0;
			for (var x = 0; x < li.length; x++) {
				li[x].className = "";
				if (month == -1) {
					if (selectYear.value == li[x].innerHTML.match(/\d+/g)[0]) {
						li[x].className = "active";
						if (li[x].innerHTML.match(/\d+/g)[3] !== undefined)
							totalMoney += parseInt(li[x].innerHTML.match(/\d+/g)[3]);
					}
				}
				else {
					if (selectYear.value == li[x].innerHTML.match(/\d+/g)[0] && month == li[x].innerHTML.match(/\d+/g)[1]) {
						li[x].className = "active";
						if (li[x].innerHTML.match(/\d+/g)[3] !== undefined)
							totalMoney += parseInt(li[x].innerHTML.match(/\d+/g)[3]);
					}
				}
			}
			document.getElementById('total').innerHTML = "总共 " + totalMoney + "元";
		};
		var setMonths = function() {
			for (var y = 0; y < monthLi.length; y++)
				monthLi[y].className = "";	
			this.className = "active";
			month = parseInt(this.innerHTML !== "所有" ? this.innerHTML : -1);
			getMoneys();
		};
		getMoneys();
		selectYear.onchange = getMoneys;
		for (var y = 0; y < monthLi.length; y++) 
			monthLi[y].onclick = setMonths;
	}

	if (location.pathname == '/finance/annually-reports') {
		var $imgs = $('#annually-reports.finance').find('img');
		$('#years li').click(function(event) {
			$('#no-info').removeClass('active');
			$('#years li').removeClass('active');
			$(this).addClass('active');
			var exist = false;
			var year = $(event.target).text().match(/\d+/g)[0];
			$imgs.hide();
			for (var i = 0; i < $imgs.length; ++i) {
				if ($imgs.eq(i).attr('src').match(/\d+/g)[0] === year) {
					$imgs.eq(i).show();
					exist =  true;
				}
			}
			if (!exist) {
				$('#no-info').addClass('active');
			}
		});
		$('#years li').eq(0).click();
	}

	if (location.pathname == '/finance/monthly-reports') {
		var $yearSelect = $('#monthly-reports.finance').find('select').eq(0);
		var $quarterImgs = $('#monthly-reports.finance').find('img');
		$('#months li').click(function(event) {
			$('#no-info').removeClass('active');
			$('#months li').removeClass('active');
			$(this).addClass('active');
			var exist = false;
			var quarter = $(event.target).text().match(/\d+/g)[0];
			$quarterImgs.hide();
			for (var i = 0; i < $quarterImgs.length; ++i) {
				if ($quarterImgs.eq(i).attr('src').match(/\d+/g)[0] === $yearSelect.val() && $quarterImgs.eq(i).attr('src').match(/\d+/g)[1] === quarter) {
					$quarterImgs.eq(i).show();
					exist =  true;
				}
			}
			if (!exist) {
				$('#no-info').addClass('active');
			}
		});
		$yearSelect.change(function() {
			$('#months li.active').click();
		});
		$('#months li').eq(0).click();
	}

	if (location.pathname == '/finance/projects-expenses') {
		var $selectYear = $('#projects-expenses.finance').find('select').eq(0);
		var $monthImgs = $('#projects-expenses.finance').find('img');
		$('#months li').click(function(event) {
			$('#no-info').removeClass('active');
			$('#months li').removeClass('active');
			$(this).addClass('active');
			var exists= false;
			var month = $(event.target).text().match(/\d+/g)[0];
			$monthImgs.hide();
			for (var i = 0; i < $monthImgs.length; ++i) {
				if ($monthImgs.eq(i).attr('src').match(/\d+/g)[0] === $selectYear.val() && $monthImgs.eq(i).attr('src').match(/\d+/g)[1] === month) {
					$monthImgs.eq(i).show();
					exists =  true;
				}
			}
			if (!exists) {
				$('#no-info').addClass('active');
			}
		});
		$selectYear.change(function() {
			$('#months li.active').click();
		});
		$('#months li').eq(0).click();
	}
})();