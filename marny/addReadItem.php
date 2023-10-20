<?php
//require_once('include/auth.php');   //must be first line in file after the php tag
?>

<html>
    <head>
        <title>Add Read Item</title>
    </head>
    <body>

        <h2>Add Read Item</h2>

	<form name="addReadItem" action="addReadItemProcessing.php" method="post" >
		Title: <input type="text" name="title" id="title" />
		<br/>
		Source: <input type="text" name="source" id="source" />
		<br/>
		URL: <input type="text" name="url" id="url" />
		<br/>
		Rating (0-99): <input type="text" name="rating" id="rating" size="1" maxlength="2"/>
		<br/>

		Comment: <br/><textarea name="comment" cols="30" rows="4"></textarea>
		<br/>
		<br/><br/>

		<input type="submit" title="submit" value="Add >>" />
	</form>
</body>
</html>
