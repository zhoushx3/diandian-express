(function() {
    if (location.pathname == '/about'){
        var showProperTab = function() {
            var hash = location.hash;
            if (hash === "")
                location.hash = '#introduction';
            else if (hash == "#introduction" || hash == "#project" || hash == "#structure" || hash == "#contacts") {
                $('#about-content .tab-pane.active').removeClass('active');
                $('#about-content ' + location.hash).addClass('active');
                $('#about-nav li').removeClass('active');
                $('#about-nav a[href=' + location.hash + ']').parent().addClass('active');
            } else {
                $('#about-content .tab-pane.active').removeClass('active');
                $('#about-content ' + location.hash).addClass('active');
                $('#about-nav li').removeClass('active');
                $('#about-nav a[href=' + '#project'+']').parent().addClass('active');
            }
        };
        $(window).on('load', function() {
            showProperTab();
        });
        $(window).on('hashchange', function() { //forword, back
            showProperTab();
        });
    }
})();
;(function() {
	if (location.pathname == '/news/activity') {
		$('li').click(function( event ) {
			$('li').removeClass('active');
			$(this).addClass('active');
		});
	}
})();;(function() {
  if (location.pathname == '/aiding/apply') {
    $("button#save").click(function() {
      localStorage.name = $("#name").val();
      localStorage.sex = $("input:radio:checked").attr("selected", true).val();
      localStorage.nation = $("#nation").val();
      localStorage.birthYear = $("#birth-year").val();
      localStorage.birthMonth = $("#birth-month").val();
      localStorage.school = $("#school").val();
      localStorage.class = $("#class").val();
      localStorage.fee = $("#fee").val();
      localStorage.watcher = $("#watch").val();
      localStorage.age = $("#age").val();
      localStorage.ID = $("#ID-cardNo").val();
      localStorage.work = $("#work").val();
      localStorage.phone = $("#phone").val();
      localStorage.else = $("#else").val();
      localStorage.income = $("#income").val();
      localStorage.pocession = $("#pocession").val();
      localStorage.homeAddress = $("#homeAddress").val();
      localStorage.reason = $("#reason").val();
    });
    $(document).ready(function() {
      $("#name").val(localStorage.name);
      if (localStorage.sex == "female") {
        $("#female").attr("checked", true);
      }
      $("#nation").val(localStorage.nation);
      $("#birth-year").val(localStorage.birthYear);
      $("#birth-month").val(localStorage.birthMonth);
      $("#school").val(localStorage.school);
      $("#class").val(localStorage.class);
      $("#fee").val(localStorage.fee);
      $("#watch").val(localStorage.watcher);
      $("#age").val(localStorage.age);
      $("#ID-cardNo").val(localStorage.ID);
      $("#work").val(localStorage.work);
      $("#phone").val(localStorage.phone);
      $("#income").val(localStorage.income);
      $("#income").val(localStorage.income);
      $("#pocession").val(localStorage.pocession);
      $("#nowAdress").val(localStorage.nowAddress);
      $("#homeAddress").val(localStorage.homeAddress);
      $("#reason").val(localStorage.reason);
    });
  } 
})();;(function() {
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
})();;(function() {
    if (location.pathname == '/background'){
        var showProperTab = function() {
            var hash = location.hash;
            if (hash === "")
                location.hash = '#donations';
            else {
                $('#background-content .tab-pane.active').removeClass('active');
                $('#background-content ' + location.hash).addClass('active');
                $('#backgroundNav li').removeClass('active');
                $('#backgroundNav a[href=' + location.hash + ']').parent().addClass('active');
            }
        };
        $(window).on('load', function() {
            showProperTab();
        });
        $(window).on('hashchange', function() { //forword, back
            showProperTab();
        });
    }
})();
;(function() {
  $.getJSON('background/loadimages?jsoncallback=?', function(data) {
    alert('3');
    for (var i = 0; i < 3; ++i) {
      alert('3');
      var banner = $("<img>").src("show" + data[i].imageName);
      banner.id = data[i].imageName;
      banner.style.zIndex = 1;
      $("#div-image").append(banner);
    }
  });
})();
;(function(){
  if (location.pathname == '/' || location.pathname == '/news' || location.pathname  == '/volunteer/join-us'  || location.pathname == '/volunteer/apply' ) {
    var scroller = $('#donation-scroller');
    var inner = scroller.find('.inner');
    inner.clone().insertAfter(inner);

    scroller = scroller[0];
    var inner2 = $('#donation-scroller .inner:last')[0];
    var stop = false;

    setInterval(function() {
      if (stop)
          return;
      if (scroller.scrollLeft < inner2.offsetLeft)
          scroller.scrollLeft += 2;
      else
          scroller.scrollLeft = 0;
    }, 40);


    $('#donation-scroller span').on('mouseover', function(){
      stop = true;
    });

    $('#donation-scroller span').on('mouseout', function(){
      stop = false;
    });

    $('#donation-scroller span').on('click', function(){
      location.href = '/donations';
    });
  }
})();;(function(){
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
	;(function(){
  if (location.pathname == '/news') {
    $('.picture-list img').on('click', function(){
      $('#pictures .current img').attr('src', this.src);
      $('#pictures .title').text(this.title);
      $('#pictures .note').text(this.note);
    });

    $('.left').on('click', function(){
      var container = $('#pictures .picture-list-inner'),
        now = parseInt(container.css('margin-left'));
      if (-now - 416 <= 10)
        $('#pictures .left').hide();
      container.animate({
        marginLeft: now + 416 + 'px'
      }, 'slow');
      $('#pictures .right').show();
    });

    $('.right').on('click', function(){
      var container = $('#pictures .picture-list-inner'),
          now = parseInt(container.css('margin-left'));
      if (-now + 416 * 2 >= parseInt(container.css('width')))
          $('#pictures .right').hide();
      container.animate({
          marginLeft: now - 416 + 'px'
      }, 'slow');
      $('#pictures .left').show();
    });
  }
  String.prototype.startWith = function(compareStr){
    return this.indexOf(compareStr) === 0;
  };
  if (location.pathname.startWith('/news/')) {
    window._bd_share_config={
      "common":{
        "bdSnsKey":{},
        "bdText":"",
        "bdMini":"2",
        "bdMiniList":false,
        "bdPic":"",
        "bdStyle":"1",
        "bdSize":"24"
      },
      "share":{}
    };
    // with(document)0[
    //   (getElementsByTagName('head')[0]||body).appendChild(
    //   createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date()/36e5)
    // ];
  }
})();

;(function() {
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
})();;(function() {
	if (location.pathname == '/background/shares' || location.pathname == "/background/share_period") {
		$('#share_add').click(function() {
			$('#add_choose').addClass('active');
		});
		$('#cancel_new_period').click(function() {
			$('#add_choose').removeClass('active');	
		});
		$('#add').click(function() {
			$('#add_more').addClass('active');
		});
		$('#add_cancel').click(function() {
			$('#add_more').removeClass('active');
		});
	}
})();;(function(){
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