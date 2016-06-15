<?php

$EmailFrom = "website@anneandtimswedding.info";
$EmailTo = "7amberleygrove@blueyonder.co.uk";
$Subject = "Reply from Website at Anne & Tims Wedding";
$attendees = Trim(stripslashes($_POST['attendees'])); 
$dietary = Trim(stripslashes($_POST['dietary'])); 
$playlist = Trim(stripslashes($_POST['playlist'])); 

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=contacterror.php\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Hello! The following reply was recieved via the contact form on http://anneandtimswedding.info: ";
$Body .= "\n";
$Body .= "attendees: ";
$Body .= $attendees;
$Body .= $Tel;
$Body .= "\n";
$Body .= "dietary: ";
$Body .= $dietary;
$Body .= "\n";
$Body .= "playlist: ";
$Body .= $playlist;
$Body .= "\n";

// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=contactthanks.php\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=contacterror.php\">";
}
?>