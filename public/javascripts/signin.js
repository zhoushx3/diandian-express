(function() {
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
})();