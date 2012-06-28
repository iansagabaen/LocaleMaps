<?php
class EventsFilterBehavior extends ModelBehavior {
  public function afterFind(&$model, $results, $primary) {
    if (is_null($results) ||
        count($results) == 0 ||
        !$primary ||
        (array_key_exists(0, $results) && !array_key_exists('Event', $results[0]))
      ) {
      return $results;
    }
    $numResults = count($results);
    for ($i = 0; $i < $numResults; $i++) {
      $result = $results[$i];
      $eventObj = $result['Event'];
      $eventObj['schedule'] =
        trim(strftime('%l:%M %p', strtotime($eventObj['schedule'])));
      $dayOfWeek = $model->dayOfWeek[
          $model->dayOfWeekMap[intval($eventObj['day_of_week'])]];
      $eventObj['day_of_week'] = $dayOfWeek;
      if (!is_null($eventObj['metadata'])) {
        $metadata = new DOMDocument();
        $metadata->loadXML($eventObj['metadata']);
        $eventObj['cws'] =
          !is_null($metadata->getElementsByTagName('cws')->item(0));
        $language = $metadata->getElementsByTagName('language')->item(0);
        if (!is_null($language)) {
          $isoCode = $language->textContent;
          $languageObj = array(
            'code' => $isoCode,
            'description' => $model->language[$isoCode]['description']
          );
          $eventObj['language'] = $languageObj;
        }

      } else {
        $eventObj['cws'] = false;
      }
      unset($eventObj['metadata']);
      $results[$i]['Event'] = $eventObj;
    }
    return $results;
  }
}
?>