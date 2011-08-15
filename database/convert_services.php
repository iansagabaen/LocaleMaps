#!/usr/bin/php
<?php
class ServicesConverter {
  private $conn;
  private $dbName = 'localemaps';
  private $dbPassword = 'root';
  private $dbServer = ':/Applications/MAMP/tmp/mysql/mysql.sock';  // localhost
  private $dbUsername = 'root';

  function __construct() {
    $this->conn = mysql_connect(
      $this->dbServer,
      $this->dbUsername,
      $this->dbPassword) or die('Could not connect: ' . mysql_error() . "\n");
    mysql_select_db($this->dbName);
    $results = mysql_query('select localeid, name, times from locale');
    while ($row = mysql_fetch_array($results, MYSQL_ASSOC)) {
      $id = $row["localeid"];
      $times = $row["times"];
      // Replace '<br />' with '\n', strip out HTML, and split on '\n'.
      $times = explode("\n", strip_tags(str_replace('<br />', "\n", $times)));
      
      print $row["name"] . "\n";
      if (empty($times[0])) {
        print "NO SERVICES LISTED";
      } else {
        print_r($times);
        // Split by ':'.  The first element is the day of the week.  Then
        // implode the rest split by ','
        $size = count($times);
        for ($i = 0; $i < $size; $i++) {
          $split = explode(":", $times);
          $day = strtolower($split[0]);
          $dayOfWeek = NULL;
          switch ($day) {
            case "sunday":
              $dayOfWeek = 0;
              break;
            case "monday":
              $dayOfWeek = 1;
              break;
            case "tuesday":
              $dayOfWeek = 2;
              break;
            case "wednesday":
              $dayOfWeek = 3;
              break;
          }

          if (is_null($dayOfWeek)) {
            continue;
          }
          $joined = implode(":", array_slice($split, 1));
          $split = explode(",", $joined);
          
          foreach ($split as $time) {
            if ()
          }
        }
      }
      print "\n\n";
    }
    mysql_free_result($result);
    mysql_close($this->conn);
  }

  private function insertServices() {
    
  }
}
new ServicesConverter();
?>