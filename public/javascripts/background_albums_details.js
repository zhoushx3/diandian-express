(function() {
// background_albums_details
	if(location.pathname.indexOf('/background/albums/') > -1) {
		// jquery UI --- sortable 
				$( "#album_pitures_list" ).sortable();
		// $(.add) click event is to add a new img , here without copy event
				$('.add').click(function() { 
					$('#album_pitures_list').prepend(	
						'<div class="ui-state-default  ui-sortable-handle">' +
							'<img src="../../images/ini.png"/>' + 
						 	' <textarea> </textarea>' +
						  	'<div class="img_property">' +
						   		'<input type="button" value="删除照片？" class="delete"/>' +
						    	'<input type="button" value="设为封面？" class="setCover"/>'  +
						 	'</div>'  +
						  	'<div class="new_img_load">' + 
						  		'<input type="file"/>'  +
 						    	'<input type="button" value="删除照片？" class="delete"/>'  +
						  	'</div>'  +
						'</div>'
					);
				});

// ! .live()	.delegate() ...http://api.jquery.com/live/ in order to bind events to any matched elements even prepend or  append 
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
	}

// background_albums
	if (location.pathname == '/background/albums') {
				$( "#albums_list_show" ).sortable();

		// $(.add) click event is to add a new img 
				$('.add').click(function() {
					$('#albums_list_show').prepend(
						'<div class="ui-state-default ui-sortable-handle">' +
							'<a href="#"><img src="/images/album_cover_ini.png" /></a>' +
						 	'<textarea> </textarea>' +
						 	'<div>' +
							    '<input type="button" value="@" class="delete"/>' + 
						 	'</div>' +
						'</div>'
					);
				});
	}

// background_albums and background_albums_details comon events
	if (location.pathname.indexOf('/background/albums/') > -1 || location.pathname == '/background/albums') {
		// $(.delete) click event is used to make sure whether to remove the matched element
				$(document).delegate('.delete', "click", function(event) {
					$('#make_sure').addClass('active');

					$(document).delegate('.yes', 'click', function() {
						$('#make_sure').removeClass('active');
						$(event.target).parent().parent().remove();
						// ! event.target returns a DOM then $() get a jquery object. 
						// ! $().parent() is the direct parent, only one
						// ! $().remove() remove  the set of matched elements from the DOM.
					});

					$(document).delegate('.no', 'click', function() {
						$('#make_sure').removeClass('active');
					});
				});
	}
})();