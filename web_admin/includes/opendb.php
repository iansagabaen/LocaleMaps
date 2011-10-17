<?php
//CONNECT TO THE DATABASE
$link = mysql_connect("@DB_SERVER@", "@DB_ADMIN_USER@", "@DB_ADMIN_PASSWORD@") or die("Unable to connect to host :( !");
//SELECT DATABASE TO USE
$resultC = mysql_select_db("@DB_NAME@" ,$link)  or die( "Unable to select database");
?>
