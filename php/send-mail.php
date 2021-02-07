<?php

  header("Access-Control-Allow-Methods: POST");
  $message = $_POST['message'];
  echo $message;

?>