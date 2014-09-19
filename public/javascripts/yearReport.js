(function(){
	if (location.pathname == '/finance/annually-reports'){
		var flag = -1;
		var selectYear = document.getElementById('years').getElementsByTagName('li');
		var pictureLi = document.getElementById('pictures').getElementsByTagName('li');
		var info = document.getElementById('no-info');
		var img = document.getElementById("img");
		var changePic = function () {
			flag = -1;
			info.className = "";
			img.setAttribute('src', '');
			img.className = "";
			for (var y = 0; y < selectYear.length; ++y)
				selectYear[y].className = "";
			this.className = "active";
			for (var x = 0; x < pictureLi.length; ++x) {
				if (pictureLi[x].innerHTML.match(/\d+/g)[0] == this.innerHTML.match(/\d+/g)[0])
					flag = x;
			}
			if (flag !== -1) {	
				img.setAttribute('src', this.innerHTML);
				img.className = "active";
			}
			else
				info.className = "active";
			window.alert(pictureLi.length);
		};
		selectYear[0].className = "active";
		info.className = "active";
		for (var x = 0; x < selectYear.length; ++x)
			selectYear[x].onclick = changePic;
	}
})();