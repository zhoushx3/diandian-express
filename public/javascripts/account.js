(function() {
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

	/*用户信息填写逻辑*/
	$("#profile-submit").click(function(event) {
		if ($("#profile-username").val() === "" || $("#addAdmin-username").val() === "") {
			$(this).removeAttr("href");
			alert("用户名不能为空");
		} else if($("#profile-email").val() === "" || $("#addAdmin-email").val() === "") {
			$(this).removeAttr("href");
			alert("邮箱不能为空");
		} else if($("#addAdmin-password").val() === "") {
			$(this).removeAttr("href");
			alert("密码不能为空");
		} else {
			$(this).attr("href", "#modify-user-confirm");		
		}
	});

	/*其他逻辑*/
	$("#profile-goback").click(function() {
		location.href="/background/accounts";
	});	
})();