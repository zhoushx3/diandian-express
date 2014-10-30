(function() {
    var pathname = location.pathname;
    if (pathname.indexOf('/background') > -1)
        $('a.hrefTracer[href=\"\/background\/'+pathname.split('/')[2]+'\"]').css('background-color', 'orange');
    else
        $('a.hrefTracer[href=\"\/'+pathname.split('/')[1]+'\"]').css('background-color', 'orange');
})();
