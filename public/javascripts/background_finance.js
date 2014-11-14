(function(){

	var fileName;

	function setMyViewHeader(fileName) {
		$("#myViewHeader").text(fileName.split('.')[0]);
	}

	function setMyViewContent(content) {
		$("#myViewContent").attr('src', content.content);
	}

	$(".background_delete_button").click(function() {
		setFileName($(this).attr("file"));
	});

	$(".background_view_button").click(function(){
		fileName = $(this).attr("file");
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
		window.alert(fileName);
		$.post("finances_deleteFiles", {
			fileName: fileName
		});
		$("[file=" + "'" +fileName + "'" + "]").parent().parent().remove();
		// deletePageElement( preDeleteFileName );
	});
	
	/** IF input(type=file) is null
		*	 disable input(type= submit)
		* 	ELSE enable
	**/
	// $("backgroundFinace input[type='file']").mouseout(function(){
	// 	console.log($(this).val());
	// 	if ($(this).val() !== '') {
	// 		$(this).next().removeAttr("disabled");
	// 	} else {
	// 		$(this).next().attr("disabled","");
	// 	}
	// });

})();