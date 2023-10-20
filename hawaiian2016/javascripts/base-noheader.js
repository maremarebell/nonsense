$( function() {
  HA.init();
});

window.HA = window.HA || {};

HA = {

  init: function() {
    this.bindEventHandlers();
  },

  bindEventHandlers:function(){

    // ON LOAD
    // Bind the toggle click if it's a small screen
    // Close on click of jumplink
    if ( $(window).width() < 768 ) {
      $('.navbar.navbar-default ul.nav.navbar-nav > li > a').on('click', function() {
        $('.navbar-toggle').click();
      });
    }

    // Performs a smooth page scroll to an anchor on the same page.
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        var offset = target.offset().top;
        var navbarHeight = $('.navbar-header').height();
        offset = offset - navbarHeight; 

        if (target.length) {
          $('html,body').animate({
            scrollTop: offset
          }, 1000);
          return false;
        }
      }
    });

     HA.wireFancybox();

    // New CTA in menu functionality
    $(window).on('scroll', function ( ) {
      if ( $( this ).scrollTop( ) > 414 ) {
        $('.navbar.navbar-default').addClass('has-button');
      } else {
        $('.navbar.navbar-default').removeClass('has-button');
      }
    });

    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("navbar-collapse pull-right collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
        }
    });
  },

  wireFancybox: function( ) {
    $(".faqlink").fancybox({
      transitionIn: 'fade',
      transitionOut: 'fade',
      autoSize: false,
      width: '100%',
      maxWidth: '920px',
      height: 'auto',
      type: 'ajax',
      scrolling: 'visible',
      padding: 0,
      autoResize: true,
      margin: [20,0,20,0],
      topRatio: 0.2
    });

    $(".tcslink").fancybox({
      transitionIn: 'fade',
      transitionOut: 'fade',
      autoSize: false,
      width: '100%',
      maxWidth: '920px',
      height: '500px',
      scrolling: 'visible',
      padding: 0,
      autoResize: true,
      margin: [20,0,20,0],
      topRatio: 0.2
    });
  }
};
