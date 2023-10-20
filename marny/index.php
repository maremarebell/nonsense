<?php 
include_once("includes/beginPage.php");
include_once("includes/globalFunctions.php");
include_once("includes/databaseConnect.php");

$params = array();
extract($_GET);
if ( isset($page) ) {
    $params['start'] = ($page-1) * 15;
} else {
    $page = 1;
    $params['start'] = 0;
}
$params['page'] = $page;

if ( isset($cat) ) {
    $params['cat'] = $cat;
} 

if ( isset($type) ) {
    $params['type'] = $type;
}
/*
printStories($params);
printNavigation($params);
*/

?>
<a href="addReadItem.php">Add Read Item</a>
<?php
include_once("includes/endPage.php");
?>