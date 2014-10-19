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

	/*其他逻辑*/
	$("#profile-goback").click(function() {
		location.href="/background/accounts";
	});
})();