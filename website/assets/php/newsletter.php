<?php

// Define some constants
define( "RECIPIENT_NAME", "Distans Admin" );
define( "RECIPIENT_EMAIL", "xav.green.95@gmail.com" );
define( "EMAIL_SUBJECT", "Distans Visitor Message" );

// Read the form values
$success = false;
$senderEmail = isset( $_POST['email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email'] ) : "";
$origin = isset( $_POST['origin'] ) ? $_POST['origin'] : "";

if ($senderEmail && ($origin == "psychologue" || $origin == "utilisateur" || $origin == "ecole" || $origin == "business")) {
  $message = "Nouvelle inscription à la newsletter de: " . $senderEmail . ", type: " . $origin;
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  $headers = "From: " . "Distans_Newsletter" . " <" . "newsletter@distans.fr" . ">";
  $success = mail( $recipient, EMAIL_SUBJECT, $message, $headers );
}

// Return an appropriate response to the browser
if ( isset($_GET["ajax"]) ) {
  echo $success ? "success" : "error";
} else {
  if ( $success ) {
    echo "Merci pour votre inscription, nous vous tiendrons au courant !";
  } else {
    echo "Veuillez rentrer une bonne adresse email svp";
  }
}
?>
