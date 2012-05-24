<?php
echo $this->element("header", array("includeSearch" => true));
?>
<div class="map" id="map">
  <div id="seo">
    <h2>Locale Maps</h2>
    <p>Find a congregation near you.</p>
  </div>
  <noscript>
    <?php
    echo $this->Html->css('no_js');
    ?>
    <section id="no-js">
      <h2>You Need JavaScript Enabled</h2>
      <p>
        This web site requires that you have JavaScript enabled.  Here's how to enable JavaScript
        for your browser:
      </p>
      <ul>
        <li><strong>Internet Explorer</strong> <a href="http://support.microsoft.com/gp/howtoscript">http://support.microsoft.com/gp/howtoscript</a></li>
        <li><strong>Mozilla Firefox</strong> <a href="http://support.mozilla.org/en-US/kb/JavaScript#w_enabling-and-disabling-javascript">http://support.mozilla.org/en-US/kb/JavaScript#w_enabling-and-disabling-javascript</a></li>
        <li><strong>Google Chrome</strong> <a href="http://support.google.com/bin/answer.py?hl=en&answer=23852">http://support.google.com/bin/answer.py?hl=en&answer=23852</a></li>
        <li><strong>Safari</strong> <a href="http://docs.info.apple.com/article.html?path=Safari/3.0/en/9279.html">http://docs.info.apple.com/article.html?path=Safari/3.0/en/9279.html</a></li>
      </ul>
    </section>
  </noscript>
</div>
<section id="search-results" class="animate hide">
  <a class="close" href="#"><span class="knob"></span></a>
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
new HomePage({"locales":<?php echo $locales?>,"analyticsId":"@ANALYTICS_ID@"});
});
</script>
<?php
echo $this->element("analytics");
?>
