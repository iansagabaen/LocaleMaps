<section class="locale-info vcard">
  <hgroup><h1 class="n"><?php echo $name?></h1></hgroup>
  <?php echo $this->element(
    "locale_vcard",
    array(
      "address" => $address,
      "address2" => $address2,
      "city" => $city,
      "state" => $state,
      "zip" => $zip
    ))?>
  <?php /*
  <div class="adr">
    <span class="street-address"><?php echo $address?></span>
    <?php if (!empty($address2)):?>
      <span class="extended-address"><?php echo $address2?></span>
    <?php endif;?>
    <span class="locality"><?php echo $city?></span>
    <?php if (!empty($state)):?>
      <abbr class="region"><?php echo $state?></abbr>
    <?php endif;?>
    <?php if (!empty($zip)):?>
      <span class="postal-code"><?php echo $zip?></span>
    <?php endif;?>
  </div>
  */ ?>
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
    <li><a class="zoom" lm-data-coords="<?php echo $latitude . ',' . $longitude?>">Zoom in</a></li>
    <li><?php
      echo $this->Html->link(
        "Get directions",
        "http://maps.google.com?q=" . urlencode($addressFull) . "&saddr=" . urlencode($addressFull) . "&ll=" . $latitude . "," . $longitude,
        array("target" => "_blank"));
    ?></li>
    <li><a href="http://www.localemaps.com/blog/contact-us" target="_blank">Incorrect?</a></li>
  </ul>
</section>