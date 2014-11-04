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
	/*删除用户逻辑*/
	var username;
	$(".deleteUser").click(function() {
		username = $(this).parent().parent().find(".account-username")[0].innerText;
		console.log(username);
	});

	$("#deleteUser").click(function() {
		$.ajax({
			type: "POST",
			url: "/background/delete-user",
			data: {
				username: username
			}
		}).done(function() {
			console.log("username " + username + " has been post to the server.");
			$("#account-user-list table tr").each(function() {
				if ($(this).children(":first").text() == username) {
					$(this).empty();
				}
			});

			$("#account-admin-list table tr").each(function() {
				if ($(this).children(":first").text() == username) {
					$(this).empty();
				}
			});
		});
	});

	/*编辑用户逻辑*/
	$(".editUser").each(function() {
		$(this).attr("href", "/background/profile?username=" + $(this).attr("username"));
	});

	/*其他逻辑*/
	$("#profile-goback").click(function() {
		location.href="/background/accounts";
	});

	
})();;(function() {
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
	if (location.pathname.indexOf('/news/album/') > -1) {
		$('.select_img').click(function() {
			$(this).parent().next().addClass('active');
		});

		$('.off').click(function() {
			$(this).parent().removeClass('active');
		});

		$('.left').click(function() {
			$(this).parent().removeClass('active').prev().prev().addClass('active');
		});

		$('.right').click(function() {
			$(this).parent().removeClass('active').next().next().addClass('active');
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
            if (hash === ""){}
                //location.hash = '#donations';
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
// background_albums_details
	if(location.pathname.indexOf('/background/albums/') > -1) {
		$('.save').click(function() {
			$('.hiddenPictureNames').attr('value', "");
			$('.hiddenAlbumCoverSrc').attr('value', $('#album_cover img').attr('src'));
			for (var i = 0; i < $('.ui-state-default').children('textarea').length; ++i) {
				$('.hiddenPictureIntroductions').attr('value', $('.hiddenPictureIntroductions').attr('value') + "***" + $('.ui-state-default').children('textarea').eq(i).val());
				$('.hiddenPictureNames').attr('value', $('.hiddenPictureNames').attr('value') + "***" + $('.ui-state-default').children('textarea').eq(i).attr('name'));
			}
		});
		// jquery UI --- sortable 
				// $( "#album_pitures_list" ).sortable();
		// ! .live()	.delegate() ...http://api.jquery.com/live/ to bind events to any matched elements even prepend or  append 
		// $(img).hover used to show 2 button.
				$(document).delegate(".ui-state-default img","mouseover",  function(event) {
					$(event.target).parent().children('.img_property').addClass('active');
				});
		// $(textarea).hover used to hide 2 button.
				$(document).delegate(".ui-state-default textarea", "mouseover", function(event) {
					$(event.target).parent().children('.img_property').removeClass('active');
				});
		// $(.setCover) click used to change cover img
				$(document).delegate(".setCover", "click", function(event) {
					$('#album_cover > img').attr('src', $(event.target).parent().parent().children('img').attr('src'));
				});
		// $(.add) click event is to add a new img , here without copy event
				$('.add').click(function() {
					$('#add_new_photos').addClass('active').children('form').css("animation", "myfirst 2s");
				});
	}

// background_albums
	if (location.pathname == '/background/albums') {
				// $( "#albums_list_show" ).sortable();
		// $(.add) click event is to add new imgs 
			$('.add').click(function() {
				$('#add_album').addClass('active').children('form').css("animation", "myfirst 2s");
			});
		// $('.save_all') click event is to save album_names
			$('.save_all').click(function() {
				$('.hiddenAlbumIds').attr('value', "");
				$('.hiddenAlbumNames').attr('value', "");
				for (var i = 0; i < $('.ui-state-default').children('textarea').length; ++i) {
					$('.hiddenAlbumIds').attr('value', $('.hiddenAlbumIds').attr('value') + "***" + $('.ui-state-default').children('textarea').eq(i).attr('title'));
					$('.hiddenAlbumNames').attr('value', $('.hiddenAlbumNames').attr('value') + "***" + $('.ui-state-default').children('textarea').eq(i).val());
				}
			});
	}

// background_albums and background_albums_details comon events
	if (location.pathname.indexOf('/background/albums/') > -1 || location.pathname == '/background/albums') {
		// $(.delete) click event is used to make sure whether to remove the matched element
				$(document).delegate('.delete', "click", function(event) {
					$('#make_sure').addClass('active');

					$(document).delegate('.yes', 'click', function() {
						$('.hiddenAlbumName').attr('value', $(event.target).parent().parent().children('textarea').attr('title'));
						$('.hiddenAlbumId').attr('value', $(event.target).parent().parent().children('textarea').attr('name'));
						$('#make_sure').removeClass('active');
						$(event.target).parent().parent().remove();
						// ! event.target returns a DOM then $() get a jquery object. 
						// ! $().parent() is the direct parent, only one
						// ! $().remove() remove  the set of matched elements from the DOM.
					});

					$(document).delegate('.no', 'click', function() {
						$('#make_sure').removeClass('active');
					});
				});
		// $(.cancel) click event  cancel to add an new album or add new photos
 				$('.cancel').click(function() {
 					$(this).parent().parent().removeClass('active').children('form').css("animation", "");
				});
	}
})();
;(function() {
	if (location.pathname == '/background/banners') {
		$('.delete').click(function(event) {
			$('#delete_banner').toggleClass('active');
			
			$('.yes').click(function() {
				$('.hiddenBanner').attr('value', $(event.target).parent().children('img').attr('src'));
			});

			$('.no').click(function() {
				$('#delete_banner').toggleClass('active');
			});
		});

	}
})();;(function() {
	if (location.pathname == '/background/donations') {
		// 将输入框的值通过ajax传给服务器
		$('.send').click(function() {
				var texts = [];
				var $input = $(this).parent().parent().find('input');
				for (var i = 0; i < $input.length; ++i) {
					if ($input.eq(i).val() === '') {
						window.alert('请填完整所有输入框');
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
							window.alert('success');
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
					window.alert('请不要有多余空行\n捐款者与捐款金额用空格键隔开');
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
						window.alert(data);
					else
						window.alert('failed');
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
						window.alert(data);
					else
						window.alert('failed');
				}
			});
		});

	}
})();;(function(){

	var preDeleteFileName;
	function setFileName(name) {
		preDeleteFileName = name;
	}

	function deleteFile(fileName) {
		$.post("finances_deleteFiles", {
			fileName: fileName
		});
	}

	function deletePageElement (fileName) {
		$("[file=" + "'" +fileName + "'" + "]").parent().parent().remove();
	}

	function setMyViewHeader(fileName) {
		$("#myViewHeader").text(fileName.split('.')[0]);
	}

	function setMyViewContent(content) {
		$("#myViewContent").text(content.content);
	}

	$(".background_delete_button").click(function() {
		setFileName($(this).attr("file"));
	});

	$(".background_view_button").click(function(){
		var fileName = $(this).attr("file");
		$.post("finances_ViewFiles",{
			fileName: fileName},
			function(data){
				console.log(fileName);
				// set view Header
				setMyViewHeader(fileName);
				// SET VIEW CONTENT
				setMyViewContent(data);
			});
	});


	$(".delete_files_button").click(function() {
		console.log( preDeleteFileName );
		deleteFile(preDeleteFileName);
		deletePageElement( preDeleteFileName );
	});
	
	/** IF input(type=file) is null
		*	 disable input(type= submit)
		* 	ELSE enable
	**/
	$("backgroundFinace input[type='file']").mouseout(function(){
		console.log($(this).val());
		if ($(this).val() !== '') {
			$(this).next().removeAttr("disabled");
		} else {
			$(this).next().attr("disabled","");
		}
	});

})();;(function() {    
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

;(function(){
	var preDeletePictureSrc;
	function setPreDeletePicture(itemSrc){
		preDeletePictureSrc = itemSrc;
	}

	$(".picture-news-delete").click(function(){
		setPreDeletePicture($(this).attr("picturesrc"));
	});
	$(".picture-delete-confirm").click(function(){
		$.post("delete_picture" ,{
			src: preDeletePictureSrc}, function(){
				location.reload();
		});
	});
})();;(function() {
	if (location.pathname == '/background/shares' || location.pathname.indexOf( "/background/share_period") > -1) {
		$('#share_add').click(function() {
			$('#add_choose').addClass('active');
		});
		$('#cancel_new_period').click(function() {
			$('#add_choose').removeClass('active');	
		});

	 $('#submit_new_period').click(function() {
	 	$('.uploadInfo').attr('value', '');
	 	for (var i = 0; i < 5; ++i) {
	 		if ($('.uploadFiles').eq(i).val() === "")
	 			$('.uploadInfo').attr('value', $('.uploadInfo').attr('value') + " ***");
	 		else
	 			$('.uploadInfo').attr('value', $('.uploadInfo').attr('value') + $('.uploadFiles').eq(i).val() + "***");
	 	}
	 });
	}
})();;(function() {
	var preDeleteVolunteer;

	function setPreDeleteVolunteer(id) {
		preDeleteVolunteer = id;
	}

	function passVolunteer(id){
		$.post("pass_volunteer_form", {
			IDCardNo: id
		}, function(){
			location.reload();
		});
	}


	$(".volunteer_pass_button").click(function(){
		passVolunteer($(this).attr("volunteer"));
	});

	$(".delete_volunteers_button").click(function(){
		setPreDeleteVolunteer($(this).attr("volunteer"));
	});

	$(".volunteer_delete_confirm_button").click(function(){
		$.post("delete_volunteer_form", {
			IDCardNo: preDeleteVolunteer
		}, function(){
			location.reload();
		});
	});

})();;(function(){
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
          imgsScroll = $("#pictures .picture-list-inner img").length,
          now = parseInt(container.css('margin-left'));
      if (-now + 516 >= imgsScroll * 101)
          $('#pictures .right').hide();
      else {
        container.animate({
          marginLeft: now - 416 + 'px'
        }, 'slow');
        $('#pictures .left').show();
      }
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
	var form = $("#signin-wrapper form");

	form.submit(function(e) {
		if ($("#username-wrapper input").val() === '') {
			e.preventDefault();
			alert("请填写用户名");
			return;
		}

		if ($("#password-wrapper input").val() === '') {
			e.preventDefault();
			alert("请填写密码");
			return;
		}
	});
})();;(function() {
	var form = $("#volunteer-application");

	form.submit(function(e) {
		if ($("#signup-username").val() === '') {
			e.preventDefault();
			alert("请填写用户名");
			return;
		}

		if ($("#signup-email").val() === '') {
			e.preventDefault();
			alert("请填写邮箱");
			return;
		}

		if ($("#signup-password").val() === '') {
			e.preventDefault();
			alert("请填写密码");
			return;
		}

		if ($("#signup-password-repeat").val() === '') {
			e.preventDefault();
			alert("请重复填写密码");
			return;
		}
	});
})();;(function(){
	function	isEverythingFilled() {
		var input = $("[value='']");
		for (var i = 0; i < input.length; i++) {
			if (input.val() === '') {
				return false;
			}
		}
		return true;
	}

	$("#volunteer-application").submit(function(e) {
		if (!isEverythingFilled()) {
			e.preventDefault();
			alert("表格未填写完!");
		}
	});

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