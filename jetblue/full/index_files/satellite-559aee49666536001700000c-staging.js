_satellite.pushAsyncScript(function(event, target, $variables){
  if(window.versaTag === undefined || window.versaTag === null) {
  window.versaTag = {};
}

window.versaTag.id = "2024";
window.versaTag.sync = 0;
window.versaTag.dispType = "js";
window.versaTag.ptcl = "HTTPS";
window.versaTag.bsUrl = "bs.serving-sys.com/BurstingPipe";
window.versaTag.activityParams = {"OrderID":"","Session":"","Value":"","productid":"","productinfo":"","Quantity":"","AppStatus":_satellite.getVar("page_status"),"CPC":_satellite.getVar("partner_code"),"campaignId":_satellite.getVar("campaign_id"),"Cell_ID":_satellite.getVar("campaign_cell"),"Application_ID":_satellite.getVar("confirmation_id")};
window.versaTag.retargetParams = {};
window.versaTag.dynamicRetargetParams = {};
window.versaTag.conditionalParams = {"AppStatus":_satellite.getVar("page_status"),"CPC":_satellite.getVar("partner_code"),"campaignId":_satellite.getVar("campaign_id"),"Cell_ID":_satellite.getVar("campaign_cell"),"Application_ID":_satellite.getVar("confirmation_id")};

var analyticsScript = document.createElement('script');
analyticsScript.type = 'text/javascript';
analyticsScript.async = true;
analyticsScript.id = "ebOneTagUrlId";
analyticsScript.onload = function()  {
  /* Execute callback function if available */
};
analyticsScript.src = 'https://secure-ds.serving-sys.com/SemiCachedScripts/ebOneTag.js';

document.body.appendChild(analyticsScript);
});
