<?php
class Locale extends AppModel {
  public $belongsTo = array(
    'Country' => array(
      'className' => 'Country',
      'foreignKey' => 'country_id'
    )
  );
  public $name = 'Locale';
  public $primaryKey = 'localeid';
  public $useTable = 'locale';
  public $validate = array(
    'address1' => array(
      'allowEmpty' => false,
      'message' => "Enter the locale's address1 line.",
      'required' => true
    ),
    'latitude' => array(
      'allowEmpty' => false,
      'message' => "Enter the locale's latitude.",
      'required' => true
    ),
    'longitude' => array(
      'allowEmpty' => false,
      'message' => "Enter the locale's longitude.",
      'required' => true
    ),
    'name' => array(
      'allowEmpty' => false,
      'message' => "Enter the locale's name.",
      'required' => true
    )
  );

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