$(document).ready(function() {
 	
 	/* tab function for company-people page */
	function tabbinIt(tabs){
		tabs.each(function(index){
			$(this).bind('click', function(){
				$(".biotxt").hide();
				$("#bio-"+index).slideDown();
			});
		});
	}; 
	if ($('body').hasClass('company-people')){
		tabbinIt($('#tab-0, #tab-1, #tab-2, #tab-3'));
	}
	
	
	// work model cycle
	if ($('body').hasClass('company-workmodel')){
		$('.slideshow').cycle({
			fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
			pager:  '#workmodel',
			speed: 600,
			timeout: 2000
		});
	}
	
	// starts animation on intro page
	if ($('body').hasClass('intro')){
		animateIntro();
	}
	
});
	
// INTRO ANIMATION
function animateIntro(){

  	var timer = 0;
 
 	/* grows images in and then fades them out */
  	function growInFadeOut(image, animate, fade){
  		var fullsize = {width: '780px', height: '520px', top: '0px', left: '0px'};
  		image.delay(timer).animate(fullsize, animate).fadeOut(fade);
  		timer= timer + animate + fade;
  		return timer;
  	}
  	
  	/* grows images in and then flys them out */
  	function growInFlyOut(image, animatetime, outtime){
  		var fullsize = {width: '780px', height: '520px', top: '0px', left: '0px'};
  		var outposition = {top: '0px', left: '8000px'};
  		image.delay(timer).animate(fullsize, animatetime).animate(outposition, outtime);
  		timer= timer + animatetime + outtime;
  		return timer;
  	}
  	
  	/* changes color to white */
  	function toWhite(group){
  		group.each(function() {
    		$(this).css('background-color', '#fff');
  		});
  	};
  	
  	/* stuff that happens after the images come in and out */
  	function afterImages(){
  		var peephole=$('#peephole');
  		toWhite($('#panorama, #header'));
  		peephole.show();
  		$('#peeplink').bind('click', function() {
  			peephole.hide();
  			$('#logod').show();
  		});
  	};
  	
	
	/* fade to theater style */
  	$('#headercover, #panoramacover').fadeTo(1400, 0);
	timer+= 1400;

	/* brings in first images */
	growInFadeOut($('.bigbang'), 2000, 2000);
	growInFlyOut($('.planet'), 1400, 2000);
	growInFlyOut($('.humans'), 1200, 1000);
	growInFlyOut($('.stones'), 1000, 800);
	growInFadeOut($('.nyc'), 800, 600);
	growInFadeOut($('.www'), 600, 400);
	
	/*brings in keyhole w/ clickability */
	var keyholetimer = window.setTimeout(afterImages, timer);	
	
};





  