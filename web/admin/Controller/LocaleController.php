<?php
App::uses('AuthenticatedAppController', 'Controller');
class LocaleController extends AuthenticatedAppController {
  public $name = 'Locale';
  
  public function add() {
    $this->loadModel('Country');
    $criteria = array('order' => array('Country.name asc'));
    $countries = $this->Country->find('all', $criteria);
    $this->layout = 'base';
    $this->set(array(
      'countries' => json_encode($countries),
      'title_for_layout' => $this->createPageTitle('Add a Locale')));
    $this->render('add');
  }

  public function create() {
    $this->loadModel('Locale');
    $dataToSave = $this->createDataToSave($this->request->data);
    $this->Locale->set($dataToSave);
    if ($this->Locale->validates()) {
      $this->Locale->save($dataToSave,
                          false,  // Don't validate
                          array(
                            'address1',
                            'address2',
                            'city',
                            'country',
                            'latitude',
                            'longitude',
                            'name',
                            'state',
                            'zip'
                          ));
      $newId = $this->Locale->id;
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
    $this->Locale->delete($id);
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
    $this->Event->Behaviors->attach('EventsFilter');
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
    $dataToSave = $this->createDataToSave($this->request->data);
    $dataToSave['timestamp'] = new Date('Y-m-d H:i:s');
    $this->Locale->id = $id;
    $this->Locale->set($dataToSave);
    if ($this->Locale->validates()) {
      $this->Locale->save($dataToSave,
                          false,  // Don't validate
                          array(
                            'address1',
                            'address2',
                            'city',
                            'country',
                            'latitude',
                            'longitude',
                            'name',
                            'state',
                            'timestamp',
                            'zip'
                          ));
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
      'country' => $requestData['locale-country'],
      'latitude' => $requestData['locale-latitude'],
      'longitude' => $requestData['locale-longitude'],
      'name' => $requestData['locale-name'],
      'state' => $requestData['locale-state'],
      'zip' => $requestData['locale-zip']
    );
  }
}
?>