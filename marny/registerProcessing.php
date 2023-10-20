<?php
session_start();
include_once("includes/globalFunctions.php");


// from http://webforumz.com/php/8394-php-forgot-password-script.htm
function generatePassword() {
    $pass = "";
    for ($i=1; $i<=20; $i++) {
        $goUpper = (rand(0,1) == 1);
        $char = chr(rand(97, 122));
        if ($goUpper){
            $char = strtoupper($char);
        }
        $pass .= $char;
   }
   return $pass;
}


extract($_POST);
if ( isset($username) ) {

    require_once('includes/recaptcha/recaptchalib.php');
    
    $privatekey = "6LfxngYAAAAAAEINrrsYkFp5WQyeXMZMGQgdN5dd";

    # the response from reCAPTCHA
    $resp = null;
    # the error code from reCAPTCHA, if any
    $error = null;

    # was there a reCAPTCHA response?
    if ($_POST["recaptcha_response_field"]) {
        $resp = recaptcha_check_answer ($privatekey,
                                        $_SERVER["REMOTE_ADDR"],
                                        $_POST["recaptcha_challenge_field"],
                                        $_POST["recaptcha_response_field"]);

        if ($resp->is_valid) {
                // wonderful!  They're not a bot!  continue on!
        } else {
            $_SESSION['error'] = "You sort of came off as a robot there...";
            goBack();
        }
    } else {
        $_SESSION['error'] = "You must fill out the ReCAPTCHA field";
        goBack();
    }





	include_once("includes/databaseConnect.php");
    
    $query = " SELECT * FROM `Users` WHERE `username` = '$username'; ";
    $result = $mysql->query($query) or die( 'Error with the query: $query' );
    if ( $result->num_rows > 0) {
        $_SESSION['error'] = "Someone is already has that username ($username).";
        goBack();
    }
    
    $query = " SELECT * FROM `Users` WHERE `emailAddress` = '$emailAddress'; ";
    $result = $mysql->query($query) or die( 'Error with the query: $query' );
    if ( $result->num_rows > 0) {
        $_SESSION['error'] = "Someone already has that email address ($emailAddress).";
        goBack();
    }
    
    
    $verificationCode = generatePassword();
    
    
    $query = " INSERT INTO `Users` ( `username` , `emailAddress` , `password`, `verificationCode` )
				VALUES ( '$username' , '$emailAddress' , '" . md5($password) . "', '" . md5($verificationCode) . "'   ); ";
	
	$result = $mysql->query($query) or die('Error with the query:' . $query);
	
	$userId = $mysql->insert_id;
	
    
    $confirmUrl = "http://WhyAreYouMyManager.com/confirmAccount.php?userId=" . urlencode($userId) . "&verificationCode=" . urlencode($verificationCode);
    
    $to = null;
    $subject = "WhyAreYouMyManager Account Verification";
    $message = "Someone has attempted to create an account for this email address at WhyAreYouMyManager.com.\r\n\r\n"
             . "If it was not you who did this, please disregard this email.\r\n\r\n"
             . "In order to complete the registration, please visit " . $confirmUrl . " within 48 hours to confirm your account.\r\n\r\n"
             . "\r\nThank you,\r\n\r\n" 
             . "WhyAreYouMyManager.com";
             

    $headers = 'From: WhyAreYouMyManager <webmaster@WhyAreYouMyManager.com>' . "\r\n" .
        'Reply-To: no-reply@whyareyoumymanager.com' . "\r\n" .
        "To: {$username} <{$emailAddress}> \r\n";
        'X-Mailer: PHP/' . phpversion();

    if (  $_SERVER['SERVER_NAME'] == "localhost" ) {
	$_SESSION['success'] = "Successfully registered $username. $confirmUrl";
	goHome();

    } else {
	if ( mail($to, $subject, $message, $headers) ) {
	    //$_SESSION['userId'] = $userId;
	    //$_SESSION['username'] = $username;
	    $_SESSION['success'] = "Successfully registered $username.";
	    goHome();
	} else {
	    $_SESSION['error'] = "The mail server isn't correctly installed... oops...";
	    goHome();
	}
    }
}

?>