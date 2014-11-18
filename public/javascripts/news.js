(function(){
  if (location.pathname == '/news') {
    $('.picture-list img').on('click', function(){
      $('#pictures .current img').attr('src', this.src);
      $('#pictures .title').text(this.title);
      $('#pictures .note').text(this.note);
    });

    $('.left').on('click', function(){
      var container = $('#pictures .picture-list-inner'),
        now = parseInt(container.css('margin-left'));
      if (-now - 432 <= 10)
        $('#pictures .left').hide();
      container.animate({
        marginLeft: now + 432 + 'px'
      }, 'slow');
      $('#pictures .right').show();
    });

    $('.right').on('click', function(){
      var container = $('#pictures .picture-list-inner'),
          imgsScroll = $("#pictures .picture-list-inner img").length,
          now = parseInt(container.css('margin-left'));
      if (-now + 516 >= imgsScroll * 101)
          $('#pictures .right').hide();
      else {
        container.animate({
          marginLeft: now - 432 + 'px'
        }, 'slow');
        $('#pictures .left').show();
      }
    });
  }
  String.prototype.startWith = function(compareStr){
    return this.indexOf(compareStr) === 0;
  };
  if (location.pathname.startWith('/news/')) {
    window._bd_share_config={
      "common":{
        "bdSnsKey":{},
        "bdText":"",
        "bdMini":"2",
        "bdMiniList":false,
        "bdPic":"",
        "bdStyle":"1",
        "bdSize":"24"
      },
      "share":{}
    };
    // with(document)0[
    //   (getElementsByTagName('head')[0]||body).appendChild(
    //   createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date()/36e5)
    // ];
  }
})();

