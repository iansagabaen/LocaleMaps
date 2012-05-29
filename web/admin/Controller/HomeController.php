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
      $this->loadModel('Locale');
      $this->loadModel('Notice');
      $criteria = array(
        'fields' => array(
          'Locale.localeid as id',
          'Locale.name',
          'Locale.address1',
          'Locale.timestamp as lastUpdate',
          'Country.name'),
        'limit' => 15,
        'order' => array(
          'Locale.timestamp desc'
        ),
        'recursive' => 0);
      $recentLocales = $this->Locale->find('all', $criteria);
      $criteria['limit'] = 5;
      $criteria['order'] = array(
        'Locale.timestamp asc'
      );
      $oldLocales = $this->Locale->find('all', $criteria);
      $criteria = array(
        'order' => array(
          'end desc'
        )
      );
      $notices = $this->Notice->find('all', $criteria);
      $this->set(array(
        'oldLocales' => json_encode($oldLocales),
        'recentLocales' => json_encode($recentLocales),
        'notices' => json_encode($notices),
        $titleKey => $this->createPageTitle('Dashboard')
      ));
      $this->render('user_home');
    } else {
      $this->set(array(
        $titleKey => $this->createPageTitle()
      ));
      $this->render('guest_home');
    }
  }

  public function login() {
    if ($this->request->is('post')) {
      $this->Auth->login();
      $errorMessage = NULL;
      $user = AuthComponent::user();
      if (is_null($user)) {
        $errorMessage = 'The username or password you entered is incorrect.';
      } else {
        if (!$user['active']) {
          $this->Auth->logout();
          $errorMessage = 'Your account is no longer active.';
        }
      }
      if (!is_null($errorMessage)) {
        $this->Session->setFlash(__($errorMessage), 'flash_custom');
      }
    }
    return $this->redirect($this->Auth->redirect());
  }

  public function logout() {
    $this->redirect($this->Auth->logout());
    return $this->redirect($this->Auth->redirect());
  }
}
?>