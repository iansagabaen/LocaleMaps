<!DOCTYPE html>
<html lang="en">
  <head>
    <title><?php echo $title_for_layout?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--
    <link href="../assets/css/bootstrap-responsive.css" rel="stylesheet">
    -->
    <?php echo $this->Html->css('bootstrap');?>
    <?php echo $this->fetch('css');?>
    <?php echo $this->fetch('script');?>
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">
      <?php echo $this->fetch('content'); ?>
    </div>
    <?php echo $this->Html->script('common');?>
    <?php echo $this->Html->script('header');?>
    <?php echo $this->fetch('script_bottom');?>
    <?php
    /*
    <script src="../assets/js/jquery.js"></script>
    <script src="../assets/js/bootstrap-transition.js"></script>
    <script src="../assets/js/bootstrap-alert.js"></script>
    <script src="../assets/js/bootstrap-modal.js"></script>
    <script src="../assets/js/bootstrap-dropdown.js"></script>
    <script src="../assets/js/bootstrap-scrollspy.js"></script>
    <script src="../assets/js/bootstrap-tab.js"></script>
    <script src="../assets/js/bootstrap-tooltip.js"></script>
    <script src="../assets/js/bootstrap-popover.js"></script>
    <script src="../assets/js/bootstrap-button.js"></script>
    <script src="../assets/js/bootstrap-collapse.js"></script>
    <script src="../assets/js/bootstrap-carousel.js"></script>
    <script src="../assets/js/bootstrap-typeahead.js"></script>
    */
    ?>
  </body>
</html>
