$( function() {
  JB.init();
});

window.JB = window.JB || {};

JB = {

  init: function() {
    this.bindEventHandlers();
  },

  bindEventHandlers:function(){

    // ON LOAD
    // Bind the toggle click if it's a small screen
    // Close on click of jumplink
    if ( window.innerWidth < 768 ) {
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

    $(window).on( 'scroll', function () {
      // DESKTOP SCROLL FUNCTIONALITY
      // if ( $(window).width() > 768 ) {
        if ( $(this).scrollTop() > 350 ) {
          $('.navbar.navbar-default').removeClass('not-scrolled').addClass('scrolled');
          
          // If menu is open, close
          if ( $('.navbar-collapse').hasClass('in') ) {
            $('.navbar-toggle').click();
          }
            
        } else {
          $('.navbar.navbar-default').removeClass('scrolled').addClass('not-scrolled');
        }
      // }
    });

    $(document).click(function (event) {
      var clickover = $(event.target);
      var _opened = $(".navbar-collapse").hasClass("navbar-collapse pull-right collapse in");
      if (_opened === true && !clickover.hasClass("navbar-toggle")) {
          $("button.navbar-toggle").click();
      }
    });

    $('.faqslink').fancybox({
      transitionIn: 'fade',
      transitionOut: 'fade',
      autoSize: false,
      width: '90%',
      maxWidth: '920px',
      height: 'auto',
      type: 'ajax',
      scrolling: 'visible',
      padding: 0,
      autoResize: true,
      margin: [20,0,20,0],
      topRatio: 0.2
    });


    $('.tcslink').fancybox({
      transitionIn: 'fade',
      transitionOut: 'fade',
      autoSize: false,
      width: '90%',
      maxWidth: '920px',
      height: '500px',
      scrolling: 'visible',
      padding: 0,
      autoResize: true,
      margin: [20,0,20,0],
      topRatio: 0.2
    });


    ////////////////////////////
    /////////// THE ////////////
    /////////// LINE ///////////
    ////////////////////////////

    $(window).on('beforeunload', function() {
        $(window).scrollTop(0); 
    });

    // Load images
    JB.switchImages( function (){
      $('#hero').imagesLoaded( function() {

        // images have loaded, fade them in
        $('#hero').find('img').fadeIn();

        //////////////////
        // ON LOAD      //
        //////////////////
        if ( window.innerWidth >= 768 ) {
          //////// DESKTOP ////////
          JB.centerBenes();
          JB.doDesktopLineThings();
        } else {
          //////// MOBILE ////////
          JB.centerBenesforMobile();
          JB.doMobileLineThings();
        }

        //////////////////
        // ON RESIZE    //
        //////////////////
        $( window ).resize(function() {

          // Switch image based on mobile or not
          JB.switchImages();

          if ( window.innerWidth >= 768 ) {
            //////// DESKTOP ////////
            setTimeout(function(){
              JB.centerBenes();
              JB.doDesktopLineThings();
            }, 1000);
            
          } else {
            //////// MOBILE ////////
            setTimeout(function(){
              JB.centerBenesforMobile();
              JB.doMobileLineThings();
            }, 1000);
          }
        });
      });
    });
  },

  doDesktopLineThings: function() {
    $('.theline').css('top','304px');

    var pageHeight = $( document ).height();
    var marginTop = parseInt( $('.theline').css('top') );
    var footerHeight = $('.page-footer').outerHeight();
    var lineHeight= pageHeight - marginTop - footerHeight;
            
    // Set line height
    $('.theline').css('height', lineHeight );
    $('.fill-casing').css('height', lineHeight );

    $('.theline').fadeIn();

    JB.animateLine();

    window.addEventListener('scroll', JB.animateLine );
  },

  doMobileLineThings: function() {
    var topMargin = $('#hero').outerHeight();
    var pageHeight = $( document ).height();
    var footerHeight = $('.page-footer').outerHeight();
    var lineHeight= pageHeight - topMargin - footerHeight;
            
    // Set line height and position
    $('.theline').css('height', lineHeight );
    $('.fill-casing').css('height', lineHeight );

    $('.theline').css('top', topMargin)

    // Fade it in
    $('.theline').fadeIn();

    // Bind the scroll handler
    window.addEventListener('scroll', JB.animateLine );
  },

  animateLine: function( loading ) {
    var fill = $('.fill');
    var pos = $(this).scrollTop();
    var pageHeight = $(document).height();

    if ( pos < 46 ) {
      $('.nubbin').css('height', + pos + 'px');
      fill.css('height', '0' );
    }

    // nubbin is full, deal w/ the line
    else if ( pos >= 46) {
      pos = pos - 46;

      var lineHeight = $('.theline').height();
      var scrollHeight = $(document).height() - $(window).height() - 46;

      var ratio = pos / scrollHeight;
      var fillHeight = lineHeight * ratio;

      // mobile pos faster
      if ( window.innerWidth < 768 ) {
        fillHeight = fillHeight + (fillHeight * .5);
      }

      $('.nubbin').css('height','54px');
      fill.css('height', fillHeight );
    }

    else {
      $('.nubbin').css('height','0');
    }

  },

  switchImages: function( callback ) {
    var images = $('#hero').find('img');

    images.each( function() {
      if ( window.innerWidth >= 768 ) {
        var src = $(this).attr('data-src-desktop');
        $(this).attr('src', src);
      } else {
        var src = $(this).attr('data-src-mobile');
        $(this).attr('src', src);
      }
    });

    if (callback)
      callback();
  },

  // Not currently in use
  debounce: function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  centerBenes: function(){
    $('.td-inner').each( function(){
      var benefit = $(this);
      var h3 = benefit.find('h3');
      var p = benefit.find('p');
      var h3Height = h3.outerHeight();
      var pHeight = p.outerHeight();
      var benefitHeight = benefit.outerHeight();

      pHeight = ( pHeight ) ? pHeight : 0;

      var remainingSpace = benefitHeight - ( h3Height + pHeight );
      var marginTop = (remainingSpace / 2);

      h3.css('padding-top',marginTop);
    });
  },

  centerBenesforMobile: function(){
    $('.td-inner').each( function(){
      var benefit = $(this);
      var h3 = benefit.find('h3');
      var p = benefit.find('p');
      var h3Height = h3.outerHeight();
      var pHeight = p.outerHeight();

      pHeight = ( pHeight ) ? pHeight : 0;

      var contentHeight = pHeight + h3Height;

      $(this).height = contentHeight;

      h3.css('padding-top', '0');
    });
  },

};
