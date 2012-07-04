<?php
App::uses('AuthenticatedAppController', 'Controller');
class NavController extends AuthenticatedAppController {
  public $name = 'Nav';

  public function create() {
    
  }

  public function delete($id) {
    
  }

  public function index() {
    $this->loadModel('Locale');
    $this->loadModel('NavItem');
    $this->NavItem->unbindModel(array('hasMany' => array('NavItemChildren')));
    $this->NavItem->unbindModel(array('belongsTo' => array('NavItemParent')));
    $this->NavItem->Behaviors->attach('NavTreeFilter');
    $criteria = array(
      'conditions' => array(
        'NavItem.level = ' => 0
      ),
      'fields' => array(
        'id',
        'name',
        'ordinal'
      ),
      'order' => array(
        'NavItem.ordinal ASC'
      )
    );
    $navItems = $this->NavItem->find('all', $criteria);
    $criteria = array(
      'fields' => array(
        'Locale.localeid as id',
        'Locale.name'),
      'order' => array(
        'Locale.name asc'
      ),
      'recursive' => 0);
    $locales = $this->Locale->find('all', $criteria);
    $this->layout = 'base';
    $this->set(array(
      'locales' => json_encode($locales),
      'navItems' => json_encode($navItems),
      'title_for_layout' => $this->createPageTitle('Global Nav')));
    $this->render('index');
  }

  public function retrieve($id) {
    $this->loadModel('NavItem');
    $this->NavItem->unbindModel(array('hasMany' => array('NavItemChildren')));
    $this->NavItem->unbindModel(array('belongsTo' => array('NavItemParent')));
    $this->NavItem->Behaviors->attach('NavTreeFilter');
    $criteria = array(
      'conditions' => array(
        'parent_id' => $id
      ),
      'fields' => array(
        'id',
        'locale_id',
        'name',
        'ordinal',
        'parent_id'
      ),
      'order' => array(
        'ordinal ASC'
      )
    );
    $navItems = $this->NavItem->find('all', $criteria);
    $responseData = array(
      'children' => $navItems
    );
    $this->respondAsJson($responseData);
  }

  public function update($id) {
    $this->loadModel('NavItem');
    $this->NavItem->Behaviors->attach('NavTreeFilter');
    // false will keep unbinding applied to all find() operations throughout
    // the action lifecycle.
    $this->NavItem->unbindModel(
      array('hasMany' => array('NavItemChildren')), false);
    $this->NavItem->unbindModel(
      array('belongsTo' => array('NavItemParent')), false);
    $dataToSave = $this->createDataToSave($this->request->data);
    $this->NavItem->id = $id;
    $this->NavItem->set($dataToSave);
    if ($this->NavItem->validates()) {
      $this->NavItem->save($dataToSave,
                           false); // Don't validate
      $responseData = array(
        'id' => $id,
        'parent_id' => empty($this->request->data['parent_id']) ?
          NULL : $this->request->data['parent_id'],
        'message' => 'The navigation menu item was updated successfully.'
      );
      $conditions = array();
      if (empty($this->request->data['parent_id'])) {
        $conditions['level'] = 0;
      } else {
        $conditions['parent_id'] = $this->request->data['parent_id'];
      }
      $criteria = array(
        'conditions' => $conditions,
        'fields' => array(
          'id',
          'locale_id',
          'name',
          'ordinal',
          'parent_id'
        ),
        'order' => array(
          'ordinal ASC'
        )
      );
      $siblings = $this->NavItem->find('all', $criteria);
      $responseData['siblings'] = $siblings;
      $this->respondAsJson($responseData);
    } else {
      $responseData = array(
        'errors' => $this->NavItem->validationErrors
      );
      $this->respondAsJson($responseData, false);
    }
  }

  private function createDataToSave($requestData) {
    $dataToSave = array();
    $dataToSave['parent_id'] = $requestData['parent_id'];
    if (empty($requestData['locale_id'])) {
      $dataToSave['name'] = $requestData['name'];
      $dataToSave['ordinal'] = $requestData['ordinal'];
      $dataToSave['old_ordinal'] = $requestData['ordinal_old'];

    } else {
      $localeId = $requestData['locale_id'];
      $dataToSave['locale_id'] = $localeId;
      $this->loadModel('Locale');
      $locale = $this->Locale->find(
        'first',
        array(
          'conditions' => array(
            'Locale.localeid = ' => $localeId
          )
        ));
      $dataToSave['name'] = $locale['Locale']['name'];
    }
    return $dataToSave;
  }
}
?>