<?php 
session_start();
/* 
 * Auth script checks if user is logged in and either allows or disallows access
 */

if(empty($_SESSION['authenticated']) || $_SESSION['authenticated'] == false) {
    //Redirect to login
    header('Location: index.php');
}

?>
