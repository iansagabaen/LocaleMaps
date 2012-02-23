<?php
/**
 * This command line script will parse the 'times' column of the 'locale'
 * table and create entries in the 'event' table.  If an entries in the
 * 'times' column cannot be parsed completely, it will be noted in an
 * error log file. Command-line usage:
 * <code>./convert_services.php --error_log=[path to error log file]</code>
 * @deprecated
 */

define('ENGLISH', 'english');
define('FILIPINO', 'filipino');
define('SPANISH', 'spanish');
define('TAGALOG', 'tagalog');
define('CWS', 'cws');
define('TIME_PATTERN', '/([0-1]?[0-9]:[0-9][0-9]\s?(am|pm))(\s?(English|Filipino|CWS))?/i');
define('TIME_FORMAT', '%Y-%m-%d %H:%M');
define('UNITED_STATES_ISO2', 'US');
date_default_timezone_set('UTC');



/**
 * Reads the 'times' column from the 'locale' table, and creates entries in
 * the 'event' table.  Also does normalization of state name (for locales in
 * the United States) and country names.
 * @package LocaleMaps
 */
class DataConverter {
  private $conn;
  private $dbName = '@DB_NAME@';
  private $dbPassword = '@DB_ADMIN_PASSWORD@';
  private $dbServer = '@DB_SERVER@';
  private $dbUsername = '@DB_ADMIN_USER@';
  private $errorLogPath;

  /**
   * Constructs a ServicesConverter instance.
   * @param string $errorLogPath The path to the generated error log file.
   */
  function __construct($errorLogPath) {
    global $isCommandLine;
    $this->errorLogPath = $errorLogPath;
    $this->conn = mysql_connect(
      $this->dbServer,
      $this->dbUsername,
      $this->dbPassword) or die('Could not connect: ' . mysql_error() . "\n");
    mysql_select_db($this->dbName);
    $results = mysql_query('select localeid, name, state, country, times from locale');
    while ($row = mysql_fetch_array($results, MYSQL_ASSOC)) {
      // If the locale is in the U.S., expand the state name (ex. CA -> California).
      $id = $row["localeid"];
      $name = $row["name"];
      $country = trim($row['country']);
      $countryIso = NULL;
      $countryId = NULL;
      $countryName = NULL;
      if ((strcmp($country, constant('UNITED_STATES_ISO2')) == 0) || (strcmp($country, '40243') == 0)) {
        $state = $row['state'];
        $countryResults =
          mysql_query("select id, name from country where iso2 = '" . constant('UNITED_STATES_ISO2') . "'");
        while ($countryRow = mysql_fetch_assoc($countryResults)) {
          $countryId = $countryRow['id'];
          $countryName = $countryRow['name'];
          $stateResults = mysql_query("select name from region where abbrev = '$state'");
          while ($stateRow = mysql_fetch_assoc($stateResults)) {
            $fullStateName = $stateRow['name'];
            $query = "update locale set full_state = '$fullStateName', country = '$countryName', country_id = $countryId where localeid = $id";
            if (!mysql_query($query)) {
              $this->logError("[id: $id, name: $name] cannot update state name: $fullStateName");
            }
          }
        }
        mysql_free_result($countryResults);
      } else if (
                  (strcmp($country, 'AU') == 0) ||
                  (strcmp($country, 'CA') == 0)
                ) {
        $countryIso = $country;
      } else if ((strcmp($country, 'GB') == 0) || (strcmp($country, 'UK') == 0)) {
        $countryIso = 'GB';
      } else if (strcmp($country, 'American Samoa') == 0) {
        $countryIso = 'AS';
      } else if (strcmp($country, 'Austria') == 0) {
        $countryIso = 'AT';
      } else if (strcmp($country, 'Bangladesh') == 0) {
        $countryIso = 'BD';
      } else if (strcmp($country, 'Belgium') == 0) {
        $countryIso = 'BE';
      } else if (strcmp($country, 'China') == 0) {
        $countryIso = 'CN';
      } else if (strcmp($country, 'Germany') == 0) {
        $countryIso = 'DE';
      } else if (strcmp($country, 'Hong Kong') == 0) {
        $countryIso = 'HK';
      } else if (strcmp($country, 'Japan') == 0) {
        $countryIso = 'JP';
      } else if (strcmp($country, 'Philippines') == 0) {
        $countryIso = 'PH';
      } else if (strcmp($country, 'South Africa') == 0) {
        $countryIso = 'ZA';
      } else if (strcmp($country, 'Switzerland') == 0) {
        $countryIso = 'CH';
      } else if (strcmp($country, 'The Bahamas') == 0) {
        $countryIso = 'BS';
      }
      if (!empty($countryIso)) {
        $countryResult = mysql_query("select id, name from country where iso2 = '$countryIso'");
        $countryRow = mysql_fetch_assoc($countryResult);
        $countryId = $countryRow['id'];
        $countryName = $countryRow['name'];
        mysql_free_result($countryResult);
        $query = "update locale set country = '$countryName', country_id = $countryId where localeid = $id";
        if (!mysql_query($query)) {
          $this->logError("[id: $id, name: $name] cannot update country name");
        }
      }

      // For now, if we have any non '<br>' tags, skip it and take note which
      // locale it is.
      if (strpos($row["times"], '<div') != FALSE) {
        continue;
      }

      // Replace '<br />' with '\n', strip out HTML, and split on '\n'.
      $times = explode(
        "\n",
        strip_tags(str_replace('<br />', "\n", $row["times"])));

      if (empty($times[0])) {
        $this->logError("[id: $id, name: $name] no services listed");
        continue;
      } else {
        // Split by ':'.  The first element is the day of the week.
        // If the first element doesn't match a day of the week, log an error.
        $size = count($times);
        for ($i = 0; $i < $size; $i++) {
          $timesInOneDay = $times[$i];
          $split = explode(":", $timesInOneDay);
          $day = trim(strtolower($split[0]));
          $dayOfWeek = NULL;
          switch ($day) {
            case "sunday":
              $dayOfWeek = 1;
              break;
            case "monday":
              $dayOfWeek = 2;
              break;
            case "tuesday":
              $dayOfWeek = 4;
              break;
            case "wednesday":
              $dayOfWeek = 8;
              break;
            case "thursday":
              $dayOfWeek = 16;
              break;
            case "friday":
              $dayOfWeek = 32;
              break;
            case "saturday":
              $dayOfWeek = 64;
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
                $language = $this->resolveLanguage(trim($matches[3]));
                if (strcmp($language, constant('CWS')) == 0) {
                  $metadata = '<service><cws/></service>';
                } else {
                  if (!is_null($language)) {
                    $metadata = "<service><language>$language</language></service>";
                  }
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

  /**
   * @param Array $info Associative array containing the following properties:
   *   <ul>
   *     <li>localeId - int</li>
   *     <li>dayOfWeek - int {1,2,4,8,16,32}</li>
   *     <li>time - string representing MySQL datetime<li>
   *     <li>metadata (optional) - string</li>
   *   </ul>
   */
  private function insertService($info) {
    $sql = NULL;
    $values = NULL;
    // Create the SQL statement to insert event.  Format the time according
    // to http://dev.mysql.com/doc/refman/5.1/en/datetime.html
    $formattedTime = strftime(constant('TIME_FORMAT'), strtotime('1970-01-01 ' . $info['time']));
    if (isset($info['metadata'])) {
      $sql = 'insert into event (locale_id, type, recurring, day_of_week, schedule, metadata) values (';
      $values = array(
        $info['localeId'],
        ', 1, 1, ',  // Use 1 for worship service, and 1 for recurring
        $info['dayOfWeek'],
        ", '",
        $formattedTime,
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
        $formattedTime,
        "')"
      );
    }
    $sql = $sql . implode('', $values);
    if (!mysql_query($sql)) {
      $this->logError("Unable to execute query: $sql, " . mysql_error());
    }
  }

  /**
   * Resolves given English name for a language to its ISO code.
   * @param String $language Full English language name (ex. 'Spanish')
   * @return String 2-character ISO 639-1 code for the language, or NULL.
   */
  private function resolveLanguage($language) {
    $language = strtolower($language);
    if (strcmp($language, constant('ENGLISH')) == 0) {
      return 'en';
    } else if (strcmp($language, constant('SPANISH')) == 0) {
      return 'es';
    } else if ((strcmp($language, constant('FILIPINO')) == 0) ||
               (strcmp($language, constant('TAGALOG')) == 0)) {
      return 'tl';
    } else if (preg_match('/^cws$/i', $language) > 0) {
      return 'cws';
    }
    return NULL;
  }

  /**
   * Adds specified message to error log.
   * @param string $message
   */
  private function logError($message) {
    global $isCommandLine;
    if ($isCommandLine) {
      error_log("$message\n", 3, $this->errorLogPath);
    } else {
      print "<div>$message</div>";
    }
  }
}

/**
 * Parses specified array representing command-line arguments and returns
 * a corresponding associative array.
 * @param Array $argv Numerical-indexed array where each element is a string
 *    of the form '--[key]=[value]'.
 * @return Array An associative array containing key=>value
 */
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
$isCommandLine = false;
if (php_sapi_name() == 'cli') {
  $args = parseArgs($argv);
  if (!isset($args['error_log'])) {
    error_log('error_log is not defined', 0);
    exit(1);
  }
  $errorLogPath = $args['error_log'];
  $isCommandLine = true;
}
if (is_null($errorLogPath)) {
  error_log('errorLogPath is not defined', 0);
}
new DataConverter($errorLogPath);
?>