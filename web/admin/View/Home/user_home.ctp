<?php
echo $this->append('css');
echo $this->Html->css('home_index');
echo $this->end();

echo $this->element('header');
?>
<h1>Dashboard</h1>
<div class="row">
  <div class="span6">
    <h2>Recently Updated Locales</h2>
    <div id="locales"></div>
  </div>
  <div class="span6">
    <h2>Notifications</h2>
    <div id="notices"></div>
  </div>
</div>
<?php
  echo $this->Html->script('user_home_page', array('block' => 'script_bottom'));
  echo $this->Html->scriptBlock(
    "new localemaps.admin.UserHomePage($locales,$notices);",
    array('block' => 'script_bottom'));
?>