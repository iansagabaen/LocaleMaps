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
      <ol>
        <?php foreach(array_keys($result["services"]) as $dayOfWeek):?>
        <li>
          <h5 class="day-of-week"><?php echo $dayOfWeek?></h5>
          <ul class="times">
            <?php foreach($result["services"][$dayOfWeek] as $time):?>
            <li>
              <?php echo strftime('%l:%M %p', strtotime($time['schedule']))?>
              <?php if ($time['cws']):?>
              <span class="cws" title="CWS">C</span>
              <?php endif;?>
              <?php if (!empty($time['language'])):?>
              <span class="language" title="<?php echo $time['language']?>"><?php echo $time['language']?></span>
              <?php endif;?>
            </li>
            <?php endforeach;?>
          </ul>
        </li>
        <?php endforeach;?>
      </ol>
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