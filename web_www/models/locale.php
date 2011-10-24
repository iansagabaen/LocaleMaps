<?php
class Locale extends AppModel {
  var $name = 'Locale';
  var $primaryKey = 'localeid';
  var $useTable = 'locale';

  function afterFind($results) {
    if (array_key_exists('locale', $results)) {
      return $results['locale'];
    } else if (is_array($results)) {
      $newResults = array();
      foreach ($results as $result) {
        array_push($newResults, (array_key_exists('locale', $result)) ? $result['locale'] : $result);
      }
      return $newResults;
    }
    return null;
  }
}
?>