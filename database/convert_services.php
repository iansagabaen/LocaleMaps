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
    $results = mysql_query('select localeid, name, times from locale where name = \'San Jose\'');
    while ($row = mysql_fetch_array($results, MYSQL_ASSOC)) {
      // For now, if we have any non '<br>' tags, skip it and take note which
      // locale it is.
      print($row['times'] . "\n");
      if (strpos($row["times"], '<div') != FALSE) {
        //error_log("$id) contains HTML", 0);
        //print("Has HTML");
        continue;
      }
      
      // Replace '<br />' with '\n', strip out HTML, and split on '\n'.
      $id = $row["localeid"];
      $times = explode(
        "\n",
        strip_tags(str_replace('<br />', "\n", $row["times"])));

      if (empty($times[0])) {
        error_log("$id) no services listed", 0);
        continue;
      } else {
        // Split by ':'.  The first element is the day of the week.
        // If the first element doesn't 
        $size = count($times);
        for ($i = 0; $i < $size; $i++) {
          // print_r($times);
          // exit(0);
          $timesInOneDay = $times[$i];
          $split = explode(":", $timesInOneDay);
          $day = strtolower($split[0]);
          // print('$day: ' . $day . "\n");
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
            case "thursday":
              $dayOfWeek = 4;
              break;
            case "friday":
              $dayOfWeek = 5;
              break;
            case "saturday":
              $dayOfWeek = 7;
              break;
          }
          if (is_null($dayOfWeek)) {
            error_log("$id)" . '$dayOfWeek does not match: ' . $day, 0);
            continue;
          }

          // Implode the string (without day of week), then split by ','.
          // For each item, check if it's a valid time.  If it contains
          // CWS, or some language, create metadata.
          //print('$day: '. $day . "\n");
          $joined = implode(":", array_slice($split, 1));
          $split = explode(",", $joined);
          foreach ($split as $time) {
            // print('$time: ' . $time . "\n");
          }
        }
      }
    }
    mysql_free_result($results);
    mysql_close($this->conn);
  }

  private function insertServices() {
    
  }
}
new ServicesConverter();
?>