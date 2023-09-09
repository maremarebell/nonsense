<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Contact | COTIDIANA COLLECTIVE</title>
  <link href="/favicon.ico" rel="shortcut icon">
  <link rel="stylesheet" type="text/css" href="main.css" />
  <script type="text/javascript" src="media/js/jquery.min.js"></script>
  <script type="text/javascript" src="media/js/jquery.cycle.all.latest.js"></script>
  <script>
    $(document).ready(function() {
      $( '.contact-form' ).submit( function ( e ) {

        e.preventDefault();

        //required inputs
        var inputs = $('.contact-form input[type="email"], .contact-form input[name="name"], .contact-form textarea');
        //sumit button
        var submit = $( '.submit' );

        // disable sumit
        submit.attr('disabled', 'disabled').addClass('disabled').attr('value','sending message...');

        // remove unneeded error class
        inputs.each( function(){
            $(this).removeClass('error');
            $('.error-message').hide();
        });

        // get data
        var message = $('#message').val();
        var name = $('#name').val();
        var email = $('#email').val();
        var city = $('#city').val();
        var country = $('#country').val();
        var data = ({message: message, name: name, email: email, city: city, country: country });

        // basic check to find errors
        inputs.each( function(){
            if ( $(this).attr('value') == "" ) {

                // remove error class and hide message
                $(this).addClass('error');
                $('.error-message').show();

                //enable to re-sumit
                submit.attr('disabled', '').removeClass('disabled').attr('value','send message');
            }
        });

        // if it passes basic check
        if (!inputs.hasClass('error')){
          $.ajax({
            type: 'POST',
            url: 'contact-handler.php',
            data: data,
            success: function( data ) {
              console.log('success');
              $( '.submit' ).attr('value','Thank you for your message!'). attr ('disabled', 'disabled').addClass('disabled, thanks');
              inputs.attr('value','');
              $('.contact-form input[type="text"]').attr('value','');

            },
            error: function( data ) {
              console.log('error');
            }
            });
            return false;
          }
      });
    });
  </script>
</head>

<body class="contact">

  <?php include 'partials/header.php'; ?>

  <?php include 'partials/nav.php'; ?>

  <!-- MAIN CONTENT -->
  <div class="container border">
      <form class="contact-form" name="contact-form">
        <fieldset class="message">
          <label for="message">message*</label>
          <textarea class="message" id="message" name="message"></textarea>
        </fieldset>

        <fieldset class="info">
          <label for="name">name*</label>
          <input type="text" id="name" class="name" name="name" />

          <label for="email">e-mail*</label>
          <input type="email" id="email" class="email" name="email" />

          <label for="name">city</label>
          <input type="text" id="city" class="city" name="city" />

          <label for="name">country</label>
          <input type="text" id="country" class="country" name="country" />

          <div class="error-message">
            Please fill out all of the required fields.
          </div>

          <input type="submit" class="submit" value="send message" />
        </fieldset>

      </form>

      <div class="clear"></div>
      <a class="email-addie" href="mailto:info@cotidianacollective.com">
        info@cotidianacollective.com
      </a>

      <img class="stamp" src="media/img/stamp.png" />
  </div>

  <?php include 'partials/footer.php'; ?>

</body>



</body>
</html>



