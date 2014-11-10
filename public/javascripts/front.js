(function() {
	// 修改导航栏背景色
   var pathname = location.pathname;
   if (pathname.indexOf('/background') > -1)
      $('a.hrefTracer[href=\"\/background\/'+pathname.split('/')[2]+'\"]').css('background-color', 'orange');
   else
      $('a.hrefTracer[href=\"\/'+pathname.split('/')[1]+'\"]').css('background-color', 'orange');

    // 增加查看次数,成功了但是返回error
    $('a.viewCountTracer').click(function() {
        	var id = $(this).attr('href').split('/')[3];
        	$.ajax({
        		type: 'get',
        		url: '/news/addViewCount',
        		data: {id: id}
        	});
      });
    // 增加活动预告查看次数,但是页面没有及时刷新
    $('li.viewCountTracer').click(function() {
        var id = $(this).next().text();
        $.ajax({
          type: 'get',
          url: '/news/addActivityViewCount',
          data: {id: id}
        });
    });
    // 分页及换页操作
   $('a.page.generalA').click(function() {
    	$.ajax({
    		type: 'get',
    		url: '/news',
    		data: {page: $(this).attr('data-page')},
    		success: function(data) {
    			location.reload();
    		}
    	});
   });
   // 换页 上一页 
   $('a.pageBack.generalA').click(function() {
    	$.ajax({
    		type: 'get',
    		url: '/news',
    		data: {page: $(this).attr('data-page')-1},
    		success: function(data) {
    			location.reload();
    		}
    	});
    });
   // 换页 下一页
   $('a.pageForward.generalA').click(function() {
    	$.ajax({
    		type: 'get',
    		url: '/news',
    		data: {page: parseInt($(this).attr('data-page'))+1},
    		success: function(data) {
    			location.reload();
    		}
    	});
    });
  // 页码颜色	
  $('a.page.generalA[data-page='+$('a.pageForward.generalA').attr('data-page')+']').css('background-color', 'rgba(135, 243, 135, 1)');
  //  限定上下页出现如果没有上页或下页
  if ($('a.pageForward.generalA').attr('data-page') === '1')
  	$('a.pageBack.generalA').css('display', 'none');
  if ($('a.pageForward.generalA').attr('data-page') === $('a.pageForward.generalA').attr('data-record'))
  	$('a.pageForward.generalA').css('display', 'none');

  $('#album-list .album').click(function() {
    window.location.href = $(this).attr('data-href');
  });
})();