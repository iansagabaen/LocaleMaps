<!DOCTYPE html>
<html>
<head>
  <title><?php echo $title_for_layout?></title>
  <?php
  echo $this->Html->css('default');
  echo $this->Html->css('locale_info');
  echo $this->Html->meta('icon', '/favicon.ico');
  ?>
  <!--[if lt IE 9]>
  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>
  <?php echo $content_for_layout; ?>
</body>
</html>