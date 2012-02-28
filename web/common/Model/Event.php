<?php
class Event extends AppModel {
  public $name = 'Event';
  public $useTable = 'event';
  public $eventType = array(
    'SERVICE' => 1
  );
}
?>