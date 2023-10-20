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
    if ( $(window).width() < 991 ) {
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

    if ( $(window).width() > 991 ) {
      $( window ).scroll(function() {
        if ($('body,html').scrollTop() === 0 ) {
          $('.navbar.navbar-default').css('background-color' , 'rgba(255, 255, 255, .8)');
        } else {
          $('.navbar.navbar-default').css('background-color' , 'rgba(255, 255, 255, 1)');
        }
      });
    }

    var userLocation = HA.getQueryVariable('location');

    // HAWAII VS MAINLAND
    if (userLocation == 'hawaii') {
      $('body').addClass('in-hawaii');
      $('.for-hawaiis').show();
      $('.for-mainlanders').hide();
    } else {
      $('body').addClass('in-mainland');
      $('.for-hawaiis').hide();
      $('.for-mainlanders').show();
    }

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
  },

  getQueryVariable: function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
    }
    return(false);
  }
};
