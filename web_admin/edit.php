<?php 
	include "includes/sessionLoader.php";
	include "includes/opendb.php";
	include 'services-table.php';
	setlocale('en_US');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head><title>Edit Listing</title></head>

<link rel="stylesheet" type="text/css" href="css.css" />

<body>
<div ALIGN="center">
<H2>Edit Location Form</H2>
Use the form below to edit an existing location.<br />
<?php


  $id = $_GET['id'];
	$query = "SELECT * FROM locale WHERE localeid='$id'";
	$result = mysql_query( $query ) or die( mysql_error() );


			$localeid            = mysql_result($result, $i, 'localeid');
			$Name                = mysql_result($result, $i, 'name');
			$Address1            = mysql_result($result, $i, 'address1');
			$City                = mysql_result($result, $i, 'city');
			$State               = mysql_result($result, $i, 'state');
			$Zip                 = mysql_result($result, $i, 'zip');
			$Timestamp           = mysql_result($result, $i, 'timestamp');
			
			
	$Address2       = mysql_result($result, 0, 'address2');
	$Country                 = mysql_result($result, 0, 'country');
	$countryId = mysql_result($result, 0, 'country_id');
	$Latitude          = mysql_result($result, 0, 'latitude');
	$Longitude          = mysql_result($result, 0, 'longitude');
	
	$Email_Contact              = mysql_result($result, 0, 'emailcontact');
	$Email_Contact = str_replace('"',"'",$Email_Contact);
	$Times      = mysql_result($result, 0, 'times');
	$Contact        = mysql_result($result, 0, 'contact');
	
	$result = mysql_query("select * from event where locale_id = $id and type = 1 order by day_of_week, schedule");
	$countriesResult = mysql_query('select id, iso2, iso3, name from country order by name');
	
?>
		<form name="loc_add" method="post" action="process_add.php" enctype="multipart/form-data">
		<input type='hidden' name='tell' value='edit'>
		<input type='hidden' name='localeid' value='<?php echo "$localeid"; ?>'>
				<table>	
			<tr>		
				<td align="right">Name:</td>
				<td align="left"><input type="text" size="50" maxlength="50" name="Name" value="<?php echo $Name; ?>"></td>
			</tr>
			<tr>		
				<td align="right">Address1:</td>
				<td align="left"><input type="text" size="40" maxlength="40" name="Address1" value="<?php echo $Address1; ?>"></td>
			</tr>
			<tr>		
				<td align="right">Address2:</td>
				<td align="left"><input type="text" size="40" maxlength="40" name="Address2" value="<?php echo $Address2; ?>"></td>
			</tr>
			<tr>		
				<td align="right">City:</td>
				<td align="left"><input type="text" size="40" maxlength="40" name="City" value="<?php echo $City; ?>"></td>
			</tr>		
			<tr>		
				<td align="right">State:</td>
				<td align="left"><input type="text" size="2" maxlength="2" name="State" value="<?php echo $State; ?>"></td>
			</tr>
			<tr>		
				<td align="right">Zip:</td>
				<td align="left"><input type="text" size="15" maxlength="15" name="Zip" value="<?php echo $Zip; ?>"></td>
			</tr>	
			<tr>		
				<td align="right">Country:</td>
				<td align="left">
          <select name="Country">
            <?php
            print "<option value=\"\"></option>\n";
            while ($row = mysql_fetch_assoc($countriesResult)) {
              if (!is_null($countryId) && ($row['id'] == $countryId)) {
                print '<option value="' . $row['id'] . '" selected>' . $row['name'] . '</option>' . "\n";
              } else {
                print '<option value="' . $row['id'] . '">' . $row['name'] . '</option>' . "\n";
              }
            }
            ?>
          </select>
				</td>
			</tr>
			<tr>		
				<td align="right">Latitude:</td>
				<td align="left"><input type="text" size="40" maxlength="40" name="Latitude" value="<?php echo $Latitude; ?>"></td>
			</tr>
			<tr>		
				<td align="right">Longitude:</td>
				<td align="left"><input type="text" size="40" maxlength="40" name="Longitude" value="<?php echo $Longitude; ?>"></td>
			</tr>
			<tr>		
				<td align="right">Email Contact:</td>
				<td align="left"><input type="text" size="50" maxlength="200" name="Email_Contact" value="<?php echo $Email_Contact; ?>"></td>
			</tr>
			<tr>		
				<td align="right" valign="top">Times:</td>
				<td align="left">
				<?php createServicesTable($result); ?>
				</td>
			</tr>
			<?php if ($Times) {?>
			<tr>
			  <td align="right" valign="top">Old Times (Deprecated):</td>
			  <td align="left"><textarea type="text" rows="6" cols="35" style="width:325px" disabled="disabled"><?php echo $Times; ?></textarea></td>
			</tr>
			<?php }?>
			<tr>		
				<td align="right">Phone:</td>
				<td align="left"><input type="text" size="50" maxlength="70" name="Contact" value="<?php echo $Contact; ?>"></td>
			</tr>		
			<tr>
				<td></td>
				<td align="left"><input type="submit" value="submit changes"></td>
			</tr>
		</table>
		
		&nbsp;<br />
		<a href='index.php'>Main Menu</a>
    <script src="json.js" type="text/javascript"></script>
    <script src="jquery.js" type="text/javascript"></script>
    <script src="edit.js" type="text/javascript"></script>
</div>
</form>
</body>
</html>
<?php
mysql_free_result($countriesResult);
?>