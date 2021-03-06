<?php
define('ALL_DAY_FILTERS', 127);
define('ALL_TIME_FILTERS', 3);

class EventsFilterBehavior extends ModelBehavior {
  public function setup(&$model, $settings = array()) {
    if (!isset($this->settings[$model->alias])) {
      $this->settings[$model->alias] = array(
        'day' => constant('ALL_DAY_FILTERS'),
        'time' => constant('ALL_TIME_FILTERS'));
    }
    $this->settings[$model->alias] = array_merge(
      $this->settings[$model->alias], (array)$settings);
  }

  public function afterFind(&$model, $results, $primary) {
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
            "description" => $model->language[$isoCode]['description']
          );
          $event['language'] = $languageObj;
        }
        unset($event['metadata']);
      } else {
        $event['cws'] = false;
      }

      // Add filter value used in filtering search results.
      $dayOfWeek = $model->dayOfWeekMap[$dayValue];
      if (!array_key_exists($dayOfWeek, $groupedResults)) {
        $groupedResults[$dayOfWeek] = array();
      }
      array_push($groupedResults[$dayOfWeek], $event);
    }
    return $passesFilters ? $groupedResults : array();
  }
}
?>