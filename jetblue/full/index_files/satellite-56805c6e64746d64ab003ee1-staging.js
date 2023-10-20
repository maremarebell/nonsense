_satellite.pushAsyncScript(function(event, target, $variables){
  var doubleclick_helper_main = function() {
  if(_satellite.getVar("doubleclick_report_suite_id") !== null) {
    var axel = Math.random() + "";
    var a = axel * 10000000000000;
    var dtmSrc = window.location.protocol + '//' + _satellite.getVar("doubleclick_report_suite_id") + '.fls.doubleclick.net/activityi;src=' + _satellite.getVar("doubleclick_report_suite_id") + ';type=' + _satellite.getVar("doubleclick_type_value") + ';cat=' + _satellite.getVar("doubleclick_cat_value") + ';u2=' + _satellite.getVar("campaign_id") + ';u3=' + _satellite.getVar("campaign_cell") + ';u4=' + _satellite.getVar("partner_code") + ';u5=' + _satellite.getVar("app_decision") + _satellite.getVar("doubleclick_custom_values") + ';ord=' + a + '?';
    var analyticsScriptIframe = document.createElement('iframe');
    
    analyticsScriptIframe.src = dtmSrc;
    analyticsScriptIframe.width = "1";
    analyticsScriptIframe.height = "1";
    analyticsScriptIframe.frameborder = "0";
    analyticsScriptIframe.style.display = "none";
    
    document.body.appendChild(analyticsScriptIframe); 
  }
};

try {
    if(addLoadEvent !== undefined) {
      addLoadEvent(doubleclick_helper_main);
    } else {
      window.onload = doubleclick_helper_main;
    }
}
catch(err) {
    window.onload = doubleclick_helper_main;
}
});
