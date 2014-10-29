(function() {
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

})();