<?php
App::uses('AuthenticatedAppController', 'Controller');
class NoticeController extends AuthenticatedAppController {
  public $name = 'Notice';

  public function create() {
    $this->loadModel('Notice');
    $dataToSave = $this->createDataToSave($this->request->data);
    $this->Notice->set($dataToSave);
    if ($this->Notice->validates()) {
      $result = $this->Notice->save($dataToSave,
                                    false); // Don't validate
      $newId = $this->Notice->id;
      $responseData = array(
        'id' => $newId,
        'message' => 'The notice was added successfully.'
      );
      $this->respondAsJson($responseData);
    } else {
      $responseData = array(
        'errors' => $this->Notice->validationErrors
      );
      $this->respondAsJson($responseData, false);
    }
  }

  public function delete($id) {
    $this->loadModel('Notice');
    $this->Notice->delete($id);
    $responseData = array(
      'message' =>  'The notice was deleted successfully.'
    );
    $this->respondAsJson($responseData);
  }

  public function update($id) {
    $this->loadModel('Notice');
    $dataToSave = $this->createDataToSave($this->request->data);
    $this->Notice->id = $id;
    $this->Notice->set($dataToSave);
    if ($this->Notice->validates()) {
      $this->Notice->save($dataToSave,
                          false); // Don't validate
      $responseData = array(
        'id' => $id,
        'message' => 'The notice was updated successfully.'
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
    return array(
      'description' => $requestData['description'],
      'end' => $requestData['end'],
      'locale_id' => $requestData['localeId'],
      'start' => $requestData['start']
    );
  }
}
?>