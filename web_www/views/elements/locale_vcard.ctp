<div class="adr">
  <span class="street-address"><?php echo $address?></span>
  <?php if (!empty($streetAddress2)):?>
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