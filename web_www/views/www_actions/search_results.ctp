<?php if (empty($results)):?>
<h2 class="empty">Sorry, we couldn't find any congregations near <strong>'<?php echo $query?>'</strong>.</h2>
<?php else:?>
<ul class="results-list">
<?php foreach($results as $result):?>
  <li>
    <div class="result">
    <hgroup><h3><?php echo $result["name"]?></h3></hgroup>
    <?php echo $this->element(
      "locale_vcard",
      array(
        "address" => $result["address1"],
        "address2" => $result["address2"],
        "city" => $result["city"],
        "state" => $result["state"],
        "zip" => $result["zip"]
    ))?>
    <?php if (!empty($result["tel"])):?>
    <div class="tel">
      <span class="type">pref</span>
      <?php echo $result["tel"]?>
    </div>
    <?php endif;?>
    <?php if (!empty($result["services"])):?>
    <div class="services">
      <h4>Service times</h4>
      <ul>
      <?php foreach ($result["services"] as $service):?>
      <?php var_dump($service); ?>
      <?php endforeach;?>
      </ul>
    </div>
    <?php endif;?>
    <a class="wrong-info" href="http://localemaps.com/blog/contact-us/" target="_blank">Wrong information?</a>
    <?php
    if (!empty($result["email"])):
    ?>
    <div class="email">
      <span class="type">pref</span>
      <span class="value"><?php echo $result["email"]?></span>
      <?php echo $this->Html->link('Email this congregation', 'mailto:' . $result["email"])?>
    </div>
    <?php endif;?>
    </div>
    <ul class="actions">
      <li><a href="#">Zoom here</a></li>
      <li><a href="#">Get directions</a></li>
    </ul>
    <a href="#" class="view-marker"><span class="text">View Marker</span></a>
  </li>
<?php endforeach;?>
</ul>
<?php endif;?>