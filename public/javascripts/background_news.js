(function(){
	var label;
	function set(item){
		label = item;
	}

	$(".picture-news-delete").click(function(){
		set($(this).attr("picturesrc"));
	});
	
	$(".picture-delete-confirm").click(function(){
		$.post("delete_picture" ,{src: label}, function(){
			location.reload();
		});
	});

	$('.posts-delete-confirm').click(function() {
		$.post('delete_post', {post_id: $("a.post-delete").attr('value')}, function() {
			location.reload();
		});
	});
})();