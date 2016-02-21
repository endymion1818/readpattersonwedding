$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 1) {
        $(".navigation").addClass("scrolled");
    } else {
        $(".navigation").removeClass("scrolled");
    }
});