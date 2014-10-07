(function() {
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
})();