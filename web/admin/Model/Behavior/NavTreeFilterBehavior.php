<?php
class NavTreeFilterBehavior extends ModelBehavior {
  public function afterFind(&$model, $results, $primary) {
    if (is_null($results) ||
        count($results) == 0 ||
        !$primary ||
        (array_key_exists(0, $results) && !array_key_exists('NavItem', $results[0]))
      ) {
      return $results;
    }
    $numResults = count($results);
    $treeResults = array();
    for ($i = 0; $i < $numResults; $i++) {
      $result = $results[$i];
      $navItemObj = $result['NavItem'];
      $treeNode = array(
        'id' => $navItemObj['id'],
        'label' => $navItemObj['name']
      );
      if (empty($navItemObj['locale_id'])) {
        $children = array(
          array(
            'label' => ''
          )
        );
        $treeNode['children'] = $children;
        $treeNode['ordinal'] = $navItemObj['ordinal'];
      } else {
        $treeNode['locale_id'] = $navItemObj['locale_id'];
      }
      if (!empty($navItemObj['parent_id'])) {
        $treeNode['parent_id'] = $navItemObj['parent_id'];
      }
      array_push($treeResults, $treeNode);
    }
    return $treeResults;
  }

  public function afterSave($model, $created) {
    $data = empty($model->data['NavItem']) ? NULL : $model->data['NavItem'];

    if (!empty($data) && !empty($data['locale_id'])) {
      $model->Behaviors->disable('NavTreeFilter');
      $criteria = array(
        'conditions' => array('parent_id' => $data['parent_id']),
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
    }
  }

  public function beforeSave($model) {
    $data = empty($model->data['NavItem']) ? NULL : $model->data['NavItem'];
    if (!empty($data) && empty($data['locale_id'])) {
      $originalId = $model->id;
      $originalData = $model->data;
      $model->Behaviors->disable('NavTreeFilter');
      // If the new ordinal is greater than the number of NavItems at the same
      // level with the same parent, set the new ordinal to the number of
      // NavItems - 1
      $conditions = array();
      if (empty($data['parent_id'])) {
        $conditions['level'] = 0;
      } else {
        $conditions['parent_id'] = $data['parent_id'];
      }
      $numSiblings = $model->find(
        'count',
        array('conditions' => $conditions));
      if ($data['ordinal'] >= ($numSiblings - 1)) {
        $data['ordinal'] = $numSiblings - 1;
      }

      // If $newOrdinal == $currentOrdinal, do nothing (ie. exit).
      // If $newOrdinal > $currentOrdinal, get all items from
      // ($currentOrdinal + 1) through $newOrdinal, and decrement the
      // ordinal for each NavItem.
      // Otherwise, get all items from $newOrdinal to ($currentOrdinal - 1)
      // and increment the ordinal each NavItem
      $currentOrdinal = intval($data['old_ordinal']);
      $newOrdinal = intval($data['ordinal']);
      if ($currentOrdinal == $newOrdinal) {
        $model->id = $originalId;
        $model->data = $originalData;
        $model->Behaviors->enable('NavTreeFilter');
        return true;
      }
      $criteria = array(
        'fields' => array(
          'id',
          'locale_id',
          'name',
          'ordinal'
        ),
        'order' => array('ordinal ASC'),
        'recursive' => 0
      );
      $addedValue = NULL;
      if ($newOrdinal > $currentOrdinal) {
        // Get all items ($currentOrdinal + 1) through $newOrdinal, and
        // decrement each NavItem.
        $conditions = array(
          'ordinal >' => $currentOrdinal,
          'ordinal <=' => $newOrdinal
        );
        $addedValue = -1;
      } else {
        // Get all items $newOrdinal through ($currentOrdinal - 1), and
        // increment each NavItem.
        $conditions = array(
          'ordinal >=' => $newOrdinal,
          'ordinal <' => $currentOrdinal
        );
        $addedValue = 1;
      }
      if (empty($data['parent_id'])) {
        $conditions['level'] = '0';
      } else {
        $conditions['parent_id'] = $data['parent_id'];
      }
      $criteria['conditions'] = $conditions;
      $siblings = $model->find('all', $criteria);
      $saveOptions = array(
        'fieldList' => array('ordinal'),
        'validate' => false
      );
      foreach ($siblings as $sibling) {
        $navItemObj = $sibling['NavItem'];
        $model->id = $navItemObj['id'];
        $model->save(
          array(
            'ordinal' => intval($navItemObj['ordinal']) + $addedValue
          ),
          $saveOptions);
      }
      // Be nice and restore the original data and enable the Behavior.
      $model->id = $originalId;
      $model->data = $originalData;
      $model->Behaviors->enable('NavTreeFilter');
    }
    return true;
  }
}
?>