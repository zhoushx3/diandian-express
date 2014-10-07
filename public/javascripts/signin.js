(function() {
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
})();