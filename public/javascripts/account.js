(function() {
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
})();