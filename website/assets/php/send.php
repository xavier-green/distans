<?php

// Define some constants
define( "RECIPIENT_NAME", "Distans Admin" );
define( "RECIPIENT_EMAIL", "xav.green.95@gmail.com" );
define( "EMAIL_SUBJECT", "Distans Visitor Message" );

// Read the form values
$success = false;
$senderName = isset( $_POST['senderName'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['senderName'] ) : "";
$senderEmail = isset( $_POST['senderEmail'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['senderEmail'] ) : "";
$message = isset( $_POST['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message'] ) : "";

$humanA     = $_POST['checkHuman_a'];
$humanB     = $_POST['checkHuman_b'];
$humanCheck = $_POST['senderHuman'];

$human = ($humanCheck == $humanA + $humanB) ? true : false;

// If all values exist, send the email
if( $human == true ) {
    if ( $senderName && $senderEmail && $message) {
      $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
      $headers = "From: " . $senderName . " <" . $senderEmail . ">";
      $success = mail( $recipient, EMAIL_SUBJECT, $message, $headers );
    }
}

// Return an appropriate response to the browser
if ( isset($_GET["ajax"]) ) {
  echo $success ? "success" : "error";
} else {
?>
<html>
  <head>
    <title>Thanks!</title>
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
