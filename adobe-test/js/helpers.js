window.AT = window.AT || {};

AT = {

    bindEventHandlers: function(){
        AT.deSVG();
        AT.wireNoGos();
    },

    deSVG: function() {
      $('.img-svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

      });
    },

    wireNoGos: function() {
        $('.no-go').on('click', function( e ) {
          e.preventDefault();
          alert('Try a different button!');
        });
    },

    truncateCopy: function( text ) {

        var characterLimit = 35;

        // If the name is long,
        if (text.length > 35 ) {

            // Truncate it at limit
            text = text.substring( 0, characterLimit );

            // Add an ellipses
            text = text + '...';
        }

        return text;
    },

    wireAccordion: function() {

        $('.item-gallery').each( function(){
            var item = $(this);
            $(this).find('h2').prepend('<button href="" class="trigger-accordion btn btn-tiny">-</button> ');
        });

        $('.trigger-accordion').on('click', function( e ){
            e.preventDefault();

            var gallery = $(this).parent().parent().parent().find('.list-gallery');

            if ( gallery.hasClass('list-expanded') ) {
                $(this).html('+');
                gallery.removeClass('list-expanded').addClass('list-contracted');
                gallery.slideUp();
            } else {
                $(this).html('-');
                gallery.removeClass('list-contracted').addClass('list-expanded');
                gallery.slideDown();
            }
        });
    }
};