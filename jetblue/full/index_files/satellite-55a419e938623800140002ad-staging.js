_satellite.pushAsyncScript(function(event, target, $variables){
      var lbTrans = '[TRANSACTION ID]';
    var lbValue = '[TRANSACTION VALUE]';

    if(window.lbData === undefined || window.lbData === null) {
        window.lbData = _satellite.getVar('partner_code');
    }
    window.clientID = '3720';
    window.migID = '3720';

    var lb_rn = new String(Math.random()); var lb_rns = lb_rn.substring(2, 12);
    var boltProtocol = 'https://';

    try {
        var newScript = document.createElement('script');
        var scriptElement = document.getElementsByTagName('script')[0];
        newScript.type = 'text/javascript';
        newScript.id = 'lightning_bolt_' + lb_rns;
        newScript.src = boltProtocol + encodeURI('b3.mookie1.com/2/LB/' + lb_rns + '@x96?');
        document.body.appendChild(newScript);
        scriptElement = null; newScript = null;
    } catch (e) {}
});
