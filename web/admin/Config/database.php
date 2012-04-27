<?php
class DATABASE_CONFIG {
  public $default = array(
    "datasource" => "Database/Mysql",
    "persistent" => false,
    "host" => "@DB_SERVER@",
    "port" => @DB_PORT@,
    "login" => "@DB_USER@",
    "password" => "@DB_PASSWORD@",
    "database" => "@DB_NAME@");
}
?>