<?php echo $this->Html->css('edit_locale');?>
<?php echo $this->element("header");?>
<div class="row">
  <div class="span12">
    <h1>Locale: <span class="locale-name"><?php echo $locale['name']?></span></h1>
  </div>
</div>
<div class="row">
  <div class="span12">
    <div class="tabbable tabs-left">
      <ul class="nav nav-tabs" id="edit-locale-tabs">
        <li><a href="#location" data-toggle="tab">Location</a></li>
        <li><a href="#services" data-toggle="tab">Services</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane" id="location">
          <?php echo $this->element('locale_form',
                                    array(
                                      'action' => '/locales/update/' . $locale['localeid'],
                                      'countries' => $countries,
                                      'locale' => $locale,
                                      'message' => $message
                                    ));?>
        </div>
        <div class="tab-pane" id="services">
          <h2>Services</h2>
          <a class="add-service btn btn-mini" href="#">Add</a>
          <div id="services-container"></div>
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
<?php echo $this->Html->script('edit_locale_page', array('block' => 'script_bottom'));?>
<?php echo $this->Html->scriptBlock(
  "new localemaps.admin.EditLocalePage({$locale['localeid']},$services,$daysOfWeek,$languages);",
  array('block' => 'script_bottom'));
?>
