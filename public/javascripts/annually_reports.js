(function() {
	if (location.pathname == '/finance/annually-reports') {
		var x, year = 2012;
		var li = document.getElementById('records').getElementsByTagName('li');
		var selectYear = document.getElementById('years').getElementsByTagName('li');
		var picture = document.getElementById('img');
		var noInfo = document.getElementById('no-info');
		var getPictures = function() {
			noInfo.className = "";
			for (x = 0; x < li.length; x++) {
				li[x].className = "";
				if (year== li[x].innerHTML.match(/\d+/g)[0]) {
					picture.setAttribute('src', li[x].innerHTML);
					break;
				}
			}
			if (x == li.length) {
				picture.setAttribute('src', '');
				noInfo.className = "active";
			}
		};
		var setYear = function() {
			for (var y = 0; y < selectYear.length; y++)
				selectYear[y].className = "";	
			this.className = "active";
			year = parseInt(this.innerHTML);
			getPictures();
		};
		getPictures();
		selectYear[0].className = "active";
		selectYear.onchange = getPictures;
		for (var y = 0; y < selectYear.length; y++) 
			selectYear[y].onclick = setYear;
	}
})();