// JavaScript Document

$(document).ready(function(){
  var currentPosition = 0;
  var slideWidth2 = 950;
  var slides2 = $('.slide2');
  var numberOfSlides = slides2.length;

  // Remove scrollbar in JS
  $('#slidesContainer2').css('overflow', 'hidden');


  // Wrap all .slides with #slideInner2 div
  slides2
    .wrapAll('<div id="slideInner2"></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth2
    });

  // Set #slideInner2 width equal to total width of all slides
  $('#slideInner2').css('width', slideWidth2 * numberOfSlides);
//  $('#slideInner2').css('border', '1px solid #FF0000');

  // Insert controls in the DOM
  $('#slideshow2')
    //.prepend('<span class="control" id="leftControl"></span>')
    //.append('<span class="control" id="rightControl"></span>');

  // Hide left arrow control on first load
  manageControls(currentPosition);

// Create event listeners for .controls clicks
  $('.control')
    .bind('click', function(){
    
	// Determine new position
	currentPosition = ($(this).attr('id')=='rightControl') ? currentPosition+1 : currentPosition-1;
    
	// Hide / show controls
    manageControls(currentPosition);
	
    // Move slideInner using margin-left
    $('#slideInner2').animate({
      'marginLeft' : slideWidth2*(-currentPosition)
    });
  });
	
	// manageControls: Hides and Shows controls depending on currentPosition
  function manageControls(position){
    // Hide left arrow if position is first slide
	if(position==0){ $('#leftControl').hide() } else{ $('#leftControl').show() }
	// Hide right arrow if position is last slide
    if(position==numberOfSlides-1){ $('#rightControl').hide() } else{ $('#rightControl').show() }
  }
});