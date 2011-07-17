<header class="header">
  <h1><img alt="<?php echo $title_for_layout?>" class="logo" height="73" src="img/logo.png" width="264"><span><?php echo $title_for_layout?></span></h1>
  <div class="fb-like">
    <iframe allowTransparency="true" frameborder="0" id="fb-iframe" scrolling="no"></iframe>
    <a href="http://www.facebook.com/pages/Locale-Maps-find-a-congregation-near-you/54529959411" target="_blank">Visit Locale Maps on Facebook</a>
  </div>
  <div class="search">
    <form action="#" method="get" id="search-form">
      <input class="button" type="submit" value="Go">
      <input class="input" placeholder="Find a congregation" type="text">
    </form>
  </div>
  <div class="shadow"></div>
</header>
<div class="map" id="map">&nbsp;</div>
<section id="search-results" class="animate hide">
  <a href="#" class="close">Close</a>
  <div class="content"></div>
</section>
<footer class="main">
  <nav>
    <ul class="nav">
      <li><a href="http://localemaps.com/blog/about/">About this project</a></li>
      <li><a href="http://localemaps.com/blog/">Blog</a></li>
      <li><a href="http://localemaps.com/blog/contact-us/">Contact us</a></li>
      <li><a href="#" id="show-disclaimer">Disclaimer</a></li>
    </ul>
  </nav>
  <span class="copyright">&copy;<?php echo date('Y')?> Locale Maps</span>
</footer>
<section id="disclaimer" class="dialog">
  <h1>Disclaimer</h1>
  <p>
    This website is not affiliated with any religious groups. Any reliance you place on the 
    information on this site is strictly at your own risk. Address and worship service 
    schedules are subject to change.
  </p>
  <p>
    This website is not responsible for inaccurate listings.  Always call the congregation
    to confirm the actual time &amp; address.
  </p>
  <a href="#" class="close">Close</a>
  <footer>
    &copy;<?php echo date('Y')?> Locale Maps. | Partner site: <a href="http://www.iansagabaen.com">iansagabaen.com</a>
  </footer>
</section>
<div id="mask"></div>
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
