<?php
class User extends AppModel {
  public $belongsTo = array(
    'Role' => array(
      'className' => 'Role',
      'foreignKey' => 'role_id'
    )
  );
  public $name = 'User';
  public $useTable = 'user';
  public $validate = array(
    'username' => array(
      'username-required' => array(
        'rule' => array('notEmpty'),
        'message' => 'A username is required.'
      ),
      'username-unique' => array(
        'rule' => array('assertUniqueUsername'),
        'message' => 'The username/email you entered is already taken.'
      )
    ),
    'password' => array(
      'required' => array(
        'rule' => array('notEmpty'),
        'message' => 'A password is required.'
      )
    )
  );

  public function assertUniqueUsername($data) {
    // Search for a user with the existing username.
    // - If that user exists,
    //   - If we're dealing with an existing user (ie. ID is set)
    //     - If the IDs are equal (we're updating the same user); return true
    //     - Otherwise (different users), return if the usernames are equal.
    //   - If we're dealing with a new user (ie. no ID is set)
    //     - Return if the usernames are equal.
    // - Return true (no user exists with the username)
    $existingUser = $this->find(
      'first',
      array(
        'conditions' => array(
          'User.username' => $data['username']
        ),
        'recursive' => -1
      ));
    if (!empty($existingUser)) {
      if (!empty($this->id)) {
        return (
          (strcmp($this->id, $existingUser['User']['id']) == 0) ||
          (
            (strcmp($this->data['User']['username'], $existingUser['User']['username']) != 0)
          )
        );
      } else {
        return (strcmp($this->data['User']['username'], $existingUser['User']['username']) != 0);
      }
    }
    return true;
  }
}
?>