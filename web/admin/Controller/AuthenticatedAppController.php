<?php
class AuthenticatedAppController extends AppController {
  public function beforeFilter() {
    if (!$this->Auth->user('id')) {
      return $this->redirect($this->Auth->redirect());
    }
  }
}
?>