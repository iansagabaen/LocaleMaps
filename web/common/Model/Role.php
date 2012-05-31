<?php
class Role extends AppModel {
  public $name = 'Role';
  public $useTable = 'role';
  public $values = array(
    'ADMINISTRATOR' => array(
      'id' => 1000,
      'description' => 'Administrator'
    )
  );
}
?>