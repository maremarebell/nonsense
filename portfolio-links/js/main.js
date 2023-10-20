var MB;

$(function() {
  MB.init();
});

window.MB = window.MB || {};

MB = {
  desiredHeroHeightPercentage: 0.6,

  init: function() {
    this.bindEventHandlers();
  },

  bindEventHandlers: function() {

    MB.createBackToTop();
    MB.wireSmoothScroll();
    MB.loadHeroImage( MB.wireFixedMenu );

    $('body').scrollspy({
      target: '#nav-main',
      offset: 50
    });

    $( window ).resize( function() {
      MB.heroImageResize();
    });
  },

  wireSmoothScroll: function() {
    $('a[href*=#]:not([href=#])').click( function() {
      if ( location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname ) {
        var navOffset = $('nav').outerHeight();
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - navOffset
          }, 1000);
          return false;
        }
      }
    });
  },

  wireFixedMenu: function( heroHeight ) {
    var nav = $('nav');
    var navHeight = nav.outerHeight();
    var headerHeight = ( typeof heroHeight !== 'undefined' ) ? heroHeight : $('.jumbotron').outerHeight();

    // On load, fix or unfix menu
    if ( $(this).scrollTop() > headerHeight ) {
      nav.addClass( 'menu-fixed' );
      $('main .container-fluid').css( 'padding-top', navHeight );
    } else {
      nav.removeClass( 'menu-fixed' );
      $('main .container-fluid').css( 'padding-top', '0' );
    }

    // On scroll, fix or unfix menu
    $(window).scroll(function() {
      if ( $(this).scrollTop() > headerHeight ) {
        nav.addClass( 'menu-fixed' );
        $('main .container-fluid').css( 'padding-top', navHeight );
      } else {
        nav.removeClass( 'menu-fixed' );
        $('main .container-fluid').css( 'padding-top', '0' );
      }
    });
  },

  heroImageResize: function() {
    var hero = $('.jumbotron');
    var imageWidth = 2560;
    var imageHeight = 1790;
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var newHeight = windowHeight * MB.desiredHeroHeightPercentage;
    var heroProportion = windowWidth / newHeight;
    var imageProportion = imageWidth / imageHeight;
    var bgSize = '100% auto';
    var bgPos;

    if ( heroProportion > imageProportion ) {
      // Hotdog
      var difference = ( (heroProportion - imageProportion) * 100 );
      difference = parseInt( Math.abs( difference ) );
      bgSize = '100% auto';
      bgPos = '0px -' + difference + 'px';
    } else {
      // Hamburger
      bgSize = parseInt( newHeight * imageProportion ) + 'px ' + newHeight + 'px';
      bgPos = 'top center';
    }

    MB.changeBgSize( bgSize, bgPos );
  },

  changeBgSize: function( bgSize, bgPos ) {
    var hero = $('.jumbotron');

    hero.css({
      'background-size': bgSize,
      'background-position': bgPos
    });
  },

  loadHeroImage: function( callback ) {
    var hero = $('.jumbotron');
    var windowHeight = window.innerHeight;
    var imageSrc = hero.attr( 'data-background-image' );
    var newHeight = windowHeight * MB.desiredHeroHeightPercentage;

    // Show on load
    $('.jumbotron img').attr( 'src', imageSrc ).load( function() {
      $(this).remove();

      hero.css({
        'background-image': 'url(' + imageSrc + ')'
      });

      MB.heroImageResize();

      hero.animate({
        height: newHeight
      }, 1000 );

      if (typeof callback === 'function') {
        callback(newHeight);
      }
    });
  },

  createBackToTop: function() {
    var toTopButton = '<div class="to-top" style="display: none;"><i class="fa fa-arrow-up"></i></div>';

    $('body').append( toTopButton );

    // Scroll body to 0px on click
    $('.to-top').on( 'click', function() {
      $('body, html').animate({
        scrollTop: '0'
      }, 600);
      return false;
    });

    // Show 100px down
    $(window).on( 'scroll', function( ) {
      if ( $( this ).scrollTop( ) > 100 ) {
        $('.to-top').fadeIn();
      } else {
        $('.to-top').fadeOut();
      }
    });
  }
};
