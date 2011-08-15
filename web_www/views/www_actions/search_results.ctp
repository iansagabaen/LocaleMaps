<?php if (empty($results)):?>
<h2 class="empty">Sorry, we couldn't find any congregations near <strong>'<?php echo $query?>'</strong>.</h2>
<?php else:?>
<h2>Congregation search results for <strong>'<?php echo $query?>'</strong>:</h2>
<ul class="results-list">
<?php foreach($results as $result):?>
  <li>
    <div class="result">
    <hgroup><h3><?php echo $result["localemaps"]["name"]?></h3></hgroup>
    <?php echo $this->element(
      "locale_vcard",
      array(
        "address" => $result["localemaps"]["address1"],
        "address2" => $result["localemaps"]["address2"],
        "city" => $result["localemaps"]["city"],
        "state" => $result["localemaps"]["state"],
        "zip" => $result["localemaps"]["zip"]
    ))?>
    <?php if (!empty($result["localemaps"]["tel"])):?>
    <div class="tel">
      <span class="type">pref</span>
      <?php echo $result["localemaps"]["tel"]?>
    </div>
    <?php endif;?>
    <div class="services">
      <h4>Service times</h4>
      <?php echo $result["localemaps"]["services"]?>
    </div>
    <?php
    if (!empty($result["localemaps"]["email"])):
    ?>
    <div class="email">
      <span class="type">pref</span>
      <span class="value"><?php echo $result["localemaps"]["email"]?></span>
      <?php echo $this->Html->link('Email this congregation', 'mailto:' . $result["localemaps"]["email"])?>
    </div>
    <?php endif;?>
    <?php if ($result["localemaps"]["timestamp"] > 0):?>
    <div class="last-update">Last updated: <?php echo $result["localemaps"]["timestamp"]?></div>
    <?php endif;?>
    </div>
    <a href="#" class="view-marker"><span class="text">View Marker</span></a>
  </li>
<?php endforeach;?>
</ul>
<?php endif;?>
<div class="reset-search">
  or <a href="#">Start your congregation search from scratch</a>
</div>