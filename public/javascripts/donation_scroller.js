(function(){
  if (location.pathname == '/' || location.pathname == '/news' || location.pathname  == '/volunteer/join-us'  || location.pathname == '/volunteer/apply' ) {
    var scroller = $('#donation-scroller');
    var inner = scroller.find('.inner');
    inner.clone().insertAfter(inner);

    scroller = scroller[0];
    var inner2 = $('#donation-scroller .inner:last')[0];
    var stop = false;

    setInterval(function() {
      if (stop)
          return;
      if (scroller.scrollLeft < inner2.offsetLeft)
          scroller.scrollLeft += 2;
      else
          scroller.scrollLeft = 0;
    }, 40);


    $('#donation-scroller span').on('mouseover', function(){
      stop = true;
    });

    $('#donation-scroller span').on('mouseout', function(){
      stop = false;
    });

    $('#donation-scroller span').on('click', function(){
      location.href = '/donations';
    });
  }
})();