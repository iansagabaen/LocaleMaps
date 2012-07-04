<?php
App::uses('AuthenticatedAppController', 'Controller');
class LocaleController extends AuthenticatedAppController {
  public $name = 'Locale';
  
  public function add() {
    $this->loadModel('Country');
    $this->loadModel('NavItem');
    $this->NavItem->Behaviors->attach('NavDropdownFilter');
    $criteria = array(
      'conditions' => array(
        'NavItem.parent_id' => NULL
      ),
      'fields' => array(
        'id',
        'level',
        'name',
        'ordinal'
      ),
      'order' => array(
        'NavItem.level asc',
        'NavItem.ordinal asc'
      ),
      'recursive' => 2
    );
    $navItems = $this->NavItem->find('all', $criteria);
    $criteria = array('order' => array('Country.name asc'));
    $countries = $this->Country->find('all', $criteria);
    $this->layout = 'base';
    $this->set(array(
      'countries' => json_encode($countries),
      'navItems' => json_encode($navItems),
      'title_for_layout' => $this->createPageTitle('Add a Locale')));
    $this->render('add');
  }

  public function create() {
    $this->loadModel('Locale');
    $this->loadModel('NavItem');
    $this->NavItem->unbindModel(array('hasMany' => array('NavItemChildren')));
    $this->NavItem->unbindModel(array('belongsTo' => array('NavItemParent')));
    $this->NavItem->Behaviors->attach('BaseNavFilter');
    $requestData = $this->request->data;
    $dataToSave = $this->createDataToSave($requestData);
    $this->Locale->set($dataToSave);
    if ($this->Locale->validates()) {
      $this->Locale->save($dataToSave,
                          false,  // Don't validate
                          array(
                            'address1',
                            'address2',
                            'city',
                            'contact',
                            'country_id',
                            'emailcontact',
                            'latitude',
                            'longitude',
                            'name',
                            'state',
                            'zip'
                          ));
      $newId = $this->Locale->id;
      if (!empty($requestData['locale-nav'])) {
        $dataToSaveNavItem = array(
          'locale_id' => $newId,
          'level' => $requestData['locale-nav-level'],
          'name' => $requestData['locale-name'],
          'parent_id' => $requestData['locale-nav']
        );
        $this->NavItem->set($dataToSaveNavItem);
        $this->NavItem->save(
          $dataToSaveNavItem,
          false, // Don't validate
          array(
            'level',
            'locale_id',
            'name',
            'parent_id'
          ));
      }
      $responseData = array(
        'id' => $newId,
        'message' =>  $dataToSave['name'] . ' locale was added successfully.'
      );
      $this->respondAsJson($responseData);
    } else {
      $responseData = array(
        'errors' => $this->Locale->validationErrors
      );
      $this->respondAsJson($responseData, false);
    }
  }

  public function delete($id) { 
    $this->loadModel('Locale');
    $this->loadModel('NavItem');
    $this->NavItem->unbindModel(
      array('hasMany' => array('NavItemChildren')), false);
    $this->NavItem->unbindModel(
      array('belongsTo' => array('NavItemParent')), false);
    $this->Locale->delete($id);
    $this->NavItem->deleteAll(
      array('locale_id' => $id),
      true);
    $responseData = array(
      'message' =>  'The locale was deleted successfully.'
    );
    $this->respondAsJson($responseData);
  }

  public function edit($id) {
    // Get the locale info (vcard info, services, and notices).
    $this->loadModel('Country');
    $this->loadModel('Locale');
    $this->loadModel('Event');
    $this->loadModel('Notice');
    $this->loadModel('NavItem');
    $this->Event->Behaviors->attach('EventsFilter');
    $this->NavItem->Behaviors->attach('NavDropdownFilter');
    $criteria = array(
      'conditions' => array(
        'NavItem.parent_id' => NULL
      ),
      'fields' => array(
        'id',
        'level',
        'name',
        'ordinal'
      ),
      'order' => array(
        'NavItem.level asc',
        'NavItem.ordinal asc'
      ),
      'recursive' => 2
    );
    $navItems = $this->NavItem->find('all', $criteria);
    $criteria = array(
      'order' => array('Country.name asc'));
    $countries = $this->Country->find('all', $criteria);
    $locale = $this->Locale->find(
      'first',
      array(
        'conditions' => array(
          'Locale.localeid = ' => $id
        )
      ));
    $locale = $locale['Locale'];
    $locale['email'] = $locale['emailcontact'];
    unset($locale['emailcontact']);
    $this->NavItem->Behaviors->disable('NavDropdownFilter');
    $this->NavItem->unbindModel(array('hasMany' => array('NavItemChildren')));
    $this->NavItem->unbindModel(array('belongsTo' => array('NavItemParent')));
    $criteria = array(
      'conditions' => array(
        'NavItem.locale_id' => $id
      ),
      'fields' => array(
        'id',
        'parent_id'
      )
    );
    $navItem = $this->NavItem->find('first', $criteria);
    $locale['nav_item'] = $navItem['NavItem'];
    $services = $this->Event->find(
      'all',
      array(
        'conditions' => array(
          'locale_id' => $id,
          'type' => $this->Event->eventType['SERVICE']
        )
      ));
    $notices = $this->Notice->find(
      'all',
      array(
        'conditions' => array(
          'locale_id' => $id
        )
      ));

    // Get days of the week, and supported languages.
    $daysOfWeek = $this->Event->dayOfWeek;
    $languages = $this->Event->language;
    $message = array_key_exists('message', $this->request->query) ?
      $this->request->query['message'] : NULL;
    $this->layout = 'base';
    $this->set(array(
      'countries' => json_encode($countries),
      'daysOfWeek' => json_encode($daysOfWeek),
      'languages' => json_encode($languages),
      'locale' => json_encode($locale),
      'localeName' => $locale['name'],
      'message' => json_encode($message),
      'navItems' => json_encode($navItems),
      'notices' => json_encode($notices),
      'services'=> json_encode($services),
      'title_for_layout' => $this->createPageTitle($locale['name'])
    ));
    $this->render("edit");
  }

  public function index() {
    $this->loadModel('Locale');
    $criteria = array(
      'fields' => array(
        'Locale.localeid as id',
        'Locale.name',
        'Locale.address1',
        'Locale.timestamp as lastUpdate',
        'Country.name'),
      'order' => array(
        'Locale.name asc'
      ),
      'recursive' => 0);
    $locales = $this->Locale->find('all', $criteria);
    $this->layout = 'base';
    $this->set(array(
      'locales' => json_encode($locales),
      'title_for_layout' => $this->createPageTitle('Locales')));
    $this->render('index');
  }

  public function update($id) {
    $this->loadModel('Locale');
    $this->loadModel('NavItem');
    $this->NavItem->unbindModel(array('hasMany' => array('NavItemChildren')));
    $this->NavItem->unbindModel(array('belongsTo' => array('NavItemParent')));
    $this->NavItem->Behaviors->attach('BaseNavFilter');
    $requestData = $this->request->data;
    $dataToSave = $this->createDataToSave($requestData);
    $dataToSave['timestamp'] = date('Y-m-d H:i:s');
    $this->Locale->id = $id;
    $this->Locale->set($dataToSave);
    if ($this->Locale->validates()) {
      $this->Locale->save($dataToSave,
                          false,  // Don't validate
                          array(
                            'address1',
                            'address2',
                            'city',
                            'contact',
                            'country_id',
                            'emailcontact',
                            'latitude',
                            'longitude',
                            'name',
                            'state',
                            'timestamp',
                            'zip'
                          ));
      // If locale-nav is empty, delete any NavItems with the locale.
      // Otherwise, update the NavItem for the locale, setting the parent
      // to the locale-nav value.
      if (empty($requestData['locale-nav'])) {
        $this->NavItem->deleteAll(
          array('locale_id' => $id),
          true);
      } else {
        $this->NavItem->updateAll(
          array(
            'level' => $requestData['locale-nav-level'],
            'parent_id' => $requestData['locale-nav']
          ),
          array('locale_id' => $id));
      }
      $responseData = array(
        'name' => $dataToSave['name'],
        'message' =>  $dataToSave['name'] . ' locale was updated successfully.'
      );
      $this->respondAsJson($responseData);
    } else {
      $responseData = array(
        'errors' => $this->Locale->validationErrors
      );
      $this->respondAsJson($responseData, false);
    }
  }

  private function createDataToSave($requestData) {
    return array(
      'address1' => $requestData['locale-address1'],
      'address2' => $requestData['locale-address2'],
      'city' => $requestData['locale-city'],
      'contact' => $requestData['locale-phone'],
      'country_id' => $requestData['locale-country'],
      'emailcontact' => $requestData['locale-email'],
      'latitude' => $requestData['locale-latitude'],
      'longitude' => $requestData['locale-longitude'],
      'name' => $requestData['locale-name'],
      'state' => $requestData['locale-state'],
      'zip' => $requestData['locale-zip']
    );
  }
}
?>