#!/usr/bin/php
<?php
define('TIME_PATTERN', '/([0-1]?[0-9]:[0-9][0-9]\s?(am|pm))(\s?(English|Filipino|CWS))?/i');
define('TIME_FORMAT', '%Y-%m-%d %H:%M');
date_default_timezone_set('UTC');

class ServicesConverter {
  private $conn;
  private $dbName = 'localemaps';
  private $dbPassword = 'root';
  private $dbServer = ':/Applications/MAMP/tmp/mysql/mysql.sock';  // localhost
  private $dbUsername = 'root';
  private $errorLogPath;

  function __construct($errorLogPath) {
    $this->errorLogPath = $errorLogPath;
    $this->conn = mysql_connect(
      $this->dbServer,
      $this->dbUsername,
      $this->dbPassword) or die('Could not connect: ' . mysql_error() . "\n");
    mysql_select_db($this->dbName);
    $results = mysql_query('select localeid, name, times from locale');
    while ($row = mysql_fetch_array($results, MYSQL_ASSOC)) {
      // For now, if we have any non '<br>' tags, skip it and take note which
      // locale it is.
      if (strpos($row["times"], '<div') != FALSE) {
        continue;
      }
      
      // Replace '<br />' with '\n', strip out HTML, and split on '\n'.
      $id = $row["localeid"];
      $name = $row["name"];
      $times = explode(
        "\n",
        strip_tags(str_replace('<br />', "\n", $row["times"])));

      if (empty($times[0])) {
        $this->logError("[id: $id, name: $name] no services listed");
        continue;
      } else {
        // Split by ':'.  The first element is the day of the week.
        // If the first element doesn't 
        $size = count($times);
        for ($i = 0; $i < $size; $i++) {
          $timesInOneDay = $times[$i];
          $split = explode(":", $timesInOneDay);
          $day = trim(strtolower($split[0]));
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
              $dayOfWeek = 6;
              break;
          }
          if (is_null($dayOfWeek)) {
            $this->logError("[id: $id, name: $name] dayOfWeek does not match: $day");
            continue;
          }

          // Implode the string (without day of week), then split by ','.
          // For each item, check if it's a valid time.  If it contains
          // CWS, or some language, create metadata.
          $joined = implode(":", array_slice($split, 1));
          $split = explode(",", $joined);
          foreach ($split as $time) {
            $time = trim($time);
            $language = NULL;
            $metadata = NULL;
            $pregResult = preg_match(constant('TIME_PATTERN'), $time, $matches);
            $numMatches = count($matches);
            if ($pregResult > 0) {
              $time = trim($matches[1]);
              if ($numMatches == 5) {
                $language = trim($matches[3]);
                if (preg_match('/^cws$/i', $language) > 0) {
                  $metadata = '<service><cws>true</cws></service>';
                } else {
                  $metadata = "<service><language>$language</language></service>";
                }
              }
              $info = array(
                'localeId' => $id,
                'time' => $time,
                'dayOfWeek' => $dayOfWeek,
                'metadata' => $metadata
              );
              $this->insertService($info);
            } else {
              $this->logError("[id: $id, name: $name] cannot parse service info: $time");
            }
          }
        }
      }
    }
    mysql_free_result($results);
    mysql_close($this->conn);
  }

  private function insertService($info) {
    $sql = NULL;
    $values = NULL;
    // Create the SQL statement to insert event.  Format the time according
    // to http://dev.mysql.com/doc/refman/5.1/en/datetime.html
    if (isset($info['metadata'])) {
      $sql = 'insert into event (locale_id, type, recurring, day_of_week, schedule, metadata) values (';
      $values = array(
        $info['localeId'],
        ', 1, 1, ',  // Use 1 for worship service, and 1 for recurring
        $info['dayOfWeek'],
        ", '",
        strftime(constant('TIME_FORMAT'), strtotime($info['time'])),
        "', '",
        $info['metadata'],
        "')"
      );
    } else {
      $sql = 'insert into event (locale_id, type, recurring, day_of_week, schedule) values (';
      $values = array(
        $info['localeId'],
        ', 1, 1, ',  // Use 1 for worship service, and 1 for recurring
        $info['dayOfWeek'],
        ", '",
        strftime(constant('TIME_FORMAT'), strtotime($info['time'])),
        "')"
      );
    }
    $sql = $sql . implode('', $values);
    if (!mysql_query($sql)) {
      $this->logError("Unable to execute query: $sql");
    }
  }

  private function logError($message) {
    error_log("$message\n", 3, $this->errorLogPath);
  }
}

function parseArgs($argv){
  array_shift($argv);
  $out = array();
  foreach ($argv as $arg){
    if (substr($arg,0,2) == '--'){
      $eqPos = strpos($arg,'=');
      if ($eqPos === false){
        $key = substr($arg,2);
        $out[$key] = isset($out[$key]) ? $out[$key] : true;
      } else {
        $key = substr($arg,2,$eqPos-2);
        $out[$key] = substr($arg,$eqPos+1);
      }
    } else if (substr($arg,0,1) == '-'){
      if (substr($arg,2,1) == '='){
        $key = substr($arg,1,1);
        $out[$key] = substr($arg,3);
      } else {
        $chars = str_split(substr($arg,1));
        foreach ($chars as $char){
          $key = $char;
          $out[$key] = isset($out[$key]) ? $out[$key] : true;
        }
      }
    } else {
      $out[] = $arg;
    }
  }
  return $out;
}

$errorLogPath = NULL;
if (php_sapi_name() == 'cli') {
  $args = parseArgs($argv);
  if (!isset($args['error_log'])) {
    error_log('error_log is not defined', 0);
    exit(1);
  }
  $errorLogPath = $args['error_log'];
}
if (is_null($errorLogPath)) {
  error_log('errorLogPath is not defined', 0);
}
new ServicesConverter($errorLogPath);
?>