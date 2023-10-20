<?php
session_start();
include_once("includes/globalFunctions.php");

if ( isset($_SESSION['userId'] ) ) {
    goHome();
}

include_once("includes/databaseConnect.php");

if ( ! ( isset( $_GET['userId'] ) && isset( $_GET['verificationCode'] ) )  ) {
    $_SESSION['error'] = "Did you attempt a URL hack?  If not, please report the error to somebody.";
    goHome();
} 

$query = "SELECT * FROM Users WHERE `userId` = '{$_GET['userId']}' AND `verificationCode` = '" . md5( $_GET['verificationCode'] ) . "' ";
$result = $mysql->query($query) or die( "Error with the query: $query" );
if ( $result->num_rows > 0 ) {
    $row = $result->fetch_array();
    
    $query = "UPDATE Users SET `verificationCode` = 'VERIFIED' WHERE `userId` = '{$_GET['userId']}' ; ";
    $updateResult = $mysql->query($query) or die( "Error with the query: $query" );
    
    $_SESSION['username'] = $row['username'];
    $_SESSION['userId'] = $row['userId'];
    if ( $row['isAdmin'] == 1 ) {
        $_SESSION['admin'] = 1;
    }
    $_SESSION['success'] = "Successfully verified the account and logged in!";
    
    unset($_POST);
    unset($_GET);
    goBack();
} else {
    $_SESSION['error'] = "Somehow you managed to incorrectly click that link... the User ID and temporary password do not match...";
    goBack();
}
?>