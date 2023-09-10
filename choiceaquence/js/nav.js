// JavaScript Document

/**************************************
 Ingalls Health System 
 Javascript - dropdown navigation
 ©2010 Method Engine, LLC
 www.methodengine.com
***************************************/
var navTimeout	= 500;
var navClosetimer = 0;
var navDDmenuitem = 0;

// open hidden layer
function mopen(tabId, id){	
	
	
	// cancel close timer
	mcancelclosetime();

	// close old layer
	if(navDDmenuitem) navDDmenuitem.style.visibility = 'hidden';
	// get new layer and show it
	if(id == "dd1" ){
	  navDDmenuitem = document.getElementById(id);
	  navDDmenuitem.style.visibility = 'visible';
	} else if(id == "dd2" ){
	  navDDmenuitem = document.getElementById(id);
	  navDDmenuitem.style.visibility = 'visible';
	}
}

function resetBkImgs(){
	
}

// close showed layer
function mclose(){
	resetBkImgs();
	if(navDDmenuitem) navDDmenuitem.style.visibility = 'hidden';
}

// go close timer
function mclosetime(){
	navClosetimer = window.setTimeout(mclose, navTimeout);
}

// cancel close timer
function mcancelclosetime(){
	if(navClosetimer)
	{
		window.clearTimeout(navClosetimer);
		navClosetimer = null;
	}
}

// close layer when click-out
document.onclick = mclose; 
