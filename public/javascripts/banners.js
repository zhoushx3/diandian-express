(function() {
  $.getJSON('background/loadimages?jsoncallback=?', function(data) {
    alert('3');
    for (var i = 0; i < 3; ++i) {
      alert('3');
      var banner = $("<img>").src("show" + data[i].imageName);
      banner.id = data[i].imageName;
      banner.style.zIndex = 1;
      $("#div-image").append(banner);
    }
  });
})();
