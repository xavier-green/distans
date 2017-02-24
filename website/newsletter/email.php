<?php

$email_text = file_get_contents('bonne_annee.html');

// Read the form values
$recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
$headers = "From: Equipe Distans <newsletter@distans.fr>\r\n".
           "MIME-Version: 1.0" . "\r\n" .
           "Content-type: text/html; charset=UTF-8" . "\r\n";
$success = mail( 'xav.green.95@gmail.com', "Distans vous souhaite une merveilleuse année 2017", $email_text, $headers );

echo $success;
?>
