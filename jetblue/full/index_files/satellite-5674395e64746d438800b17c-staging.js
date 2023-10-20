_satellite.pushAsyncScript(function(event, target, $variables){
  var google_helper_main = function() {
    window.google_trackConversion({
      google_conversion_id : _satellite.getVar("google_conversion_id"),
      google_conversion_language : "en",
      google_conversion_format : _satellite.getVar("google_conversion_format"),
      google_conversion_color : "ffffff",
      google_conversion_label : _satellite.getVar("google_conversion_label"),
      google_remarketing_only : _satellite.getVar("google_remarketing_only"),
  	});
};

function gdn_helper_callback() {
  try {
    if(addLoadEvent !== undefined) {
      addLoadEvent(google_helper_main);
    } else {
      window.onload = google_helper_main;
    }
  } catch(err) {
    window.onload = google_helper_main;
  }
};

/* load the conversion_async script first and when ready do the callback function above */
var analyticsGoogleCode = document.createElement("script");
analyticsGoogleCode.type = "text/javascript";
analyticsGoogleCode.onreadystatechange= function () {
      if (this.readyState == 'complete') gdn_helper_callback();
   }
analyticsGoogleCode.onload= gdn_helper_callback;
analyticsGoogleCode.src = "//www.googleadservices.com/pagead/conversion_async.js";
document.body.appendChild(analyticsGoogleCode);
});
