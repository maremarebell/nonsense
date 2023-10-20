<?php
  // Creation of apply button href link based on campaignId and cellNumber
  $apply_href = '';
  $apply_base = 'https://qa01-www.barclaycardus.com/apply/Landing.action?campaignId=';

  $location = (isset($_GET['location']) ? $_GET['location'] : null);
  $location= htmlentities(filter_var($location, FILTER_SANITIZE_STRING));
  
	$cid_val = htmlspecialchars(urldecode($_GET['campaignId']), ENT_QUOTES, 'UTF-8');
	$cid_val= htmlentities(filter_var($cid_val, FILTER_VALIDATE_INT));
	$cid_val=trim(preg_replace('/ +/', ' ', preg_replace('/[^0-9 ]/', ' ', urldecode(html_entity_decode(strip_tags($cid_val))))));
	
	$cell_val = htmlspecialchars(urldecode($_GET['cellNumber']), ENT_QUOTES, 'UTF-8'); 
	$cell_val= htmlentities(filter_var($cell_val, FILTER_VALIDATE_INT));
	$cell_val=trim(preg_replace('/ +/', ' ', preg_replace('/[^0-9 ]/', ' ', urldecode(html_entity_decode(strip_tags($cell_val))))));
	
	$refid_val = htmlspecialchars(urldecode($_GET['referrerid']), ENT_QUOTES, 'UTF-8');
	$refid_val= htmlentities(filter_var($refid_val, FILTER_SANITIZE_STRING));
	$refid_val=trim(preg_replace('/ +/', ' ', preg_replace('/[^A-Za-z0-9 ]/', ' ', urldecode(html_entity_decode(strip_tags($refid_val))))));
  
  $browserIp_val = htmlspecialchars(urldecode($_GET['mboxOverride_browserIp']), ENT_QUOTES, 'UTF-8');
  $browserIp_val= htmlentities(filter_var($browserIp_val, FILTER_SANITIZE_STRING));     

  if ( $location =='hawaii' ) {

    if ( $cid_val=='2037') {
      switch ( $cell_val ) {
        case 12:
          $apply_href = $apply_base . $cid_val . '&cellNumber=13&prodidreq=CCMMX63791&referrerid=' . $refid_val;
          break;
        case 18:
          $apply_href = $apply_base . $cid_val . '&cellNumber=19&prodidreq=CCMMX63804&referrerid=' . $refid_val;
          break;
        case 26:
          $apply_href = $apply_base . $cid_val . '&cellNumber=27&prodidreq=CCMMX63804&referrerid=' . $refid_val;
          break;
        case 29:
          $apply_href = $apply_base . $cid_val . '&cellNumber=30&prodidreq=CCMMX63804&referrerid=' . $refid_val;
          break;
        case 35:
          $apply_href = $apply_base . $cid_val . '&cellNumber=36&prodidreq=CCMMX63804&referrerid=' . $refid_val;
          break;
        case 32:
          $apply_href = $apply_base . $cid_val . '&cellNumber=33&prodidreq=CCMMX63804&referrerid=' . $refid_val;
          break;
        case 7:
          $apply_href = $apply_base . $cid_val . '&cellNumber=8&prodidreq=CCMMX63781&referrerid=' . $refid_val;
          break;
        case 9:
          $apply_href = $apply_base . $cid_val . '&cellNumber=10&prodidreq=CCMMX63781&referrerid=' . $refid_val;
          break;
        case 49:
          $apply_href = $apply_base . $cid_val . '&cellNumber=50&prodidreq=CCMMX63791&referrerid=' . $refid_val;
          break;
        case 42:
          $apply_href = $apply_base . $cid_val . '&cellNumber=43&prodidreq=CCMMX63804&referrerid=' . $refid_val;
          break;
        case 45:
          $apply_href = $apply_base . $cid_val . '&cellNumber=46&prodidreq=CCMMX63804&referrerid=' . $refid_val;
          break;
		case 38:
          $apply_href = $apply_base . $cid_val . '&cellNumber=39&prodidreq=CCMMX63850&referrerid=' . $refid_val;
          break;
		case 40:
          $apply_href = $apply_base . $cid_val . '&cellNumber=41&prodidreq=CCMMX63850&referrerid=' . $refid_val;
          break;
		case 55:
          $apply_href = $apply_base . $cid_val . '&cellNumber=56&prodidreq=CCMMX63804&referrerid=' . $refid_val;
          break;
		default:
          $apply_href = $apply_base . $cid_val . '&cellNumber=' . ( $cell_val + 1 ) .'&prodidreq=CCMMX58464&referrerid=' . $refid_val;
      }
    }

    else {
      $apply_href = $apply_base . $cid_val . '&cellNumber=' . ( $cell_val + 1 ) .'&prodidreq=CCMMX58464&referrerid=' . $refid_val;
    }

  } // end of location if statement

  // for non hawaii users
  else {

    if ( $cid_val=='2036') {
      switch ( $cell_val ) {
        case 4:
          $apply_href = $apply_base . $cid_val . '&cellNumber=31&prodidreq=CCMMX61162&referrerid=' . $refid_val;
          break;
        case 8:
          $apply_href = $apply_base . $cid_val . '&cellNumber=9&prodidreq=CCMMX61172&referrerid=' . $refid_val;
          break;
        case 16:
          $apply_href = $apply_base . $cid_val . '&cellNumber=17&prodidreq=CCMMX61172&referrerid=' . $refid_val;
          break;
        case 22:
          $apply_href = $apply_base . $cid_val . '&cellNumber=23&prodidreq=CCMMX61172&referrerid=' . $refid_val;
          break;
        case 28:
          $apply_href = $apply_base . $cid_val . '&cellNumber=29&prodidreq=CCMMX61172&referrerid=' . $refid_val;
          break;
        case 25:
          $apply_href = $apply_base . $cid_val . '&cellNumber=26&prodidreq=CCMMX61172&referrerid=' . $refid_val;
          break;
		case 19:
          $apply_href = $apply_base . $cid_val . '&cellNumber=20&prodidreq=CCMMX61172&referrerid=' . $refid_val;
          break;
		case 40:
          $apply_href = $apply_base . $cid_val . '&cellNumber=41&prodidreq=CCMMX61172&referrerid=' . $refid_val;
          break;
        default:
          $apply_href = $apply_base . $cid_val . '&cellNumber=' . ( $cell_val + 1 ) . '&prodidreq=CCMMX58450&referrerid=' . $refid_val;
      }
    }

    elseif ( $cid_val=='1930' ) {
      switch ( $cell_val ) {
        case 4:
          $apply_href = $apply_base . $cid_val . '&cellNumber=5&prodidreq=CBMMB58224&referrerid=' . $refid_val;
          break;
        case 6:
          $apply_href = $apply_base . $cid_val . '&cellNumber=7&prodidreq=CBMMB58224&referrerid=' . $refid_val;
          break;
        case 8:
          $apply_href = $apply_base . $cid_val . '&cellNumber=9&prodidreq=CBMMB58344&referrerid=' . $refid_val;
          break;
        case 10:
          $apply_href = $apply_base . $cid_val . '&cellNumber=17&prodidreq=CBMMB58344&referrerid=' . $refid_val;
          break;
        case 11:
          $apply_href = $apply_base . $cid_val . '&cellNumber=12&prodidreq=CBMMB58224&referrerid=' . $refid_val;
          break;
        case 16:
          $apply_href = $apply_base . $cid_val . '&cellNumber=18&prodidreq=CBMMB58350&referrerid=' . $refid_val;
          break;
        case 19:
          $apply_href = $apply_base . $cid_val . '&cellNumber=20&prodidreq=CBMMB58224&referrerid=' . $refid_val;
          break;
        default:
          $apply_href = $apply_base . $cid_val . '&cellNumber=' . ( $cell_val + 1 ) . '&prodidreq=CCMMX58450&referrerid=' . $refid_val;
      }
    }

    else {
      $apply_href = $apply_base . $cid_val . '&cellNumber=' . ( $cell_val + 1 ) . '&prodidreq=CCMMX58450&referrerid=' . $refid_val;
    }
  }
?>

<!--<a class="apply btn-apply-secure" href="<?php // echo $apply_href; ?>">
  <strong>Apply today</strong>
  <small>
    Get a decision in seconds
  </small>
</a>
-->