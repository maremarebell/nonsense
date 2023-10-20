<?php

function goBack() {
    if ( isset( $_SERVER['HTTP_REFERER'] ) ) {
        header("location: " . $_SERVER['HTTP_REFERER'] );
    } else {
        header("location: ./index.php" );
    }
    die;
}

function goHome() {
    header("location: ./index.php");
    die;
}

function printMessages() {
    if ( isset( $_SESSION['success'] ) ) {	
        echo ( "<div class='message'><span class=\"success\"> {$_SESSION['success']} </span></div>" ); 
        unset( $_SESSION['success'] );
    } 
    if ( isset( $_SESSION['error'] ) ) {	
        echo ( "<div class='message'><span class=\"error\"> {$_SESSION['error']} </span></div> " ); 
        unset( $_SESSION['error'] );
    } 
}

function printStories($params) {
    global $mysql;      // it's already open....

    if ( isset($params['start']) ) {
        $start = $params['start'];
    } else {
        $start = 0;
    }
    $stop = $start + 15;
    
           
    if ( isset($params['cat']) ) {
        $cat = $params['cat'];
        
        $query = " SELECT u.username, s.story, s.storyId, s.dateAdded, s.approved, s.totalVotes, s.numVotes";
        if ( isset($_SESSION['userId']) ) {
            $query .= ", v.vote ";
        }
        $query .= " FROM Categories c, StoryCategory sc, Stories s 
                    LEFT JOIN  users u ON s.submitterId = u.userId ";
        if ( isset($_SESSION['userId']) ) {
            $query .= " LEFT JOIN Votes v ON ( v.storyId = s.storyId AND v.userId = {$_SESSION['userId']} ) ";
        }
        $query .= " WHERE s.approved = 1 AND c.categoryId = '$cat' AND c.categoryId = sc.categoryId AND sc.storyId = s.storyId ";
    } else {
        $query = " SELECT u.username, s.story, s.storyId, s.dateAdded, s.approved, s.totalVotes, s.numVotes";
        if ( isset($_SESSION['userId']) ) {
            $query .= ", v.vote ";
        }
        $query .= " FROM Stories s 
                LEFT JOIN  users u ON s.submitterId = u.userId ";
        if ( isset($_SESSION['userId']) ) {
            $query .= " LEFT JOIN Votes v ON ( v.storyId = s.storyId AND v.userId = {$_SESSION['userId']} ) ";
        }
        $query .= " WHERE s.approved = 1 ";
    }
   
   
    
    if ( isset($params['type']) ) {
        $type = $params['type'];
        
        if ( $type == "best" ) {
            $query .= "AND s.numVotes > 0 ORDER BY s.totalVotes / s.numVotes desc ";
        } else if ( $type == "worst" ) {
            $query .= " AND s.numVotes > 0 ORDER BY s.totalVotes / s.numVotes asc ";
        } else {
            $query .= " ORDER BY s.dateAdded desc ";
        }
            
    } else {
        $query .= "ORDER BY s.dateAdded desc ";
    }
    
    $query .= " LIMIT $start, $stop; ";
    
    
    
           
    $storyResults = $mysql->query($query) or die('Error with the query: ' . $query);



    if ( $storyResults->num_rows == 0 ) {
        $_SESSION['error'] =  "There aren't any stories in this sector...yet!";
        printMessages();
    }
    while ( $storyInfo = $storyResults->fetch_array() ) { 

        $storyInfo['story'] = str_replace("\n", "<br />", $storyInfo['story']);
        if ( $storyInfo['username'] == NULL ) {
            $storyInfo['username'] = "Anonymous";
        }
        
        $storyInfo['dateAdded'] = date( "Y-M-d", strtotime($storyInfo['dateAdded']) );
        
        
        $rateLink = "rateThis.php?storyId={$storyInfo['storyId']}&vote=";
        
        $commentQuery = " SELECT COUNT(*) as numComments FROM Comments WHERE `storyId` = '{$storyInfo['storyId']}' ";
        $commentResults = $mysql->query($commentQuery) or die('Error with the query:' . $commentQuery);
        $numComments = $commentResults->fetch_array();
        $numComments = $numComments['numComments'];

        echo <<< uniqueStringFollowedByANewLine
            <div class="entry">
                <p>{$storyInfo['story']}</p>
                <div class="tag_set">
                <div class="tag_name">Posted by: <a href="profile.php?username={$storyInfo['username']}">{$storyInfo['username']}</a> on {$storyInfo['dateAdded']}</div>
                
uniqueStringFollowedByANewLine;
        
        if ( isset( $storyInfo['vote'] ) ) {
            echo "<div class=\"tag_rate\">". number_format(   (100 * ($storyInfo['totalVotes'] / $storyInfo['numVotes'])), 2 ) . "% qualified: <a>qualified [" . $storyInfo['totalVotes'] . "]</a> &nbsp; <a>unqualified [". ($storyInfo['numVotes'] - $storyInfo['totalVotes'] ) ."]</a></div>";
        } else { 
            echo "<div class=\"tag_rate\">Rate this: <a href=\"{$rateLink}1\">qualified [+]</a>  &nbsp; <a href=\"{$rateLink}0\">unqualified [-]</a></div>";
        }
        
        echo <<< uniqueStringFollowedByANewLine
                <div class="tag_comments"><a href="displayStory.php?storyId={$storyInfo['storyId']}">Comments ({$numComments})</a></div>
                </div>
            </div>
uniqueStringFollowedByANewLine;
    }
}

function printNavigation($params) {
    global $mysql;      // it's already open....
    
    
    if ( isset($params['cat']) ) {
        $cat = $params['cat'];
        $query = " SELECT COUNT(*) as numStories
           FROM Categories c, StoryCategory sc, Stories s LEFT JOIN  users u on s.submitterId = u.userId
           WHERE s.approved = 1 AND c.categoryId = '$cat' AND c.categoryId = sc.categoryId AND sc.storyId = s.storyId ";
    } else {
        $query = " SELECT COUNT(*) as numStories
           FROM Stories s LEFT JOIN  users u on s.submitterId = u.userId
           WHERE s.approved = 1 ";
    }
    
    $storyResults = $mysql->query($query) or die('Error with the query: ' . $query);

    $numStories = $storyResults->fetch_array();
    $numStories = $numStories['numStories'];
    
    
    
    $page = $params['page'];
    $pageName = $_SERVER['REQUEST_URI'];
    if ( preg_match('/page=/' , $pageName ) ) {
        // echo "page = included!<br/>";
    } elseif ( preg_match('/\?/' , $pageName) ) {
        $pageName .= "&page=1";
    } else {
        $pageName = preg_replace('/php/', 'php?page=1', $pageName);
    }
    //echo "pageName = $pageName <br/>";

    $pageLinks[0] = preg_replace('/page=[\d]*/', 'page=' . ($page-1) , $pageName);
    $pageLinks[1] = preg_replace('/page=[\d]*/', 'page=' . ($page+1) , $pageName);
    /*$pageLinks[2] = preg_replace('/page=[\d+]/', 'page=' . 1 , $pageName);
    $pageLinks[3] = preg_replace('/page=[\d+]/', 'page=' . 2 , $pageName);
    $pageLinks[4] = preg_replace('/page=[\d+]/', 'page=' . 3 , $pageName);
    $pageLinks[5] = preg_replace('/page=[\d+]/', 'page=' . 4 , $pageName);
    $pageLinks[6] = preg_replace('/page=[\d+]/', 'page=' . 5 , $pageName);*/

    echo "<div class='entry'>
            <br/>
            <div class='centered'>";
    if ( $page > 1 ) {
        echo "<a href='{$pageLinks[0]}'><--back</a>&nbsp;&nbsp;&nbsp;&nbsp; ";
    }
    if ( $numStories > $page*15 )  {
        echo " <a href='{$pageLinks[1]}'>next ---></a> ";
    }
    /* // this was going to be used to list pages near this page....
    echo "            &nbsp;&nbsp;&nbsp;&nbsp;
                <a href='{$pageLinks[1]}'>1</a> |
                <a href='{$pageLinks[2]}'>2</a> |
                <a href='{$pageLinks[3]}'>3</a> |
                <a href='{$pageLinks[4]}'>4</a> |
                <a href='{$pageLinks[5]}'>5</a> 
                &nbsp;&nbsp;&nbsp;&nbsp;
                
                <a href='{$pageLinks[6]}'>next ---></a>
            </div>
        </div>
        ";*/
        
}



function get_user_browser()
{
    $u_agent = $_SERVER['HTTP_USER_AGENT'];
    $ub = '';
    if(preg_match('/MSIE/i',$u_agent))
    {
        $ub = "ie";
    }
    elseif(preg_match('/Firefox/i',$u_agent))
    {
        $ub = "firefox";
    }
    elseif(preg_match('/Safari/i',$u_agent))
    {
        $ub = "safari";
    }
    elseif(preg_match('/Chrome/i',$u_agent))
    {
        $ub = "chrome";
    }
    elseif(preg_match('/Flock/i',$u_agent))
    {
        $ub = "flock";
    }
    elseif(preg_match('/Opera/i',$u_agent))
    {
        $ub = "opera";
    }
   
    return $ub;
} 
?>