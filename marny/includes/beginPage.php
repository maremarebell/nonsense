<?php 
if ( !isset($_SESSION) ) {
    session_start();
}
include_once("includes/globalFunctions.php");
include_once("includes/databaseConnect.php");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

    <head>
	<title>MarnyFarm</title>

        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<link rel="stylesheet" type="text/css" href="includes/main.css" />

        <!--[if IE]>
        <link rel="stylesheet" type="text/css" href="includes/ie.css" />
        <![endif]-->


        <link rel="shortcut icon" href="includes/images/favicon.ico" />

        <script type="text/javascript">
            function check(varname) {
                variable = document.getElementById(varname).value;
                if ( (variable == null) || (variable == undefined) || (variable == "") ) {
                    alert ( 'You must enter a ' + varname + '.' );
                    document.getElementById(varname).focus();
                    return false;
                }
                return true;
            }
        </script>
    </head>
    <body>
	<h1>Marny Farm!</h1>

	<?php
	if ( isset( $_SESSION['userId'] ) ) {
	    echo "Logged in as <a href='editProfile.php'>{$_SESSION['username']}</a>.
                                  <br/><a href='logOut.php' title='Log out of this account'>Log Out</a>
	    ";
	} else {
	    ?>
	<h1>SIGN IN</h1>
	<form action="login.php" method="POST">
	    <h2>E-mail:</h2><input type="text" name="username" />
	    <h2>Password: (<a href="resetPassword.php">forgot it?</a>)</h2><input type="password" name="password" />
	    <div id="submit_block"><input type="submit" value="LOGIN"></input>(<a href="register.php">Register here.</a>)</div>
	</form>
	    <?php
	}
	printMessages();
	?>
<br/><br/><br/>