<?php
$this->append('css');
echo $this->Html->css('add_locale');
$this->end();

echo $this->element("header");
?>
<h1>Add a Locale</h1>
<div class="row">
  <div class="span12" id="locale-form-container"></div>
</div>
<?php
  echo $this->Html->script('add_locale_page', array('block' => 'script_bottom'));
  echo $this->Html->scriptBlock(
    "new localemaps.admin.AddLocalePage($countries,$navItems);",
    array('block' => 'script_bottom'));
?>
