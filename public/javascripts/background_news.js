(function(){
	var preDeletePictureSrc;
	function setPreDeletePicture(itemSrc){
		preDeletePictureSrc = itemSrc;
	}

	$(".picture-news-delete").click(function(){
		setPreDeletePicture($(this).attr("picturesrc"));
	});
	$(".picture-delete-confirm").click(function(){
		$.post("delete_picture" ,{
			src: preDeletePictureSrc}, function(){
				location.reload();
		});
	});
})();