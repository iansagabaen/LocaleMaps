<footer class="main" data-lm-ga-category="footer">
  <nav>
    <ul class="nav">
      <li><a data-lm-ga-label="about" href="http://localemaps.com/blog/about/">About this project</a></li>
      <li><a data-lm-ga-label="blog" href="http://localemaps.com/blog/">Blog</a></li>
      <li><a data-lm-ga-label="contact" href="http://localemaps.com/blog/contact-us/">Contact us</a></li>
      <?php if ($includeDisclaimer):?>
      <li><a data-lm-ga-label="disclaimer" href="#" id="show-disclaimer">Disclaimer</a></li>
      <?php endif;?>
    </ul>
  </nav>
  <span class="copyright">&copy;<?php echo date('Y')?> Locale Maps</span>
</footer>
<?php if ($includeDisclaimer):?>
<section id="disclaimer" class="dialog hide">
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
<div id="mask" class="hide"></div>
<?php endif;?>