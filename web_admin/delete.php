<?php 
	include "includes/sessionLoader.php";
	include "includes/opendb.php";
	include 'services-table.php'
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head><title>Edit Listing</title></head>

<link rel="stylesheet" type="text/css" href="css.css" />

<body>
<div ALIGN="center">

<?php
if( ISSET($_GET['confirm']) && strcmp($_GET['confirm'],'yes')==0 ){

  $id = $_GET['id'];
  $query = "delete from event where locale_id=$id";
  $result = mysql_query( $query ) or die( mysql_error() );
	$query = "DELETE FROM locale WHERE localeid='$id'";
	$result = mysql_query( $query ) or die( mysql_error() );
	
?>
<H2>Location Deleted</H2>
The desired listing has been removed from the system.<br />


	 &nbsp;<br />
	 <a href='index.php'>Main Menu</a>	
<?php

} else {
?>

<H2>Delete Location</H2>
You have selected to delete the listing below.<br />&nbsp;<br />
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
	$Latitude          = mysql_result($result, 0, 'latitude');
	$Longitude          = mysql_result($result, 0, 'longitude');
	$Email_Contact              = mysql_result($result, 0, 'emailcontact');
	$Times      = mysql_result($result, 0, 'times');
	$Contact        = mysql_result($result, 0, 'contact');
	$result = mysql_query("select * from event where locale_id = $id and type = 1 order by day_of_week, schedule");
?>


<?php
		echo "
		<table>	
			<tr>		
				<td align='right'>Name:</td>
				<td align='left'> $Name</td>
			</tr>
			<tr>		
				<td align='right'>Address1:</td>
				<td align='left'> $Address1</td>
			</tr>
			<tr>		
				<td align='right'>Address2:</td>
				<td align='left'> $Address2</td>
			</tr>
			<tr>		
				<td align='right'>City:</td>
				<td align='left'> $City</td>
			</tr>
			<tr>		
				<td align='right'>State:</td>
				<td align='left'> $State</td>
			</tr>
			<tr>		
				<td align='right'>Zip:</td>
				<td align='left'> $Zip</td>
			</tr>			
			<tr>		
				<td align='right'>Country:</td>
				<td align='left'> $Country</td>
			</tr>
			<tr>		
				<td align='right'>Latitude:</td>
				<td align='left'> $Latitude</td>
			</tr>
			<tr>		
				<td align='right'>Longitude:</td>
				<td align='left'> $Longitude</td>
			</tr>
			<tr>		
				<td align='right'>Email_Contact:</td>
				<td align='left'> $Email_Contact</td>
			</tr>
			<tr>		
				<td align='right'>Times:</td>
				<td align='left'>";
			createServicesTable($result, true);
			print "</td>
			</tr>
			<tr>		
				<td align='right'>Phone:</td>
				<td align='left'> $Contact</td>
			</tr>		
		</table>";//end table echo
 ?>
 
   
	 &nbsp;<br />
	 <a href='delete.php?id=<?php echo $id; ?>&confirm=yes'>Yes, Delete this Location</a>	
	 &nbsp;<br />
	 &nbsp;<br />
	 <a href='index.php'>No, Go back to the Main Menu</a>	

<?php } ?>
 

</div>
</form>
</body>
</html>