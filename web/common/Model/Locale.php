<?php
class Locale extends AppModel {
  public $name = 'Locale';
  public $primaryKey = 'localeid';
  public $useTable = 'locale';

  public function afterFind($results) {
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