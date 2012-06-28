<?php
$this->append('css');
echo $this->Html->css('global_nav');
$this->end();

echo $this->element('header', array('isGlobalNavPage' => true));
?>
<h1>Global Nav</h1>
<div class="row">
  <div class="span5">
    <div id="nav-tree"></div>
  </div>
  <div class="span7" id="forms-container">
    <div class="district-container hidden">
    </div>
    <div class="locale-container hidden">
    </div>
  </div>
</div>
<?php
echo $this->Html->script('global_nav_page', array('block' => 'script_bottom'));
echo $this->Html->scriptBlock("new localemaps.admin.GlobalNavPage($navItems, $locales);", array('block' => 'script_bottom'));
?>