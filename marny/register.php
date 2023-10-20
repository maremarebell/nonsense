<?php

include_once("includes/globalFunctions.php");

session_start();
if ( isset($_SESSION['userId'] ) ) {
    goHome();
}

include_once("includes/beginPage.php");
?>
<script type="text/javascript">




/*
// No reason to re-invent the wheel --

// Email Validation Javascript
// copyright 23rd March 2003, by Stephen Chapman, Felgall Pty Ltd
// http://javascript.about.com/library/blemailb.htm
     */
    function validateEmail(addr,man,db) {
        if (addr == '' && man) {
            if (db) alert('email address is mandatory');
            return false;
        }
        if (addr == '') return true;
        var invalidChars = '\/\'\\ ";:?!()[]\{\}^|';
        for (i=0; i<invalidChars.length; i++) {
            if (addr.indexOf(invalidChars.charAt(i),0) > -1) {
                if (db) alert('email address contains invalid characters');
                return false;
            }
        }
        for (i=0; i<addr.length; i++) {
            if (addr.charCodeAt(i)>127) {
                if (db) alert("email address contains non ascii characters.");
                return false;
            }
        }

        var atPos = addr.indexOf('@',0);
        if (atPos == -1) {
            if (db) alert('email address must contain an @');
            return false;
        }
        if (atPos == 0) {
            if (db) alert('email address must not start with @');
            return false;
        }
        if (addr.indexOf('@', atPos + 1) > - 1) {
            if (db) alert('email address must contain only one @');
            return false;
        }
        if (addr.indexOf('.', atPos) == -1) {
            if (db) alert('email address must contain a period in the domain name');
            return false;
        }
        if (addr.indexOf('@.',0) != -1) {
            if (db) alert('period must not immediately follow @ in email address');
            return false;
        }
        if (addr.indexOf('.@',0) != -1){
            if (db) alert('period must not immediately precede @ in email address');
            return false;
        }
        if (addr.indexOf('..',0) != -1) {
            if (db) alert('two periods must not be adjacent in email address');
            return false;
        }
        var suffix = addr.substring(addr.lastIndexOf('.')+1);
        if (suffix.length != 2 && suffix != 'com' && suffix != 'net' && suffix != 'org' && suffix != 'edu' && suffix != 'int' && suffix != 'mil' && suffix != 'gov' & suffix != 'arpa' && suffix != 'biz' && suffix != 'aero' && suffix != 'name' && suffix != 'coop' && suffix != 'info' && suffix != 'pro' && suffix != 'museum') {
            if (db) alert('invalid primary domain in email address');
            return false;
        }
        return true;
    }




    function validate() {
        if ( !check('username') ) { return false; }
        if ( !check('emailAddress') ) { return false; }

        var emailAddress = document.getElementById('emailAddress').value;


        if (!validateEmail(emailAddress,1,0)) {
            alert('The email address entered was invalid.');
            document.getElementById('emailAddress').focus();
            return false;
        }



        if ( !check('password') ) { return false; }
        if ( !check('recaptcha_response_field') ) { return false; }

        if ( document.getElementById('agreeToTerms').checked == false ) {
            alert ( "You must agree to the Terms and Conditions in order to register for an account." );
            document.getElementById('agreeToTerms').focus();
            return false;
        }
        return true;
    }
</script>
<div id="register">
    <h1> Add a New User </h1>
    <form action="registerProcessing.php" method="POST" onsubmit="return validate();">
        <label for="username"> Username: </label><input type="text" name="username" id="username" /> <br />
        <label for="emailAddress"> Email: </label><input type="text" name="emailAddress" id="emailAddress" /> <br />
        <label for="password"> Password: </label><input type="password" name="password" id="password" /> <br />

        <br/>


        <?php

        require_once('includes/recaptcha/recaptchalib.php');

// Get a key from http://recaptcha.net/api/getkey
        $publickey = "6LfxngYAAAAAAKtl4FxI0e1IHvlJ7PtspC_SyBUT";
        $error = null;
        echo recaptcha_get_html($publickey, $error);
        ?>

        <br />

        <input type="checkbox" name="agreeToTerms" id="agreeToTerms" value="unchecked">
        <span class="longLabel">I agree to all of the <a href="termsAndConditions.php">Terms and Conditions</a>.</span> <br />

        <br />
        <input type="submit" name="submit" id="submit" value="Submit" />
    </form>
</div>
<?php include_once("includes/endPage.php"); ?>