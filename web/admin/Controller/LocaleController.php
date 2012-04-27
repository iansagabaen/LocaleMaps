<?php
class LocaleController extends AppController {
  public $name = 'Locale';
  
  function add() {
    $this->loadModel('Country');
    $criteria = array('order' => array('Country.name asc'));
    $countries = $this->Country->find('all', $criteria);
    $this->layout = 'base';
    $this->set(array(
      'countries' => $countries,
      'title_for_layout' => 'Locale Maps Administration | Add a Locale'));
    $this->render('add');
  }

  function create() {
    $this->loadModel('Locale');
    $dataToSave = $this->createDataToSave($this->request->data);
    $this->Locale->save($dataToSave,
                        false); // Don't validate
    $newId = $this->Locale->id;
    $responseData = array(
      'id' => $newId,
      'message' =>  $dataToSave['name'] . ' locale was added successfully.'
    );
    $this->respondAsJson($responseData);
  }

  function delete($id) {
    $this->loadModel('Locale');
    $this->Locale->delete($id);
    $responseData = array(
      'message' =>  'The locale was deleted successfully.'
    );
    $this->respondAsJson($responseData);
  }

  function edit($id) {
    // Get the localee info (vcard info, services, and notifications).
    $message = array_key_exists('message', $this->request->query) ?
      $this->request->query['message'] : NULL;
    $this->loadModel('Country');
    $this->loadModel('Locale');
    $criteria = array(
      'order' => array('Country.name asc'));
    $countries = $this->Country->find('all', $criteria);
    $this->loadModel('Event');
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

    // Get days of the week, and supported languages.
    $daysOfWeek = $this->Event->dayOfWeek;
    $languages = $this->Event->language;
    $this->layout = 'base';
    $this->set(array(
      'countries' => $countries,
      'daysOfWeek' => json_encode($daysOfWeek),
      'languages' => json_encode($languages),
      'locale' => $locale,
      'message' => $message,
      'services'=> json_encode($services),
      'title_for_layout' => 'Locale Maps Administration | ' . $locale['name']
    ));
    $this->render("edit");
  }

  function index() {
    $this->loadModel('Locale');
    $criteria = array(
      'order' => array(
        'Locale.name asc'
      ),
      'fields' => array(
        'Locale.localeid as id',
        'Locale.name',
        'Locale.address1',
        'Locale.timestamp as lastUpdate',
        'Country.name'));
    $locales = $this->Locale->find('all', $criteria);
    $this->layout = 'base';
    $this->set(array(
      'locales' => $locales,
      'title_for_layout' => 'Locale Maps Administration | Locales'));
    $this->render('index');
  }

  function update($id) {
    $this->loadModel('Locale');
    $dataToSave = $this->createDataToSave($this->request->data);
    $this->Locale->id = $id;
    $this->Locale->save($dataToSave,
                        false);  // Don't validate
    $responseData = array(
      'name' => $dataToSave['name'],
      'message' =>  $dataToSave['name'] . ' locale was updated successfully.'
    );
    $this->respondAsJson($responseData);
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