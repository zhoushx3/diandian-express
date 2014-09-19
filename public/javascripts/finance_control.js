(function(){
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
})();
	