<?php echo $this->element('header', array('isUsersPage' => true));?>
<h1>Users</h1>
<div class="row">
  <div class="span12" id="users-container"></div>
</div>
<div class="fade modal confirmation-modal">
  <div class="modal-header">
    <a class="close" data-dismiss="modal" title="Close">x</a>
    <h3 class="header-message"></h3>
  </div>
  <div class="modal-body"></div>
  <div class="modal-footer">
    <a class="btn cancel" href="#">Cancel</a>
    <a class="btn btn-primary submit">I'm sure</a>
  </div>
</div>
<?php
  echo $this->Html->script('users_page', array('block' => 'script_bottom'));
  echo $this->Html->scriptBlock("new localemaps.admin.UsersPage($users);", array('block' => 'script_bottom'));
?>
