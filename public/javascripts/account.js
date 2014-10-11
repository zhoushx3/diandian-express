(function() {
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
			console.log("username " + username +" has been post to the server.");
			$("#account-user-list table tr").each(function(){
				if($(this).children(":first").text() == username) {
					$(this).empty();
				}
			});

			$("#account-admin-list table tr").each(function(){
				if($(this).children(":first").text() == username) {
					$(this).empty();
				}
			});
		});
	});
})();