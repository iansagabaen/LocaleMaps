<header class="header">
  <h1><a href="/"><img alt="<?php echo $title_for_layout?>" class="logo" height="73" src="img/logo.png" width="264"><span><?php echo $title_for_layout?></span></a></h1>
  <div class="fb-like">
    <iframe allowTransparency="true" frameborder="0" id="fb-iframe" scrolling="no"></iframe>
    <a href="http://www.facebook.com/pages/Locale-Maps-find-a-congregation-near-you/54529959411" target="_blank">Visit Locale Maps on Facebook</a>
  </div>
  <?php if ($includeSearch):?>
  <div class="search">
    <form action="#" method="get" id="search-form">
      <input class="button" type="submit" value="Go">
      <input class="input" name="q" placeholder="Find a congregation" type="text">
      <input type="hidden" name="day_of_week">
      <input type="hidden" name="time">
    </form>
  </div>
  <?php endif;?>
  <div class="shadow"></div>
</header>