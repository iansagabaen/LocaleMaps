<?php
$isEdit = isset($user);

$this->append('css');
echo $this->Html->css('add_edit_user');
$this->end();

echo $this->element('header');
?>
<div class="row">
  <div class="span12">
    <?php if ($isEdit):?>
    <h1>Edit User</h1>
    <?php else:?>
    <h1>Add User</h1>
    <?php endif;?>
  </div>
</div>
<div class="row">
  <div class="span12" id="user-form-container"></div>
</div>
<?php
  if ($isEdit) {
    echo $this->Html->script('edit_user_page', array('block' => 'script_bottom'));
    echo $this->Html->scriptBlock("new localemaps.admin.EditUserPage($user, $message);", array('block' => 'script_bottom'));
  } else {
    echo $this->Html->script('add_user_page', array('block' => 'script_bottom'));
    echo $this->Html->scriptBlock("new localemaps.admin.AddUserPage();", array('block' => 'script_bottom'));
  }
?>