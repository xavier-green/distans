<?php

// Define some constants
define( "RECIPIENT_NAME", "Distans Admin" );
define( "RECIPIENT_EMAIL", "contactdistans@gmail.com" );
define( "EMAIL_SUBJECT", "Message de contact" );

// Read the form values
$success = false;
$senderName = isset( $_POST['senderName'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['senderName'] ) : "";
$senderEmail = isset( $_POST['senderEmail'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['senderEmail'] ) : "";
$message = isset( $_POST['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message'] ) : "";

if ( $senderName && $senderEmail && $message) {
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  $headers = "From: " . $senderName . " <" . $senderEmail . ">";
  $success = mail( $recipient, EMAIL_SUBJECT, $message, $headers );
}

// Return an appropriate response to the browser
if ( isset($_GET["ajax"]) ) {
  echo $success ? "success" : "error";
} else {
?>
<html>
  <head>
    <title>Merci!</title>
  </head>
  <body>
  <?php if ( $success ) echo "<p>Merci pour votre message! Nous vous répondrons très prochainement.</p>" ?>
  <?php if ( !$success ) echo "<p>Il y a eu un problème durant l'envoi de votre message. Veuillez réessayer.</p>" ?>
  <p>Cliquez sur retour pour revenir à la page principale</p>
  </body>
</html>
<?php
}
?>
