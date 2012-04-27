<?php echo $this->Html->css('add_locale');?>
<?php echo $this->element("header");?>
<div class="row">
  <div class="span12">
    <h1>Add a Locale</h1>
  </div>
</div>
<div class="row">
  <div class="span12">
    <?php echo $this->element('locale_form',
                              array(
                                'action' => '/locales/create',
                                'countries' => $countries
                              ));?>
  </div>
</div>
<?php echo $this->Html->script('add_locale_page', array('block' => 'script_bottom'));?>
<?php echo $this->Html->scriptBlock('new localemaps.admin.AddLocalePage();', array('block' => 'script_bottom'));?>
