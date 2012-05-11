<?php
$this->append('css');
echo $this->Html->css('add_edit_user');
$this->end();

echo $this->element('header');
?>
<div class="row">
  <div class="span12">
    <h1>User: <span class="user-full-name"><?php echo $userFullName?></span></h1>
  </div>
</div>
<div class="row">
  <div class="span12">
    <div class="tabbable tabs-left">
      <ul class="nav nav-tabs" id="edit-self-tabs">
        <li><a href="#profile" data-toggle="tab">Profile</a></li>
        <li><a href="#password" data-toggle="tab">Password</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane" id="profile"></div>
        <div class="tab-pane" id="password">
          <h2>Password</h2>
          <div id="password-container"></div>
        </div>
      </div>
    </div>
  </div>
</div>
<?php
  echo $this->Html->script('edit_self_page', array('block' => 'script_bottom'));
  echo $this->Html->scriptBlock("new localemaps.admin.EditSelfPage($user);", array('block' => 'script_bottom'));
?>
