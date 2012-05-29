<?php
class AuthenticatedAppController extends AppController {
  public function beforeFilter() {
    if (!$this->Auth->user('id')) {
      return $this->redirect($this->Auth->redirect());
    }
  }

  protected function setLocaleLastUpdatedDate($id) {
    $this->loadModel('Locale');
    $this->Locale->id = $id;
    $dataToSave = array(
      'timestamp' => date('Y-m-d H:i:s')
    );
    $this->Locale->set($dataToSave);
    $this->Locale->save($dataToSave, false, array('timestamp'));
  }
}
?>