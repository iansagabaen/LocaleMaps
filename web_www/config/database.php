<?php
class DATABASE_CONFIG {
  var $default = array(
    "driver" => "mysql",
    "persistent" => false,
    "host" => "@DB_SERVER@",
    "port" => @DB_PORT@,
    "login" => "@DB_USER@",
    "password" => "@DB_PASSWORD@",
    "database" => "@DB_NAME@");
}
?>