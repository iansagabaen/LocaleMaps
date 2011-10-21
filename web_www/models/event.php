<?php
class Event extends AppModel {
  var $name = 'Event';
  var $useTable = 'event';
  var $eventType = array(
    'SERVICE' => 1
  );
  private static $daysOfWeek = array(
    0 => 'Sunday',
    1 => 'Monday',
    2 => 'Tuesday',
    3 => 'Wednesday',
    4 => 'Thursday',
    5 => 'Friday',
    6 => 'Saturday'
  );

  function afterFind($results) {
    // Create an associative array with the day of week as the key, with
    // the value as a list of services for the specified day of the week.
    $groupedResults = array();
    foreach ($results as $result) {
      $event = $result['Event'];
      $dayOfWeek = self::$daysOfWeek[$event['day_of_week']];
      if (!array_key_exists($dayOfWeek, $groupedResults)) {
        $groupedResults[$dayOfWeek] = array();
      }
      $metadata = new DOMDocument();
      $metadata->loadXML($event['metadata']);
      $event['cws'] = !is_null($metadata->getElementsByTagName('cws')->item(0));
      $language = $metadata->getElementsByTagName('language')->item(0);
      if (!is_null($language)) {
        $event['language'] = $language->textContent;
      }
      
      unset($event['metadata']);
      array_push($groupedResults[$dayOfWeek], $event);
    }
    return $groupedResults;
  }
}
?>