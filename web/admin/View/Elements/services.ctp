<?php
$hasServices = true;
if (!isset($services) || count($services) == 0):
  $hasServices = false;
?>
<p class="no-services-exist">There are no worship services showing for this locale.</p>
<?php endif;?>
<table class="table table-condensed services">
  <tr>
    <th class="actions-header">Actions</th>
    <th>Day</th>
    <th>Time</th>
    <th>Language</th>
    <th class="cws-col">CWS</th>
  </tr>
  <?php
  if ($hasServices):
    $numServices = count($services);
    foreach ($services as $day => $servicesPerDay): 
      $numServicesPerDay = count($servicesPerDay);
      for ($i = 0; $i < $numServicesPerDay; $i++):
        $service = $servicesPerDay[$i];
  ?>
  <tr data-lm-id="<?php echo $service['id'];?>">
    <td class="actions">
      <a class="edit" href="#" title="Edit"><i class="icon-edit"></i></a>
      <a class="delete" href="#" title="Delete"><i class="icon-trash"></i></a>
      <button class="btn btn-mini btn-primary edit-item">Update</button>
    </td>
    <td>
      <span class="read-only"><?php echo $day;?></span>
      <select class="edit-item" id="day-of-week" name="day-of-week">
        <?php
        foreach ($daysOfWeek as $dayOfWeek):
          if (strcmp($dayOfWeek['description'], $day) == 0):
        ?>
        <option selected="selected" value="<?php echo $dayOfWeek['value']?>"><?php echo $dayOfWeek['description'];?></option>
        <?php else:?>
        <option value="<?php echo $dayOfWeek['value']?>"><?php echo $dayOfWeek['description'];?></option>
        <?php
          endif;
        endforeach;
        ?>
      </select>
    </td>
    <td>
      <span class="read-only"><?php echo $service['schedule'];?></span>
      <input class="edit-item input-small" value="<?php echo $service['schedule'];?>">
    </td>
    <td>
      <?php if (isset($service['language'])) { echo "<span class=\"read-only\">{$service['language']['description']}</span>"; }?>
      <select class="edit-item" id="language" name="language">
        <option value=""></option>
        <?php
        foreach ($languages as $language):
          if (strcmp($service['language']['code'], $language['iso']) == 0):
        ?>
          <option selected="selected" value="<?php echo $language['iso']?>"><?php echo $language['description'];?></option>
          <?php
          else:
          ?>
          <option value="<?php echo $language['iso']?>"><?php echo $language['description'];?></option>
        <?php
          endif;
        endforeach;
        ?>
      </select>
    </td>
    <td class="cws-col">
      <?php if ($service['cws']):?>
      <i class="cws icon-ok read-only"></i>
      <input checked="checked" class="edit-item" id="cws" name="cws" type="checkbox">
      <?php else:?>
      <input class="edit-item" id="cws" name="cws" type="checkbox">
      <?php endif;?>
      <label class="edit-item label-cws" for="cws">CWS</label>
    </td>
  </tr>
  <?php
      endfor;
    endforeach;
  endif;
  ?>
</table>
