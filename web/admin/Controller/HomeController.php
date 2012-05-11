<?php
class HomeController extends AppController {
  public $name = 'Home';
  public $components = array('Session');
  
  public function beforeFilter() {
    parent::beforeFilter();
    $this->Auth->allow('index', 'login', 'logout');
  }

  public function index() {
    $this->layout = 'base';
    $titleKey = 'title_for_layout';
    if ($this->Auth->loggedIn()) {
      $this->set($this->createPageTitle('Dashboard'));
      $this->render('user_home');
    } else {
      $this->set($this->createPageTitle());
      $this->render('guest_home');
    }
  }

  public function login() {
    if ($this->request->is('post')) {
      // try {
        $this->Auth->login();
      // } catch (Exception $e) { }
    }
    return $this->redirect($this->Auth->redirect());
  }

  public function logout() {
    $this->redirect($this->Auth->logout());
    return $this->redirect($this->Auth->redirect());
  }
}
?>