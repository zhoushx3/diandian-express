(function() {
	if (location.pathname == '/finance/projects-expenses' || location.pathname == '/finance/monthly-reports') {
		var month = 12;
		var x;
		var li = document.getElementById('records').getElementsByTagName('li');
		var selectYear = document.getElementById('year').getElementsByTagName('select')[0];
		var monthLi = document.getElementById('months').getElementsByTagName('li');
		var picture = document.getElementById('img');
		var noInfo = document.getElementById('no-info');
		var getPictures = function() {
			noInfo.className = "";
			for (x = 0; x < li.length; x++) {
				li[x].className = "";
				if (selectYear.value == li[x].innerHTML.match(/\d+/g)[0] && month == li[x].innerHTML.match(/\d+/g)[1]) {
					picture.setAttribute('src', li[x].innerHTML);
					break;
				}
			}
			if (x == li.length) {
				picture.setAttribute('src', '');
				noInfo.className = "active";
			}
		};
		var setMonths = function() {
			for (var y = 0; y < monthLi.length; y++)
				monthLi[y].className = "";	
			this.className = "active";
			month = parseInt(this.innerHTML);
			getPictures();
		};
		getPictures();
		monthLi[0].className = "active";
		selectYear.onchange = getPictures;
		for (var y = 0; y < monthLi.length; y++) 
			monthLi[y].onclick = setMonths;
	}
})();