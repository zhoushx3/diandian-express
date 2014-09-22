(function(){

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

})();