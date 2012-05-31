<?php
class NoticesFilterBehavior extends ModelBehavior {
  public function afterFind(&$model, $results, $primary) {
    if (is_null($results) ||
        count($results) == 0 ||
        !$primary ||
        (array_key_exists(0, $results) && !array_key_exists('Notice', $results[0]))
      ) {
      return $results;
    }
    $newResults = array();
    foreach ($results as $result) {
      $noticeObj = $result['Notice'];
      array_push($newResults, $noticeObj);
    }
    return $newResults;
  }
}
?>