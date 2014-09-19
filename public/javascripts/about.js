(function() {
    if (location.pathname == '/about'){
        var showProperTab = function() {
            var hash = location.hash;
            if (hash === "")
                location.hash = '#introduction';
            else if (hash == "#introduction" || hash == "#project" || hash == "#structure" || hash == "#contacts") {
                $('#about-content .tab-pane.active').removeClass('active');
                $('#about-content ' + location.hash).addClass('active');
                $('#about-nav li').removeClass('active');
                $('#about-nav a[href=' + location.hash + ']').parent().addClass('active');
            } else {
                $('#about-content .tab-pane.active').removeClass('active');
                $('#about-content ' + location.hash).addClass('active');
                $('#about-nav li').removeClass('active');
                $('#about-nav a[href=' + '#project'+']').parent().addClass('active');
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
