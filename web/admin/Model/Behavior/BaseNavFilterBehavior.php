<?php
class BaseNavFilterBehavior extends ModelBehavior {
  public function afterSave($model, $created) {
    $data = empty($model->data['NavItem']) ? NULL : $model->data['NavItem'];
    if (!empty($data) && !empty($data['locale_id'])) {
      $model->Behaviors->disable('BaseNavFilter');
      $model->Behaviors->disable('NavTreeFilter');
      $criteria = array(
        'conditions' => array('NavItem.parent_id' => $data['parent_id']),
        'fields' => array(
          'id',
          'locale_id',
          'name',
          'ordinal'
        ),
        'order' => array('name ASC')
      );
      $siblings = $model->find('all', $criteria);
      $numSiblings = count($siblings);
      $saveOptions = array(
        'fieldList' => array('ordinal'),
        'validate' => false
      );
      for ($i = 0; $i < $numSiblings; $i++) {
        $sibling = $siblings[$i];
        $model->id = $sibling['NavItem']['id'];
        $model->save(
          array('ordinal' => $i),
          $saveOptions);
      }
      $model->Behaviors->enable('NavTreeFilter');
      $model->Behaviors->enable('BaseNavFilter');
    }
  }
}
?>