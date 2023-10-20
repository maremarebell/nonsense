$(function(){
    FMBC.init();
});

window.FMBC = window.FMBC || {};
FMBC = {

    init: function() {

        $('.carousel').slick({
          centerMode: true,
          centerPadding: '26%',
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '15%',
                slidesToShow: 1
              }
            }
          ]
        });

        //
        // ANIMATIONS
        //

        // 1) Fade in 3 cards
        $( '.card__img' ).animate({
          opacity: 1
        }, 2000, function() {

          if ( $( '.slick-prev' ).length > 0 ) {
            // 2) Fade in arrows
            $( '.slick-prev, .slick-next' ).animate({
              opacity: 1
            }, 1000, function() {

              // 3) Fade in learn more and CTA
              $( '.card__details' ).animate({
                opacity: 1
              }, 1000 );
            });



          } else {
            // 3) Fade in learn more and CTA
            $( '.card__details' ).animate({
              opacity: 1
            }, 1000 );
          }
        });


        // On load, fill in "loader" line for 4 seconds
        $( '.loader__bar' ).animate({
          width: '100%'
        }, 4000 );


        //
        // PAUSE AUTOPLAY
        //

        // Stop autoplay on scroll
        $( window ).scroll( function() {
          $( '.carousel' ).slick( 'slickPause' );
        });

        // Stop autplay on hover
        $( '.carousel' ).hover(
          function() {
            $( '.carousel' ).slick( 'slickPause' );
          }, function() {}
        );

        //
        // HOOK UP FILTERS & HEADERS
        //

        // On after slide change
        $('.carousel').on('afterChange', function(event, slick, currentSlide, nextSlide) {

          $('.navsec__item').removeClass('navsec__item--selected');
          $('.bg').removeClass('bg--cash bg--plus bg--ring');

          switch ( currentSlide ) {
            case 0: // CASH
                $('.navsec__item--cash').addClass('navsec__item--selected');
                $('.bg').addClass('bg--cash');
                $('.jumbo__header').removeClass('jumbo__header--ring');
                $('.nav__logoimg').attr('src' , 'images/logo-barclaycard.png');
                $('.nav__link').removeClass('nav__link--dark');
                break;
            case 1: // PLUS
                $('.navsec__item--plus').addClass('navsec__item--selected');
                $('.bg').addClass('bg--plus');
                $('.jumbo__header').removeClass('jumbo__header--ring');
                $('.nav__logoimg').attr('src' , 'images/logo-barclaycard.png');
                $('.nav__link').removeClass('nav__link--dark');
                break;
            case 2: // RING
                $('.navsec__item--ring').addClass('navsec__item--selected');
                $('.bg').addClass('bg--ring');
                $('.jumbo__header').addClass('jumbo__header--ring');
                $('.nav__logoimg').attr('src' , 'images/logo-barclaycard-dark.png');
                $('.nav__link').addClass('nav__link--dark');
                break;
          }
          
        });


        //
        // FIX SECONDARY NAV
        //

        var scrollStuff = function() {
          var navPos = $('.loader').offset().top;
          var navHeight = $('.navsec').outerHeight();
          navHeight = navHeight - 3; // account for border

          if ( $(window).scrollTop() > navPos) {
            $('.navsec').addClass('navsec--fixed');
            $('.js-card-sections').css('margin-top', navHeight + 'px');
          } else {
            $('.navsec').removeClass('navsec--fixed');
            $('.js-card-sections').css('margin-top', '0');
          }
        };

        window.addEventListener('scroll', scrollStuff);



    },

    bindEventHandlers: function() {
        // bind handlers
    },

    aFunction: function( data ) {
        // function stuff goes here
    }
}