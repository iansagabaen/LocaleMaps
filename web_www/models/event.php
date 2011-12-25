<?php
class Event extends AppModel {
  var $name = 'Event';
  var $useTable = 'event';
  var $eventType = array(
    'SERVICE' => 1
  );
}
?>