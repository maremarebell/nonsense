<?php
    // info submitted (required)
    $the_message = $_POST['message'];
    $the_name = $_POST['name'];
    $the_email = $_POST['email'];
    $the_city = $_POST['city'];
    $the_country = $_POST['country'];

    // info submitted (not required)
    $the_city = (isset($the_city) && $the_city != "" ? $the_city : 'not given');
    $the_country = (isset($the_country) && $the_country != "" ? $the_country : 'not given');

    $email_to = "maremarebell@gmail.com, dana.ullmann@gmail.com";
    $email_subject = "cotidianacollective.com: new message from ".$the_email;


    // todo: better error here
    error_log('this is it:'.$email_from);

    $email_message = "The name given is: ".$the_name.", the email for that person is: ".$the_email.", the city is: ".$the_city.", and the country is: ".$the_country.", and the message is: ".$the_message ;

    @mail($email_to, $email_subject, $email_message);

?>
