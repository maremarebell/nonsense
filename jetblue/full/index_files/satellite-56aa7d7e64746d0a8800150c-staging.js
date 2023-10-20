_satellite.pushAsyncScript(function(event, target, $variables){
  /* KRUX */
window.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);
  (function(){
    var k=document.createElement('script');k.type='text/javascript';k.async=true;
    var m,src=(m=location.href.match(/\bkxsrc=([^&]+)/))&&decodeURIComponent(m[1]);
    k.src = /^https?:\/\/([a-z0-9_\-\.]+\.)?krxd\.net(:\d{1,5})?\//i.test(src) ? src : src === "disable" ? "" :
      (location.protocol==="https:"?"https:":"http:")+"//cdn.krxd.net/controltag?confid=KS56sWYR";
    var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(k,s);
}());

/* Google Search remarketing*/
_satellite.setVar("google_conversion_id", "933821389");
_satellite.setVar("google_conversion_format", "");
_satellite.setVar("gdn_conversion_label", "");
_satellite.setVar("google_remarketing_only", "true");

/*BING*/
(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"5103746"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");
});
