<?php
echo $this->element("header", array("includeSearch" => true));
?>
<div class="map" id="map">&nbsp;</div>
<section id="search-results" class="animate hide">
  <a href="#" class="close">Close</a>
  <div class="content"></div>
</section>
<?php
echo $this->element("footer", array("includeDisclaimer" => true));
?>
<script defer="defer" src="http://j.maxmind.com/app/geoip.js"></script>
<?php
echo $this->Html->script('http://www.google.com/jsapi?key=@GOOGLE_API_KEY@');
echo $this->Html->script('home_page');
?>
<script>
google.load('maps', '3', { 'other_params': 'sensor=false' });
google.setOnLoadCallback(function() {
new HomePageManager(<?php echo $locales?>);
});
</script>
<?php
echo $this->element("analytics", array("isProduction" => $isProduction));
?>
