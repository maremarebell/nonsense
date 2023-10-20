<?php
include_once("includes/globalFunctions.php");

session_start();

extract($_POST);
if ( isset($title) ) {
    include_once("includes/databaseConnect.php");
    $query = " INSERT INTO `story` ( `title` , `source` , `url`, `dateAdded` )
				VALUES ( '$title' , '$source', '$url', NOW() ); ";
    echo "query = '$query'<br/>";
    $result = $mysql->query($query) or die('Error with the query:' . $query);

    $storyId = $mysql->insert_id;
    $query = " INSERT INTO `readStories` ( `userId` , `storyId` , `rating`, `dateRead`, `comment` )
				VALUES ( '{$_SESSION['userId']}' , '$storyId', '$rating', NOW(), '$comment' ); ";
    echo "query = '$query'<br/>";
    $result = $mysql->query($query) or die('Error with the query:' . $query);


    $_SESSION['success'] = "Successfully created the $title Story.";
    unset($_POST);
    goBack();
}

?>
