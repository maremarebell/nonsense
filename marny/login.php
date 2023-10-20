<?php
include_once("includes/globalFunctions.php");
session_start();
extract($_POST);
if ( isset($username) ) {
    include_once("includes/databaseConnect.php");
    
    $query = " SELECT verificationCode FROM users WHERE (`username` = '$username' OR `emailAddress` = '$username') ";
    $result = $mysql->query($query) or die( "Error with the query: $query" );
    if ( $result->num_rows > 0 ) {
        $row = $result->fetch_array();
        if ( $row['verificationCode'] != 'VERIFIED'  ) {
            $_SESSION['error'] = "That account has not yet been verified.";
            unset($_POST);
            goBack();
        }
    }
    
	$query = " SELECT u.password, u.username, u.userId FROM users u WHERE (`username` = '$username' OR `emailAddress` = '$username') AND `password` = '" . md5($password) . "' ; ";
	$result = $mysql->query($query) or die( "Error with the query: $query" );
    if ( $result->num_rows > 0 ) {
        $row = $result->fetch_array();
		$_SESSION['username'] = $row['username'];
        $_SESSION['userId'] = $row['userId'];
        if ( $row['isAdmin'] == 1 ) {
            $_SESSION['admin'] = 1;
        }
        $_SESSION['success'] = "Successfully logged in!";
        goBack();
    } else {
        $_SESSION['error'] = "Incorrect Login";
        unset($_POST);
        goBack();
    }
}