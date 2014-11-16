(function() {
// background_albums_details
	if(location.pathname.indexOf('/background/albums/') > -1) {
		$('.save').click(function() {
			$('.hiddenPictureNames').attr('value', "");
			$('.hiddenAlbumCoverSrc').attr('value', $('#album_cover img').attr('src'));
			for (var i = 0; i < $('.ui-state-default').children('textarea').length; ++i) {
				$('.hiddenPictureIntroductions').attr('value', $('.hiddenPictureIntroductions').attr('value') + "***" + $('.ui-state-default').children('textarea').eq(i).val());
				$('.hiddenPictureNames').attr('value', $('.hiddenPictureNames').attr('value') + "***" + $('.ui-state-default').children('textarea').eq(i).attr('name'));
			}
		});
		// ! .live()	.delegate() ...http://api.jquery.com/live/ to bind events to any matched elements even prepend or  append 
		// $(img).hover used to show 2 button.
				$(document).delegate(".ui-state-default img","mouseover",  function(event) {
					$(event.target).parent().children('.img_property').addClass('active');
				});
		// $(textarea).hover used to hide 2 button.
				$(document).delegate(".ui-state-default textarea", "mouseover", function(event) {
					$(event.target).parent().children('.img_property').removeClass('active');
				});
		// $(.setCover) click used to change cover img
				$(document).delegate(".setCover", "click", function(event) {
					$('#album_cover > img').attr('src', $(event.target).parent().parent().children('img').attr('src'));
				});
		// $(.add) click event is to add a new img , here without copy event
				$('.add').click(function() {
					$('#add_new_photos').addClass('active').children('form').css("animation", "myfirst 2s");
				});
	}

// background_albums
	if (location.pathname == '/background/albums') {
		// $('.save_all') click event is to save album_names
			$('.save_all').click(function() {
				$('.hiddenAlbumIds').attr('value', "");
				$('.hiddenAlbumNames').attr('value', "");
				for (var i = 0; i < $('.ui-state-default').children('textarea').length; ++i) {
					$('.hiddenAlbumIds').attr('value', $('.hiddenAlbumIds').attr('value') + "***" + $('.ui-state-default').children('textarea').eq(i).attr('title'));
					$('.hiddenAlbumNames').attr('value', $('.hiddenAlbumNames').attr('value') + "***" + $('.ui-state-default').children('textarea').eq(i).val());
				}
			});
	}

// background_albums and background_albums_details comon events
	if (location.pathname.indexOf('/background/albums/') > -1 || location.pathname == '/background/albums') {
		var album_id;
		// $(.delete) click event is used to make sure whether to remove the matched element
				$(document).delegate('.delete', "click", function(event) {
					album_id = $(this).parent().attr('name');
					$(document).delegate('.yes', 'click', function() {
						$('.hiddenAlbumName').attr('value', $(event.target).parent().parent().children('textarea').attr('title'));
						$('.hiddenAlbumId').attr('value', $(event.target).parent().parent().children('textarea').attr('name'));
						$(event.target).parent().remove();
						// ! event.target returns a DOM then $() get a jquery object. 
						// ! $().parent() is the direct parent, only one
						// ! $().remove() remove  the set of matched elements from the DOM.
					});
				});
	}
})();
