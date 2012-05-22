<?php
define('EVENT_TIME_FORMAT', '%Y-%m-%d %H:%M');

class Event extends AppModel {
  public $eventType = array(
    'SERVICE' => 1
  );
  // TODO(rcruz): Move to model.
  public $dayOfWeekMap = array(
    1 => 'SUNDAY',
    2 => 'MONDAY',
    4 => 'TUESDAY',
    8 => 'WEDNESDAY',
    16 => 'THURSDAY',
    32 => 'FRIDAY',
    64 => 'SATURDAY'
  );
  public $dayOfWeek = array(
    'SUNDAY' => array(
      'description' => 'Sunday',
      'value' => 1
    ),
    'MONDAY' => array(
      'description' => 'Monday',
      'value' => 2
    ),
    'TUESDAY' => array(
      'description' => 'Tuesday',
      'value' => 4
    ),
    'WEDNESDAY' => array(
      'description' => 'Wednesday',
      'value' => 8
    ),
    'THURSDAY' => array(
      'description' => 'Thursday',
      'value' => 16
    ),
    'FRIDAY' => array(
      'description' => 'Friday',
      'value' => 32
    ),
    'SATURDAY' => array(
      'description' => 'Saturday',
      'value' => 64
    )
  );
  // TODO(rcruz): Move to model, then i18n file.
  public $language = array(
    'en' => array(
      'description' => 'English',
      'iso' => 'en'
    ),
    'es' => array(
      'description' => 'Spanish',
      'iso' => 'es'
    ),
    'tl' => array(
      'description' => 'Tagalog',
      'iso' => 'tl'
    )
  );
  public $name = 'Event';
  public $useTable = 'event';
  public $validate = array(
    'locale_id' => array(
      'allowEmpty' => false,
      'last' => true,
      'required' => true,
      'rule' => 'numeric',
      'message' => 'Enter a locale ID.'
    ),
    'day_of_week' => array(
      'allowEmpty' => false,
      'last' => true,
      'required' => true,
      'rule' => array('validateDayOfWeek'),
      'message' => 'Enter a valid day of the week.'
    ),
    'schedule' => array(
      'allowEmpty' => false,
      'last' => true,
      'required' => true,
      'rule' => 'time',
      'message' => 'Enter a valid schedule.'
    )
  );

  public function afterFind($results, $primary) {
    if (is_null($results) ||
        count($results) == 0 ||
        !$primary ||
        !array_key_exists("Event", $results[0])) {
      return $results;
    }
    $numResults = count($results);
    for ($i = 0; $i < $numResults; $i++) {
      $result = $results[$i];
      $eventObj = $result['Event'];
      $eventObj['schedule'] =
        trim(strftime('%l:%M %p', strtotime($eventObj['schedule'])));
      $dayOfWeek = $this->dayOfWeek[
          $this->dayOfWeekMap[intval($eventObj['day_of_week'])]];
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
            "code" => $isoCode,
            "description" => $this->language[$isoCode]['description']
          );
          $eventObj['language'] = $languageObj;
        }

      } else {
        $eventObj['cws'] = false;
      }
      unset($eventObj['metadata']);
      $results[$i]["Event"] = $eventObj;
    }
    return $results;
  }

  public function beforeSave($options) {
    // Format the time according to
    // http://dev.mysql.com/doc/refman/5.1/en/datetime.html, and create
    // metadata
    if (array_key_exists('Event', $this->data)) {
      $eventData = $this->data['Event'];
      $eventData['schedule'] =
        strftime(constant('EVENT_TIME_FORMAT'),
                 strtotime('1970-01-01 ' . $eventData['schedule']));
      if (array_key_exists('metadata', $eventData) &&
          !empty($eventData['metadata'])) {
        $metadataDoc = new DOMDocument();
        $metadataDoc->loadXML('<service></service>');
        $serviceNode = $metadataDoc->getElementsByTagName('service')->item(0);
        $metadata = $eventData['metadata'];
        if (!empty($metadata['cws']) && ((boolean) $metadata['cws'])) {
          $serviceNode->appendChild($metadataDoc->createElement('cws'));
        }
        if (!empty($metadata['language'])) {
          $languageNode = $metadataDoc->createElement('language');
          $languageNode->appendChild(
            $metadataDoc->createTextNode($metadata['language']));
          $serviceNode->appendChild($languageNode);
        }
        unset($this->data['metadata']);
        $eventData['metadata'] = $metadataDoc->saveXML();
      }
      $this->data['Event'] = $eventData;
    }
    return true;
  }

  public function validateDayOfWeek($value) {
    return array_key_exists($value['day_of_week'], $this->dayOfWeekMap);
  }
}
?>