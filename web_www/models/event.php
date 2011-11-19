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
  private static $daysOfWeekFilterValue = array(
    0 => 1,
    1 => 2,
    2 => 4,
    3 => 8,
    4 => 16,
    5 => 32,
    6 => 64
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
      $event['schedule'] = strftime('%l:%M %p', strtotime($event['schedule']));

      // Add metadata related to CWS and/or language.
      $metadata = new DOMDocument();
      if (!is_null($event['metadata'])) {
        $metadata->loadXML($event['metadata']);
        $event['cws'] = !is_null($metadata->getElementsByTagName('cws')->item(0));
        $language = $metadata->getElementsByTagName('language')->item(0);
        if (!is_null($language)) {
          $event['language'] = strtolower($language->textContent);
        }
        unset($event['metadata']);
      } else {
        $event['cws'] = false;
      }

      // Add filter value used in filtering search results.
      $filterValue = 0;
      $filterValue |= (
        intval(self::$daysOfWeekFilterValue[$event['day_of_week']]) +
        (intval(strftime('%H', strtotime($event['schedule']))) > 11 ? 256 : 128)
        );
      $event['filterValue'] = $filterValue;
      array_push($groupedResults[$dayOfWeek], $event);
    }
    return $groupedResults;
  }
}
?>