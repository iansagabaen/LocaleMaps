<?php 
	include "includes/sessionLoader.php";
	include "includes/opendb.php";
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>
<head><title>Main Menu</title></head>
<link rel="stylesheet" type="text/css" href="css.css" />
<body>
<div ALIGN="center">
<H2>Main Menu</H2>
Use the pages below to manage the addresses in the LocaleMaps database.<br />&nbsp;<br />
	
<?php
//echo getcwd() . "\n";
?>
	<div style='text-align: left; width:250px;'>
		&raquo; <a href='add.php'>Add New Location</a><br />&nbsp;<br />
		&raquo; <a href='list.php'>Edit or Delete Location</a><br />&nbsp;<br />
	</div>

</div>
</form>
</body>
</html>