(function() {
// background_albums_details
	var album_id;
	var pictureName;
	var pictureSrc;
	var pictureIndex;
	if(location.pathname.indexOf('/background/albums/') > -1) {
		album_id = location.pathname.split('/')[3];

		// ! .live()	.delegate() ...http://api.jquery.com/live/ to bind events to any matched elements even prepend or  append 
		$(document).delegate("#album_pitures_list >  a", "click", function(event) {
			pictureName = $(event.target).attr('name');
			pictureSrc = $(event.target).attr('data-src');
			pictureIndex = $(event.target).attr('data-index');
		});
		// 修改相册封面 [][][]
		$(document).delegate("#album_pitures_list .setCover", "click", function(event) {
			$.ajax({
				url: '/background/albums/modifyAlbumCover',
				method: 'post',
				data: {
					album_id: album_id,
					pictureSrc: pictureSrc,
				},
				success: function(data) {
					location.reload();
				}
			});
		});
		// 删除照片 [][][]
		$(document).delegate('#make_sure .yes', "click", function(event) {
			$.ajax({
				url: '/background/albums/deletePitures',
				method: 'post',
				data: {
					pictureName: pictureName,
					album_id : album_id,
				},
				success: function(data) {
					location.reload();
				},
				error: function(data) {
					window.alert(data);
				}
			});
		});
		// 保存照片修改  [][][]
		$(document).delegate('#album_pitures_list .save', 'click', function(event) {
			var introduction = $(event.target).parent().parent().find('textarea').val();
			var headline = $(event.target).parent().parent().find('input').val();
			$.ajax({
				url: '/background/albums/modifyPictureContents',
				method: 'post',
				data: {
					pictureIndex: pictureIndex,
					introduction: introduction,
					headline: headline,
					album_id: album_id,
					pictureName: pictureName,
				},
				success: function(data) {
					location.reload();
				},
			});
		});
		// 增加相册内照片
		$(document).delegate('.addPhotos', 'click', function(event) {
			$('.hiddenAlbumId').attr('value', album_id);
		});

		$(document).delegate('.saveAlbumName', 'click', function(event) {
			$.ajax({
				url: '/background/albums/modifyAlbumName',
				method: 'post',
				data: {
					album_id: album_id,
					album_name: $(event.target).prev().val(),
				},
				success: function(data) {
					location.reload();
				}
			});
		});
	}

// background_albums
	if (location.pathname == '/background/albums') {
			// 删除相册 [][][][]
			$(document).delegate('.delete', "click", function(event) {
				$('.hiddenAlbumId').attr('value', $(event.target).parent().attr('value'));
				$(document).delegate('.yes', 'click', function() {
					location.reload();
					// ! event.target returns a DOM then $() get a jquery object. 
					// ! $().parent() is the direct parent, only one
					// ! $().remove() remove  the set of matched elements from the DOM.
				});
			});
	}
})();
