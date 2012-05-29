<?php
echo $this->append('css');
echo $this->Html->css('home_index');
echo $this->end();

echo $this->element('header');
?>
<h1>Dashboard</h1>
<div class="row">
  <div class="span7">
    <h2>Recently Updated Locales</h2>
    <div id="recent-locales"></div>
  </div>
  <div class="span5">
    <h2>Notifications</h2>
    <div id="notices"></div>
  </div>
</div>
<div class="row">
  <div class="span7">
    <h2>Locales That Need Updating</h2>
    <div id="old-locales"></div>
  </div>
  <div class="span5"></div>
</div>
<?php
  echo $this->Html->script('user_home_page', array('block' => 'script_bottom'));
  echo $this->Html->scriptBlock(
    "new localemaps.admin.UserHomePage($recentLocales,$oldLocales,$notices);",
    array('block' => 'script_bottom'));
?>