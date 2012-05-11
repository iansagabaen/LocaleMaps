<?php
App::uses('AuthenticatedAppController', 'Controller');
class EventController extends AuthenticatedAppController {
  public $name = 'Event';

  public function create() {
    $this->loadModel('Event');
    $dataToSave = $this->createDataToSave($this->request->data);
    $this->Event->set($dataToSave);
    if ($this->Event->validates()) {
      $this->Event->save($dataToSave,
                         false); // Don't validate
      $newId = $this->Event->id;
      $responseData = array(
        'id' => $newId,
        'message' => 'The worship service was added successfully.'
      );
      $this->respondAsJson($responseData);
    } else {
      $responseData = array(
        'errors' => $this->Event->validationErrors
      );
      $this->respondAsJson($responseData, false);
    }
  }

  public function delete($id) {
    $this->loadModel('Event');
    $this->Event->delete($id);
    $responseData = array(
      'message' =>  'The worship service was deleted successfully.'
    );
    $this->respondAsJson($responseData);
  }

  public function update($id) {
    $this->loadModel('Event');
    $dataToSave = $this->createDataToSave($this->request->data);
    $this->Event->id = $id;
    $this->Event->set($dataToSave);
    if ($this->Event->validates()) {
      $this->Event->save($dataToSave,
                         false); // Don't validate
      $responseData = array(
        'id' => $id,
        'message' => 'The worship service was updated successfully.'
      );
      $this->respondAsJson($responseData);
    } else {
      $responseData = array(
        'errors' => $this->Event->validationErrors
      );
      $this->respondAsJson($responseData, false);
    }
  }

  private function createDataToSave($requestData) {
    $dataToSave = array(
      'day_of_week' => $requestData['day_of_week'],
      'locale_id' => intval($requestData['localeId']),
      'schedule' => $requestData['schedule'],
      'type' => $this->Event->eventType['SERVICE'],
      'metadata' => array());
    if (!empty($requestData['cws'])) {
      $dataToSave['metadata']['cws'] = $requestData['cws'];
    }
    if (!empty($requestData['language'])) {
      $dataToSave['metadata']['language'] = $requestData['language'];
    }
    return $dataToSave;
  }
}
?>