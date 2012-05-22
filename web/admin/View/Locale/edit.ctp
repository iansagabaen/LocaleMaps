<?php
$this->append('css');
echo $this->Html->css('edit_locale');
$this->end();

echo $this->element('header');
?>
<div class="row">
  <div class="span12">
    <h1>Locale: <span class="locale-name"><?php echo $localeName?></span></h1>
  </div>
</div>
<div class="row">
  <div class="span12">
    <div class="tabbable tabs-left">
      <ul class="nav nav-tabs" id="edit-locale-tabs">
        <li><a href="#location" data-toggle="tab">Location</a></li>
        <li><a href="#services" data-toggle="tab">Services</a></li>
        <li><a href="#notices" data-toggle="tab">Notices</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane" id="location"></div>
        <div class="tab-pane" id="services">
          <h2>Services</h2>
          <a class="add-service btn btn-mini" href="#">Add</a>
          <div id="services-container"></div>
        </div>
        <div class="tab-pane" id="notices">
          <h2>Notices</h2>
          <a class="add-notice btn btn-mini" href="#">Add</a>
          <div id="notices-container"></div>
        </div>
      </div>
    </div>
    <div class="fade modal error-modal">
      <div class="modal-header">
        <a class="close" data-dismiss="modal" title="Close">x</a>
        <h3 class="header-message">Error</h3>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer">
        <a class="btn btn-primary ok">Ok</a>
      </div>
    </div>
  </div>
</div>
<?php
  echo $this->Html->script('edit_locale_page', array('block' => 'script_bottom'));
  echo $this->Html->scriptBlock(
    "new localemaps.admin.EditLocalePage($locale,$services,$notices,$countries,$daysOfWeek,$languages,$message);",
    array('block' => 'script_bottom'));
?>
