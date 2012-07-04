<?php
class LocalesFilterBehavior extends ModelBehavior {
  public function afterFind(&$model, $results, $primary) {
    if (is_null($results) ||
        count($results) == 0 ||
        !$primary ||
        (array_key_exists(0, $results) && !array_key_exists('Locale', $results[0]))
      ) {
      return $results;
    }
    $newResults = array();
    foreach ($results as $result) {
      $localeObj = $result['Locale'];
      array_push($newResults, $localeObj);
    }
    return $newResults;
  }
}
?>