<?php
define('ALL_DAY_FILTERS', 127);
define('ALL_TIME_FILTERS', 3);

class EventsFilterBehavior extends ModelBehavior {
  private static $daysOfWeek = array(
    1 => 'Sunday',
    2 => 'Monday',
    4 => 'Tuesday',
    8 => 'Wednesday',
    16 => 'Thursday',
    32 => 'Friday',
    64 => 'Saturday'
  );
  // TODO(rcruz): Move to i18n file
  private static $languages = array(
    'en' => 'English',
    'es' => 'Spanish',
    'tl' => 'Tagalog'
  );

  function setup(&$model, $settings = array()) {
    if (!isset($this->settings[$model->alias])) {
      $this->settings[$model->alias] = array(
        'day' => constant('ALL_DAY_FILTERS'),
        'time' => constant('ALL_TIME_FILTERS'));
    }
    $this->settings[$model->alias] = array_merge(
      $this->settings[$model->alias], (array)$settings);
  }

  function afterFind(&$model, $results, $primary) {
    // Create an associative array with the day of week as the key, with the
    // value as a list of services for the specified day of the week.  If at
    // least 1 service passes the day/time filters, include all services.
    $groupedResults = array();
    $settings = $this->settings[$model->alias];
    $dayFilter = $settings['day'];
    $timeFilter = $settings['time'];
    $passesFilters = ($dayFilter == constant('ALL_DAY_FILTERS')) &&
                     ($timeFilter == constant('ALL_TIME_FILTERS'));
    foreach ($results as $result) {
      $event = $result['Event'];
      $dayValue = $event['day_of_week'];
      $serviceTime = strtotime($event['schedule']);
      if (!$passesFilters) {
        $passesDayFilter = ($dayValue & $dayFilter) > 0;
        if ($passesDayFilter) {
          $hour = intval(strftime('%H', $serviceTime));
          $passesHourFilter = (($hour > 11) && ($timeFilter & 2)) ||
            (($hour < 12) && ($timeFilter & 1));
          if ($passesHourFilter) {
            $passesFilters = true;
          }
        }
      }
      $event['schedule'] = strftime('%l:%M %p', $serviceTime);

      // Add metadata related to CWS and/or language.
      $metadata = new DOMDocument();
      if (!is_null($event['metadata'])) {
        $metadata->loadXML($event['metadata']);
        $event['cws'] = !is_null($metadata->getElementsByTagName('cws')->item(0));
        $language = $metadata->getElementsByTagName('language')->item(0);
        if (!is_null($language)) {
          $isoCode = $language->textContent;
          $languageObj = array(
            "code" => $isoCode,
            "description" => self::$languages[$isoCode]
          );
          $event['language'] = $languageObj;
        }
        unset($event['metadata']);
      } else {
        $event['cws'] = false;
      }

      // Add filter value used in filtering search results.
      $dayOfWeek = self::$daysOfWeek[$dayValue];
      if (!array_key_exists($dayOfWeek, $groupedResults)) {
        $groupedResults[$dayOfWeek] = array();
      }
      array_push($groupedResults[$dayOfWeek], $event);
    }
    return $passesFilters ? $groupedResults : array();
  }
}
?>