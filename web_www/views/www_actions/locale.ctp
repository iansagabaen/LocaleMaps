<div class="locale-info vcard">
  <hgroup><h3 class="n"><?php echo $name?></h3></hgroup>
  <?php echo $this->element(
    "locale_vcard",
    array(
      "address" => $address,
      "address2" => $address2,
      "city" => $city,
      "state" => $state,
      "zip" => $zip
    ))?>
  <?php if (!empty($tel)):?>
  <div class="tel">
    <span class="type">pref</span>
    <?php echo $tel?>
  </div>
  <?php endif;?>
  <?php
  if (!empty($email)):
  ?>
  <div class="email">
    <span class="type">pref</span>
    <span class="value"><?php echo $email?></span>
    <?php echo $this->Html->link('Email this congregation', 'mailto:' . $email)?>
  </div>
  <?php endif;?>
  <?php if ($timestamp > 0):?>
  <div class="last-update">Last updated: <?php echo $timestamp?></div>
  <?php endif;?>
  <div class="services"><?php echo $services?></div>
  <ul class="map-links">
    <li><a class="zoom" data-lm-id="<?php echo $id?>" data-lm-coords="<?php echo $latitude . ',' . $longitude?>">Zoom in</a></li>
    <li><?php
      echo $this->Html->link(
        "Get directions",
        "http://maps.google.com?q=" . urlencode($addressFull) . "&daddr=" . urlencode($addressFull) . "&ll=" . $latitude . "," . $longitude,
        array("target" => "_blank"));
    ?></li>
    <li><a href="http://www.localemaps.com/blog/contact-us" target="_blank">Incorrect?</a></li>
  </ul>
</div>