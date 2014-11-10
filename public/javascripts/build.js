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
	var account_admin = [];
	var account_user = [];
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

	/*用户信息填写逻辑*/
	$("#profile-submit").click(function(event) {
		if ($("#profile-username").val() === "" || $("#addAdmin-username").val() === "") {
			$(this).removeAttr("href");
			alert("用户名不能为空");
		} else if ($("#profile-email").val() === "" || $("#addAdmin-email").val() === "") {
			$(this).removeAttr("href");
			alert("邮箱不能为空");
		} else if ($("#addAdmin-password").val() === "") {
			$(this).removeAttr("href");
			alert("密码不能为空");
		} else {
			$(this).attr("href", "#modify-user-confirm");
		}
	});

	/*搜索用户逻辑*/
	$("#search-user").click(function() {
		if ($("#search-keyword").val() === "") {
			alert("关键字不能为空");
			return;
		} else {
			$.ajax({
				type: "POST",
				url: "/background/search-users",
				async: false,
				data: {
					keyword: $("#search-keyword").val()
				}
			}).success(function(msg) {
				//如果是管理员
				if (msg.role == 'admin') {
					$("#account-user-list table tbody").empty();
					$("#account-admin-list table tbody").empty();
					appendMsg("#account-admin-list table tbody",msg);
				} else if (msg.role == 'user') { //如果是普通用户
					$("#account-admin-list table tbody").empty();
					$("#account-user-list table tbody").empty();
					appendMsg("#account-user-list table tbody",msg);
				} else { //如果搜索不到该用户
					alert("找不到该用户");
				}
			});
		}
	});

	/*其他逻辑*/
	$("#profile-goback").click(function() {
		location.href = "/background/accounts";
	});

	function appendMsg(id, msg) {
		var str = "<tr><td>" + msg.username + "</td>"+
				  "<td>" + msg.email + "</td>" + 
				  "<td>" + msg.profile.gender + "</td>" + 
				  "<td>" + msg.profile.QQ + "</td>" +
				  "<td>" + msg.profile.weibo + "</td>" + 
				  "<td><a class='editUser' href='/background/profile?username=" + 
				  msg.username + "'>编辑</a>  <a class='deleteUser' data-toggle='modal' href='#delete-user-confirm'>删除</a></td></tr>";

		$(id).append(str);
	}
})();;(function() {
	if (location.pathname == '/news/activity') {
		$('#activity_content #contents').css('display', 'none');
		$('#activity_content #contents').eq(0).css('display', 'block');
		$('li.foreshow').eq(0).addClass('active');

		$('li').click(function( event ) {
			$('li').removeClass('active');
			$(this).addClass('active');
			$('#activity_content #contents').css('display', 'none');
			$('#activity_content #contents').eq($(this).index()/2).css('display', 'block');
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
      localStorage.phone = $("#cellphone").val();
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
      $("#cellphone").val(localStorage.phone);
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
				$('.hiddenBanner').attr('value', $(event.target).parent().children('img').attr('src'));
			});

			$('.yes').click(function() {
				$.ajax({
					url: "/background/deleteBanner",
					method: 'post',
					data: {hiddenBanner: $('.hiddenBanner').attr('value')},
					success: function(data) {
						location.reload();
					}
				});
			});
	}
})();;(function() {
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
})();;(function() {    
	if (location.pathname === "/background/funds_apply") {
		var fundsID;
		$(document).delegate('a.view_fund_apply', 'click', function() {
			fundsID = $(this).attr('name');
			$('#fundsName').text($(this).attr('data-name'));
			$('#fundsName1').text($(this).attr('data-name'));
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
							$('#labels').append('<button class="label">' + data.label[j] + '</button>');
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
		$(document).delegate('button.label', 'click', function() {
			var theLabel = $(this).text();
			$(this).remove();
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
			$(this).parent().parent().find('.close').click();
			$('a.fund_pass_confirm_button').click(function() {
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
			$(this).parent().parent().find('.close').click();
			$('a.fund_delete_confirm_button').click(function() {
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
		// 显示标签对应的申请表
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
							$("<a class='view_fund_apply generalA',role='button', data-toggle='modal', href='#fund'>"  + data[i].name + data[i].date.split(/[-A-Z]/g)[0] + "-" + data[i].date.split(/[-A-Z]/g)[1] + "-" + data[i].date.split(/[-A-Z]/g)[2] + ' </a>').appendTo('#funds_byLables').attr('name', data[i]._id);
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
      location.href = '/finance/donations';
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
	;(function() {
	// 修改导航栏背景色
   var pathname = location.pathname;
   if (pathname.indexOf('/background') > -1)
      $('a.hrefTracer[href=\"\/background\/'+pathname.split('/')[2]+'\"]').css('background-color', 'orange');
   else
      $('a.hrefTracer[href=\"\/'+pathname.split('/')[1]+'\"]').css('background-color', 'orange');

    // 增加查看次数,成功了但是返回error
    $('a.viewCountTracer').click(function() {
        	var id = $(this).attr('href').split('/')[3];
        	$.ajax({
        		type: 'get',
        		url: '/news/addViewCount',
        		data: {id: id}
        	});
      });
    // 增加活动预告查看次数,但是页面没有及时刷新
    $('li.viewCountTracer').click(function() {
        var id = $(this).next().text();
        $.ajax({
          type: 'get',
          url: '/news/addActivityViewCount',
          data: {id: id}
        });
    });
    // 分页及换页操作
   $('a.page.generalA').click(function() {
    	$.ajax({
    		type: 'get',
    		url: '/news',
    		data: {page: $(this).attr('data-page')},
    		success: function(data) {
    			location.reload();
    		}
    	});
   });
   // 换页 上一页 
   $('a.pageBack.generalA').click(function() {
    	$.ajax({
    		type: 'get',
    		url: '/news',
    		data: {page: $(this).attr('data-page')-1},
    		success: function(data) {
    			location.reload();
    		}
    	});
    });
   // 换页 下一页
   $('a.pageForward.generalA').click(function() {
    	$.ajax({
    		type: 'get',
    		url: '/news',
    		data: {page: parseInt($(this).attr('data-page'))+1},
    		success: function(data) {
    			location.reload();
    		}
    	});
    });
  // 页码颜色	
  $('a.page.generalA[data-page='+$('a.pageForward.generalA').attr('data-page')+']').css('background-color', 'rgba(135, 243, 135, 1)');
  //  限定上下页出现如果没有上页或下页
  if ($('a.pageForward.generalA').attr('data-page') === '1')
  	$('a.pageBack.generalA').css('display', 'none');
  if ($('a.pageForward.generalA').attr('data-page') === $('a.pageForward.generalA').attr('data-record'))
  	$('a.pageForward.generalA').css('display', 'none');

  $('#album-list .album').click(function() {
    window.location.href = $(this).attr('data-href');
  });
})();;(function() {
	var form = $(".formSubmit");
	form.submit(function(e) {
		$('.formWarning').hide();
		hasNull(e);
		validate(e);
		$('.formWarning').css('color', 'red').css('font-size', '12px');
	});
	// function
	function hasNull(e) {
		for (var x = 0; x < 15; ++x)
			if (isNull($(e.target).find('input[type="text"]').eq(x).val()))
				$(e.target).find('input[type="text"]').eq(x).after('<span class="formWarning"> *</span>');
	}

	function validate(e) {
		var $userName = $(e.target).find('#username'); // 注册用户名
		var $email = $(e.target).find('#email');                // 注册  邮箱
		var $password = $(e.target).find('#signup-password');   // 注册  密码
		var $repeat_password = $(e.target).find('#signup-password-repeat');  // 重复  密码
		var $name = $(e.target).find('#name');   // 姓名
		var $nation = $(e.target).find('#nation');  // 民族
		var $birth_year = $(e.target).find('#birth-year'); // 出生年
		var $birth_month = $(e.target).find('#birth-month'); // 出生月
		var $ID_card = $(e.target).find('#ID-cardNo');  // 身份证号
		var $age = $(e.target).find('#age');  // 年龄
		var $cellphone = $(e.target).find('#cellphone'); // 手机
		var $phone = $(e.target).find('#phone'); // 电话号码
		var $postcode = $(e.target).find('#postcode');  // 邮政编码
		var $QQ = $(e.target).find('#QQ'); // QQ
		if ($userName.length !== 0 && (isNull($userName.val()) || !isChinaOrNumbOrLett($userName.val()))) {
			e.preventDefault();
			$userName.after('<span class="formWarning"> 只能由汉字、字母、数字组成 </span>');
		}

		if ($email.length !== 0  && (isNull($email.val()) || !isEmail($email.val()))) {
			e.preventDefault();
			$email.after('<span class="formWarning"> 必须是合法邮箱 </span>');
		}
		
		if ($password.length !== 0  && (isNull($password.val()) || !isLengthMathc($password.val(), 6, 12))) {
			e.preventDefault();
			$password.after('<span class="formWarning"> 密码长度 6 - 12 位 </span>');
		}

		if ($repeat_password.length !== 0  && isNull($repeat_password .val())) {
			e.preventDefault();
			$repeat_password.after('<span class="formWarning"> 两次密码输入不同 </span>');
		}

		if ($name.length !== 0  && (isNull($name.val()) || !isChinaOrNumbOrLett($name.val()))) {
			e.preventDefault();
			$name.after('<span class="formWarning"> 由汉字、字母、数字组成 </span>');
		}

		if ($nation.length !== 0 && (isNull($nation.val()) || !nation($nation.val()))) {
			e.preventDefault();
			$nation.after('<span class="formWarning"> 必须是属于中华56民族 </span>');
		}

		if($birth_year.length !== 0  && !isNumber($birth_year.val())) {
			e.preventDefault();
			$birth_year.after('<span class="formWarning"> 不合理 </span>');
		}

		if($birth_month.length !== 0  && !isNumber($birth_month.val())) {
			e.preventDefault();
			$birth_month.after('<span class="formWarning"> 不合理 </span>');
		}

		if($ID_card.length !== 0  && !IdCardRegCheck($ID_card.val())) {
			e.preventDefault();
			$ID_card.after('<span class="formWarning"> 不合理 </span>');
		}

		if($age.length !== 0  && !isNumber($age.val())) {
			e.preventDefault();
			$age.after('<span class="formWarning"> 必须是数字 </span>');
		}

		if($cellphone.length !== 0  && !checkMobile($cellphone.val())) {
			e.preventDefault();
			$cellphone.after('<span class="formWarning"> 不合理手机号码 </span>');
		}

		if($phone.length !== 0  && !checkPhone($phone.val())) {
			e.preventDefault();	
			$phone.after('<span class="formWarning"> 不合理电话号码 </span>');
		}

		if($postcode.length !== 0  && !isZip($postcode.val())) {
			e.preventDefault();	
			$postcode.after('<span class="formWarning"> 不是正确的邮政编码 </span>');
		}

		if($QQ.length !== 0  && !isQQ($QQ.val())) {
			e.preventDefault();	
			$QQ.after('<span class="formWarning"> 不正确的QQ号码 </span>');
		}
	}
/*
用途：检查输入字符串是否为空或者全部都是空格
如果全是空返回true,否则返回false
*/
	function isNull( str ) {
		if ( str === "" ) return true;
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	}
/*
用途：检查输入对象的值是否符合E-Mail格式
如果通过验证返回true,否则返回false
*/
	function isEmail( str ){ 
		var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
		if(myReg.test(str)) return true;
		return false;
	}
/*
用途：检查输入字符串是否只由汉字、字母、数字组成
如果通过验证返回true,否则返回false
*/
	function isChinaOrNumbOrLett( s ){//判断是否是汉字、字母、数字组成
		var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";  
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		}else{
			return false;
		}
	}
/*
判断长度是否符合要求
符合则返回true
*/
	function isLengthMathc(s, l1, l2) {
		if (!s) return false;
		if (s.length <  l1 || s.length > l2)
			return false;
		return true;
	}

/*
用途：检查输入手机号码是否正确
如果通过验证返回true,否则返回false
*/
	function checkMobile( s ){  
		if (!s) return false;
		var regu =/^[1][3][0-9]{9}$/;
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	}
/*
用途：判断是否属于56民族,
如果是则返回true
*/
	var nations = ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '土家族' ,'彝族' ,'蒙古族','藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族', '哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族', '东乡族', '高山族', '拉祜族', '水族', '佤族', '纳西族', '羌族', '土族', '仫佬族', '锡伯族', '柯尔克孜族', '达斡尔族', '景颇族', '毛南族', '撒拉族', '布朗族', '塔吉克族', '阿昌族', '普米族', '鄂温克族', '怒族', '京族', '基诺族', '德昂族', '保安族', '俄罗斯族', '裕固族', '乌兹别克族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族', '珞巴族'];
	function nation(s) {
		if (!s) return false;
		for (var i = 0; i < 56; ++i)
			if (s.split('族')[0]+'族' === nations[i])
				break;
		if (i !== 56)
			return true;
		return false;
	}
/*
用途：检查输入字符串是否符合正整数格式
如果通过验证返回true,否则返回false
*/
	function isNumber( s ){  
		var regu = "^[0-9]+$";
		var re = new RegExp(regu);
		if (s.search(re) != -1) {
			return true;
		} else {
			return false;
		}
	} 
/*
用途：检查身份证号
如果通过验证返回true,否则返回false
*/
	function IdCardRegCheck(s)
	{
		if (!s) return false;
		var reg = /^([0-9]{15}|[0-9]{18})$/;
		var flag = reg.test(s);
		return flag;
	}
/*
用途：检查输入的电话号码格式是否正确
如果通过验证返回true,否则返回false
*/
	function checkPhone( strPhone ) {
		if (!strPhone) return false;
		var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
		var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
		if( strPhone.length > 9 ) {
			if( phoneRegWithArea.test(strPhone) ){
				return true;
			} else {
				return false;
			}
		} else {
			if( phoneRegNoArea.test( strPhone ) ){
				return true;
			} else {
				return false;
			} 
		}
	}
/*
用途：验证邮政编码的有效性
如果通过验证返回true,否则返回false
*/
	function isZip( s ){  
		if (!s) return false;
	    var pattern =  /^[1-9]\d{5}$/;  
	    if(!(pattern.test(s))){  
	        return false;  
	    }  
	    else return true;  
	} 
/*
用途：验证QQ的有效性
如果通过验证返回true,否则返回false
*/
	function isQQ( s )
	{
		if (!s) return false;
		var reg = /^[1-9]\d{4,9}$/; 
		return reg.test(s);
	}
})();;(function() {
	if (location.pathname.indexOf('/news/album/') > -1) {
		// slide_pictures_with_modal
		var index;
		$('.select_img').click(function() {
			index = parseInt($(this).attr('data-count'));
			$('#show_picture h3').text($(this).attr('alt'));
			$('#show_picture p').text($(this).next().next().text());
			$('#show_picture .img').css('background', 'url('+$(this).attr('src')+') no-repeat 80%');
		});
		
		$('.left').click(function() {
			if (index !== 1) {
				index = parseInt(index) - 1;
				$('#show_picture h3').text($('.select_img[data-count='+index+']').attr('alt'));
				$('#show_picture p').text($($('.select_img[data-count='+index+']')).next().next().text());
				$('#show_picture .img').css('background', 'url('+$('.select_img[data-count='+index+']').attr('src')+') no-repeat 80%');
			}
		});

		$('.right').click(function() {
			if (index !== $('.select_img').length) {
				index = parseInt(index)+1;
				$('#show_picture h3').text($('.select_img[data-count='+index+']').attr('alt'));
				$('#show_picture p').text($($('.select_img[data-count='+index+']')).next().next().text());
				$('#show_picture .img').css('background', 'url('+$('.select_img[data-count='+index+']').attr('src')+') no-repeat 80%');
			}
		});
	}
})();;(function(){
  if (location.pathname == '/news') {
    $('.picture-list img').on('click', function(){
      $('#pictures .current').css('background-image', 'url('  + this.src + ')');
      $('#pictures .title').text(this.title);
      $('#pictures .note').text($(this).attr('data-note'));
    });
    $('#pictures .left').hide();
    $('.left').on('click', function(){
      var container = $('#pictures .picture-list-inner'),
        now = parseInt(container.css('margin-left'));
      if (now >= -426)
        $('#pictures .left').hide();
      container.animate({
        marginLeft: now + 426 + 'px'
      }, 'slow');
      $('#pictures .right').show();
    });

    $('.right').on('click', function(){
      var container = $('#pictures .picture-list-inner'),
          now = parseInt(container.css('margin-left')),
          num = $('#pictures .picture-list-inner').children('img').length/4;
      if (-now - 426*(Math.floor(num)-1) >= 0)
          $('#pictures .right').hide();
      container.animate({
          marginLeft: now - 426 + 'px'
      }, 'slow');
      $('#pictures .left').show();
    });
  }
  // String.prototype.startWith = function(compareStr){
  //   return this.indexOf(compareStr) === 0;
  // };
  // if (location.pathname.startWith('/news/')) {
  //   window._bd_share_config={
  //     "common":{
  //       "bdSnsKey":{},
  //       "bdText":"",
  //       "bdMini":"2",
  //       "bdMiniList":false,
  //       "bdPic":"",
  //       "bdStyle":"1",
  //       "bdSize":"24"
  //     },
  //     "share":{}
  //   };
    // with(document)0[
    //   (getElementsByTagName('head')[0]||body).appendChild(
    //   createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date()/36e5)
    // ];
  // }
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
		$('.formWarning').css('color', 'red').css('font-size', '12px');
		$('.formWarning').hide();
		if ($("#username-wrapper input").val() === '') {
			e.preventDefault();
			$("#username-wrapper input").after("<span class='formWarning'> 请填写用户名<span>");
		}

		if ($("#password-wrapper input").val() === '') {
			e.preventDefault();
			$("#password-wrapper input").after("<span class='formWarning'> 请填写密码</span");
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