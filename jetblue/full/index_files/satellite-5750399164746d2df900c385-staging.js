_satellite.pushAsyncScript(function(event, target, $variables){
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
var card_t = 'No Fee'
if(data_layer.partner_code == "JBE") {
		card_t = 'Fee'
}
fbq('init', '759780814143568');
fbq('track', "PageView");
fbq('track', "jb_cc_lp_visit",{
card_type: card_t,
});
});
