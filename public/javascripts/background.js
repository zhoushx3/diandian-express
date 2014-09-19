(function() {
    if (location.pathname == '/background'){
        var showProperTab = function() {
            var hash = location.hash;
            if (hash === "")
                location.hash = '#donations';
            else {
                $('#background-content .tab-pane.active').removeClass('active');
                $('#background-content ' + location.hash).addClass('active');
                $('#backgroundNav li').removeClass('active');
                $('#backgroundNav a[href=' + location.hash + ']').parent().addClass('active');
            }
        };
        $(window).on('load', function() {
            showProperTab();
        });
        $(window).on('hashchange', function() { //forword, back
            showProperTab();
        });
    }
})();
