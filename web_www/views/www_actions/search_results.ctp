<?php if (empty($results)):?>
<div class="empty">The search <strong>'<?php echo $query?>'</strong> did not return any results.</div>
<?php else:?>
<div>Results</div>
<ul>
<?php foreach($results as $result):?>
  <li>
    <hgroup><h1><?php echo $result["localemaps"]["name"]?></h1></hgroup>
    <?php echo $this->element(
      "locale_vcard",
      array(
        "address" => $result["localemaps"]["address1"],
        "address2" => $result["localemaps"]["address2"],
        "city" => $result["localemaps"]["city"],
        "state" => $result["localemaps"]["state"],
        "zip" => $result["localemaps"]["zip"]
      ))?>
  </li>
<?php endforeach;?>
</ul>
<?php endif;?>