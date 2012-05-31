<?php
$isEdit = isset($locale);
?>
<form action="<?php echo $action;?>" class="form-horizontal<?php echo $isEdit ? ' edit-locale' : ' add-locale';?>" id="locale-form" method="POST">
  <div class="alert alert-success locale-form-success-alert<?php if (empty($message)) { echo ' hidden'; }?>">
    <a class="close" title="Close">×</a>
    <span class="message"><?php if (!empty($message)) { echo h($message); }?></span>
  </div>
  <div class="alert alert-error locale-form-error-alert hidden">
    <a class="close" title="Close">×</a>
    <span class="message"></span>
  </div>
  <div class="control-group">
    <label class="control-label" for="locale-name">Name</label>
    <div class="controls">
      <input class="required" id="locale-name" name="locale-name" type="text"<?php if ($isEdit) { echo " value=\"{$locale['name']}\"";}?>>
      <span class="help-inline">Enter the locale's name.</span>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="locale-address1">Address Line1</label>
    <div class="controls">
      <input class="required" id="locale-address1" name="locale-address1" type="text"<?php if ($isEdit) { echo " value=\"{$locale['address1']}\"";}?>>
      <span class="help-inline">Enter the locale's address1 line.</span>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="locale-address2">Address Line2</label>
    <div class="controls">
      <input id="locale-address2" name="locale-address2" type="text"<?php if ($isEdit) { echo " value=\"{$locale['address2']}\"";}?>>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="locale-city">City</label>
    <div class="controls">
      <input id="locale-city" name="locale-city" type="text"<?php if ($isEdit) { echo " value=\"{$locale['city']}\"";}?>>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="locale-state">State/Province/Region</label>
    <div class="controls">
      <input id="locale-state" name="locale-state" type="text"<?php if ($isEdit) { echo " value=\"{$locale['state']}\"";}?>>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="locale-zip">Zip</label>
    <div class="controls">
      <input id="locale-zip" name="locale-zip" type="text"<?php if ($isEdit) { echo " value=\"{$locale['zip']}\"";}?>>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="locale-city">Country</label>
    <div class="controls">
      <select id="locale-country" name="locale-country">
        <option value=""></option>
        <?php
        foreach($countries as $country):
          $country = $country['Country'];
        ?>
          <?php if ($isEdit && ($country['id'] == $locale['country_id'])):?>
          <option value="<?php echo $country['id']?>" selected="selected"><?php echo $country['name']?></option>
          <?php else:?>
          <option value="<?php echo $country['id']?>"><?php echo $country['name']?></option>
          <?php endif;?>
        <?php endforeach;?>
      </select>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="locale-latitude">Latitude</label>
    <div class="controls">
      <input class="required" id="locale-latitude" name="locale-latitude" type="text"<?php if ($isEdit) { echo " value=\"{$locale['latitude']}\"";}?>>
      <span class="help-inline">Enter the locale's latitude.</span>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="locale-longitude">Longitude</label>
    <div class="controls">
      <input class="required" id="locale-longitude" name="locale-longitude" type="text"<?php if ($isEdit) { echo " value=\"{$locale['longitude']}\"";}?>>
      <span class="help-inline">Enter the locale's longitude.</span>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="locale-email">Email</label>
    <div class="controls">
      <input id="locale-email" name="locale-email" type="text"<?php if ($isEdit) { echo " value=\"{$locale['email']}\"";}?>>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="locale-phone">Phone Number</label>
    <div class="controls">
      <input id="locale-phone" name="locale-phone" type="text"<?php if ($isEdit) { echo " value=\"{$locale['contact']}\"";}?>>
    </div>
  </div>
  <div class="form-actions">
    <?php if ($isEdit):?>
    <button class="btn btn-primary" type="submit">Update</button>
    <?php else:?>
    <button class="btn btn-primary" type="submit">Add</button>
    <?php endif;?>
  </div>
</form>