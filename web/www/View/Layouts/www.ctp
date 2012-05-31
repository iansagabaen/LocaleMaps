<!DOCTYPE html>
<html>
<!--[if lt IE 7 ]> <html class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html> <!--<![endif]-->
  <title><?php echo $title_for_layout?></title>
  <?php
  echo $this->Html->css('default');
  echo $this->Html->meta('icon', '/favicon.ico');
  ?>
  <!--[if lt IE 9]>
  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <meta name="description" value="Locale Maps - Find a congregation near you!">
  <meta name="keywords" value="congregation finder,find a congregation near you,INC,Iglesia Ni Cristo,locale maps,locale finder">
</head>
<body>
  <?php echo $this->fetch('content'); ?>
</body>
</html>