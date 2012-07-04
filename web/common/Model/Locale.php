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
      'required' => true,
      'rule' => 'notEmpty'
    ),
    'latitude' => array(
      'latitude-required' => array(
        'allowEmpty' => false,
        'message' => "Enter a valid latitude.",
        'required' => true,
        'rule' => 'numeric'
      ),
      'latitude-geq' => array(
        'message' => 'Enter a latitude between -90 and 90.',
        'rule' => array('comparison', '>=', -90)
      ),
      'latitude-leq' => array(
        'message' => 'Enter a latitude between -90 and 90.',
        'rule' => array('comparison', '<=', 90)
      )
    ),
    'longitude' => array(
      'longitude-required' => array(
        'allowEmpty' => false,
        'message' => 'Enter a valid longitude.',
        'required' => true,
        'rule' => 'numeric'
      ),
      'longitude-geq' => array(
        'message' => 'Enter a longitude between -180 and 180.',
        'rule' => array('comparison', '>=', -180)
      ),
      'longitude-leq' => array(
        'message' => 'Enter a longitude between -180 and 180.',
        'rule' => array('comparison', '<=', 180)
      )
    ),
    'name' => array(
      'allowEmpty' => false,
      'message' => "Enter the locale's name.",
      'required' => true,
      'rule' => 'notEmpty'
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