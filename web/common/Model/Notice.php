<?php
define('NOTICE_TIME_FORMAT', '%Y-%m-%d %H:%M');

class Notice extends AppModel {
  public $name = 'Notice';
  public $useTable = 'notice';
  public $validate = array(
    'end' => array(
      'message' => 'Enter an end date.',
      'required' => true,
      'rule' => array('date', 'mdy')
    ),
    'description' => array(
      'message' => 'Enter a description.',
      'required' => true,
      'rule' => 'notEmpty'
    ),
    'start' => array(
      'message' => 'Enter a start date.',
      'required' => true,
      'rule' => array('date', 'mdy')
    )
  );

  public function afterFind($results, $primary) {
    if (is_null($results) ||
        count($results) == 0 ||
        !$primary ||
        !array_key_exists('Notice', $results[0])) {
      return $results;
    }
    $numResults = count($results);
    for ($i = 0; $i < $numResults; $i++) {
      $result = $results[$i];
      $noticeObj = $result['Notice'];
      if (array_key_exists('end', $noticeObj)) {
        $noticeObj['end'] =
          trim(strftime('%m/%d/%Y', strtotime($noticeObj['end'])));
      }
      if (array_key_exists('start', $noticeObj)) {
        $noticeObj['start'] =
          trim(strftime('%m/%d/%Y', strtotime($noticeObj['start'])));
      }
      $results[$i]['Notice'] = $noticeObj;
    }
    return $results;
  }

  public function beforeSave($options) {
    if (array_key_exists('Notice', $this->data)) {
      // Format the time according to
      // http://dev.mysql.com/doc/refman/5.1/en/datetime.html
      $noticeData = $this->data['Notice'];
      $noticeData['end'] =
        strftime(constant('NOTICE_TIME_FORMAT'),
                 strtotime($noticeData['end'] . ' 00:00'));
      $noticeData['start'] =
        strftime(constant('NOTICE_TIME_FORMAT'),
                 strtotime($noticeData['start'] . ' 00:00'));
      $this->data['Notice'] = $noticeData;
    }
    return true;
  }
}
?>