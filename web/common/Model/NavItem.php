<?php
class NavItem extends AppModel {
  public $name = 'NavItem';
  public $hasMany = array(
    'NavItem' => array(
      'className' => 'NavItem',
      'foreignKey' => 'parent_id'
    )
  );
  public $primaryKey = 'id';
  public $useTable = 'nav_item';
  public $validate = array(
    'name' => array(
      'allowEmpty' => false,
      'message' => 'Enter a name.',
      'required' => true,
      'rule' => 'notEmpty'
    )
  );
}
?>