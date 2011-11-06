<?php if (empty($results)):?>
<h2 class="empty">Sorry, we couldn't find any congregations near <strong>'<?php echo $query?>'</strong>.</h2>
<?php else:?>
<?php if (count($results) > 1):?>
<div class="filter">
  <div class="container">
    <a class="narrow-search" href="#">Narrow your search by days of the week?</a><a class="toggle point-right"></a>
  </div>
  <div class="actions hide">
    <ul class="days-of-week">
      <li class="btn-grey first">Sun</li>
      <li class="btn-grey">Mon</li>
      <li class="btn-grey">Tue</li>
      <li class="btn-grey">Wed</li>
      <li class="btn-grey">Thu</li>
      <li class="btn-grey">Fri</li>
      <li class="btn-grey">Sat</li>
    </ul>
    <ul class="time-of-day">
      <li class="btn-grey first">AM</li>
      <li class="btn-grey">PM</li>
    </ul>
  </div>
</div>
<?php endif;?>
<ul class="results-list">
<?php foreach($results as $result):?>
  <li>
    <div class="result">
    <hgroup>
      <h3><?php echo $result["name"]?></h3>
      <?php if (!empty($result["email"])):?>
        <span class="email">
          <span class="type">pref</span>
          <span class="value"><?php echo $result["email"]?></span>
          <?php echo $this->Html->link('', 'mailto:' . $result["email"])?>
        </span>
      <?php endif;?>
    </hgroup>
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
    <?php
    if (!empty($result["services"])):
      foreach(array_keys($result["services"]) as $dayOfWeek):
    ?>
      <dl class="services">
        <dt class="day-of-week"><?php echo $dayOfWeek?></dt>
        <dd>
          <ul>
            <?php
            $size = count($result["services"][$dayOfWeek]);
            $i = 1;
            foreach($result["services"][$dayOfWeek] as $time):
            ?>
            <li>
              <?php echo strftime('%l:%M %p', strtotime($time['schedule']))?>
              <?php if ($time['cws']):?><span class="cws" title="CWS">C</span><?php endif;?><?php if (!empty($time['language'])):?><span class="language <?php echo strtolower($time['language'])?>" title="<?php echo $time['language']?>"><?php echo strtoupper(substr($time['language'], 0, 1))?></span><?php endif;if ($i < $size) { echo ",&nbsp;"; } $i++;?>
            </li>
            <?php endforeach;?>
          </ul>
        </dd>
      </dl>
    <?php
      endforeach;
    endif;
    ?>
    <a class="wrong-info" href="http://localemaps.com/blog/contact-us/" target="_blank">Wrong information?</a>
    </div>
    <ul class="actions">
      <li><a class="btn-grey" href="#">Zoom here</a></li>
      <li><a class="btn-grey directions" href="#">Get directions</a></li>
    </ul>
  </li>
<?php endforeach;?>
</ul>
<?php endif;?>