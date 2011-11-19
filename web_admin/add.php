<?php 
	include "includes/sessionLoader.php";
	include "includes/opendb.php";
	include 'services-table.php';
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>
<head><title>Add A LocaleMaps Location</title></head>

<link rel="stylesheet" type="text/css" href="css.css" />

<body>
<div ALIGN="center">
<H2>Location Add Form</H2>
Use the form below to add a new location into the system.<br />
<form name="loc_add" method="post" action="process_add.php" enctype="multipart/form-data">

	<table>	
			<tr>		
				<td align="right">Name:</td>
				<td align="left"><input type="text" size="50" maxlength="50" name="Name" value=""></td>
			</tr>
			<tr>		
				<td align="right">Address1:</td>
				<td align="left"><input type="text" size="40" maxlength="40" name="Address1" value=""></td>
			</tr>
			<tr>		
				<td align="right">Address2:</td>
				<td align="left"><input type="text" size="40" maxlength="40" name="Address2" value=""></td>
			</tr>
			<tr>		
				<td align="right">City:</td>
				<td align="left"><input type="text" size="40" maxlength="40" name="City" value=""></td>
			</tr>		
			<tr>		
				<td align="right">State:</td>
				<td align="left"><input type="text" size="2" maxlength="2" name="State" value=""></td>
			</tr>
			<tr>		
				<td align="right">Zip:</td>
				<td align="left"><input type="text" size="15" maxlength="15" name="Zip" value=""></td>
			</tr>	
			<tr>		
				<td align="right">Country:</td>
				<td align="left"><input type="text" size="40" maxlength="40" name="Country" value=""></td>
			</tr>
			<tr>		
				<td align="right">Latitude:</td>
				<td align="left"><input type="text" size="40" maxlength="40" name="Latitude" value=""></td>
			</tr>
			<tr>		
				<td align="right">Longitude:</td>
				<td align="left"><input type="text" size="40" maxlength="40" name="Longitude" value=""></td>
			</tr>
			<tr>		
				<td align="right">Email Contact:</td>
				<td align="left"><input type="text" size="50" maxlength="200" name="Email_Contact" value=""></td>
			</tr>
			<tr>		
				<td align="right" valign="top">Times:</td>
				<td align="left">
				<?php createServicesTable(); ?>
				</textarea>
			</tr>
			<tr>		
				<td align="right">Phone:</td>
				<td align="left"><input type="text" size="50" maxlength="70" name="Contact" value=""></td>
			</tr>		
			<tr>
				<td></td>
				<td align="left"><input type="submit" value="add"></td>
			</tr>
		</table>
		
		&nbsp;<br />
		<a href='index.php'>Main Menu</a>
</div>
</form>
<script src="json.js" type="text/javascript"></script>
<script src="jquery.js" type="text/javascript"></script>
<script src="edit.js" type="text/javascript"></script>
</body>
</html>