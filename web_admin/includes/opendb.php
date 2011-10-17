<?php
//CONNECT TO THE DATABASE
$link = mysql_connect("clientlocale.db.4545540.hostedresource.com", "clientlocale", "vd23yofhM7Na6g") or die("Unable to connect to host :( !");
//SELECT DATABASE TO USE
$resultC = mysql_select_db("clientlocale" ,$link)  or die( "Unable to select database");
?>
