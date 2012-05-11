<?php
App::uses('AuthenticatedAppController', 'Controller');
App::uses('CakeEmail', 'Network/Email', 'Security');

class UserController extends AuthenticatedAppController {
  public $name = 'User';
  public $defaultPassword = 'Igl3sia!';

  public function add() {
    $this->layout = 'base';
    $this->set(array(
      'title_for_layout' => $this->createPageTitle('Add a User')));
    $this->render('add_edit');
  }
  
  public function create() {
    // TODO(rcruz):
    // - Send activate email - hash username and add to URL
    // - If user logs in with unactivated login, don't allow.
    // - Forgot password link - send activate email again if user clicks on it
    $this->loadModel('User');
    $dataToSave = $this->createDataToSave($this->request->data);
    $this->User->set($dataToSave);
    if ($this->User->validates()) {
      $this->User->save($dataToSave,
                          false,  // Don't validate
                          array(
                            'active',
                            'first_name',
                            'last_name',
                            'password',
                            'username'
                          ));
      $newId = $this->User->id;
      $responseData = array(
        'id' => $newId,
        'message' =>  "The user was added successfully.  The password is set to '{$this->defaultPassword}'".
      );
      $this->respondAsJson($responseData);
    } else {
      $responseData = array(
        'errors' => $this->User->validationErrors
      );
      $this->respondAsJson($responseData, false);
    }
  }

  public function edit($id) {
    $message = array_key_exists('message', $this->request->query) ?
      $this->request->query['message'] : NULL;
    $this->loadModel('User');
    $user = $this->User->find(
      'first',
      array(
        'conditions' => array(
          'User.id = ' => $id
        ),
        'fields' => array(
          'User.id',
          'User.username',
          'User.first_name',
          'User.last_name',
          'User.active',
          'User.created'
        )
      ));
    $this->set(array(
      'message' => json_encode($message),
      'user' => json_encode($user),
      'userFullName' => $user['User']['first_name'] . ' ' . $user['User']['last_name'],
      'title_for_layout' => $this->createPageTitle('Edit User')
    ));
    $this->layout = 'base';
    $isEditingSelf =
      (strcmp($user['User']['id'], $this->Auth->user('id')) == 0);
    if ($isEditingSelf) {
      $this->render('edit_self');
    } else {
      $this->render('add_edit');
    }
  }

  public function index() {
    $this->loadModel('Role');
    $this->loadModel('User');
    $users = $this->User->find(
      'all',
      array(
        'conditions' => array(
          'User.active' => 1),
        'fields' => array(
          'User.id',
          'User.username',
          'User.first_name',
          'User.last_name',
          'User.active',
          'User.created'),
        'recursive' => -1
      ));
    $this->set(array(
      'isAdministrator' => ($this->Auth->user('role_id') ==
                            $this->Role->values['ADMINISTRATOR']['id']),
      'users' => json_encode($users),
      'title_for_layout' => $this->createPageTitle('Users')));
    $this->layout = 'base';
    $this->render('index');
  }

  public function update($id) {
    $this->loadModel('User');
    $dataToSave = $this->createDataToSave($this->request->data);
    $this->User->id = $id;
    $this->User->set($dataToSave);
    if ($this->User->validates()) {
      $this->User->save($dataToSave,
                          false,  // Don't validate
                          array(
                            'active',
                            'first_name',
                            'last_name',
                            'username'
                          ));
      $responseData = array(
        'message' => 'The user was updated successfully.'
      );
      $this->respondAsJson($responseData);
    } else {
      $responseData = array(
        'errors' => $this->User->validationErrors
      );
      $this->respondAsJson($responseData, false);
    }
  }

  public function update_password($id) {
    $this->loadModel('User');
    $user = $this->User->find(
      'first',
      array(
        'conditions' => array(
          'User.id = ' => $id
        ),
        'fields' => array(
          'User.id',
          'User.password'
        )
      ));
    $errorMessage = NULL;
    $ok = true;
    if (strcmp($user['User']['password'],
               Security::hash($this->request->data['current-password'], null, true)) != 0) {
      $errorMessage = array(
        'password' => array('Your current password does not match.  Please enter your current password.')
      );
      $ok = false;
    }
    if ($ok && $this->User->validates()) {
      $this->User->id = $id;
      $dataToSave = array(
        'password' => Security::hash(
          $this->request->data['new-password'], null, true)
      );
      $this->User->set($dataToSave);
      $this->User->save($dataToSave,
                        false,  // Don't validate
                        array(
                          'password'
                        ));
      $responseData = array(
        'message' => 'Your password was updated successfully.'
      );
      $this->respondAsJson($responseData);
    } else {
      $responseData = array(
        'errors' => empty($errorMessage) ?
          $this->User->validationErrors : $errorMessage
      );
      $this->respondAsJson($responseData, false);
    }
  }

  private function createDataToSave($requestData) {
    return array(
      'active' => $requestData['active'],
      'first_name' => $requestData['first-name'],
      'last_name' => $requestData['last-name'],
      'password' => $this->defaultPassword,
      'username' => $requestData['username']
    );
  }
}
?>