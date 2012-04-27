<?php echo $this->element("header", array("isLocalesPage" => true));?>
<h1>Locales</h1>
<div class="row">
  <div class="span12">
    <?php
    $numLocales = count($locales);
    if ($numLocales > 0):?>
    <p><?php echo $numLocales . (($numLocales > 1) ? " locales " : " locale ") . 'found.';?></p>
    <table class="table table-striped" id="locales">
      <tr>
        <th class="actions-header">Actions</th>
        <th>Name</th>
        <th>Address</th>
        <th>Country</th>
        <th>Last Update</th>
      </tr>
      <?php
      for($i = 0; $i < $numLocales; $i++):
      $localeObj = $locales[$i];
      $locale = $localeObj['Locale'];
      $country = $localeObj['Country'];
      $editUrl = "/locales/edit/{$locale['id']}";
      ?>
      <tr data-lm-id="<?php echo $locale['id'];?>">
        <td class="actions">
          <a class="edit" href="<?php echo $editUrl;?>" title="Edit"><i class="icon-edit"></i></a>
          <a class="delete" href="#" title="Delete"><i class="icon-trash"></i></a>
        </td>
        <td><a class="edit locale-name" href="<?php echo $editUrl;?>"><?php echo $locale['name'];?></a></td>
        <td><?php echo $locale['address1'];?></td>
        <td><?php echo $country['name'];?></td>
        <td><?php echo $locale['lastUpdate'];?></td>
      </tr>
      <?php endfor;?>
    </table>
    <?php else:?>
    <p>There are no locales in the system.  <a href="#">Click here to add a locale.</a></p>
    <?php endif;?>
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
<?php echo $this->Html->script('locales_page', array('block' => 'script_bottom'));?>
<?php echo $this->Html->scriptBlock('new localemaps.admin.LocalesPage();', array('block' => 'script_bottom'));?>
