<?php 
	include "includes/sessionLoader.php";
	include "includes/opendb.php";
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head><title>Add Location</title></head>

<link rel="stylesheet" type="text/css" href="css.css" />
<body>
<div ALIGN="center">
<H2>Location Add Form</H2>
<?php
		 
	$FormedDate = date('m/d/Y');
	$localeid = $_POST['localeid'];
	$Name= $_POST['Name'];
	$Address1 = $_POST['Address1'];
	$Address2 = $_POST['Address2'];
	$City = $_POST['City'];
	$State = $_POST['State'];
	$Zip = $_POST['Zip'];
	$Country = $_POST['Country'];
	$Latitude = $_POST['Latitude'];
	$Longitude = $_POST['Longitude'];
	$Email_Contact = $_POST['Email_Contact'];
	$Times = $_POST['Times'];
	$Contact = $_POST['Contact'];
	
	
	if( ISSET($_POST['tell']) && strcmp($_POST['tell'],'edit')==0 ){
		//echo "Avail: $Availability_ID";
		$query = "UPDATE localemaps SET name='$Name', address1='$Address1', address2='$Address2', 
			city='$City', state='$State', zip='$Zip', country='$Country', latitude='$Latitude',
			longitude='$Longitude', emailcontact='$Email_Contact', times='$Times', contact='$Contact'
			WHERE localeid='$localeid'";
		$result = mysql_query( $query ) or Die( mysql_error() );
		echo "<strong>Your location '$Name' has been updated.</strong><br />&nbsp<br />";	
?>

	<div style='background-color: #eeeeee; padding: 20px 20px 20px 20px'>
	
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
				<td align='left'> $Times</td>
			</tr>
			<tr>		
				<td align='right'>Contact:</td>
				<td align='left'> $Contact</td>
			</tr>		
		</table>";//end table echo
 ?>
	 
   </div>
	 
	 &nbsp;<br />
	 <a href='index.php'>Main Menu</a>	
		
		
<?		
	}else{
		$query = "INSERT INTO localemaps (name, address1, address2, city, state, zip, country, latitude, longitude, emailcontact, times, contact)
			VALUES ( '$Name', '$Address1', '$Address2', '$City', '$State', '$Zip', '$Country', '$Latitude', '$Longitude', '$Email_Contact', '$Times', '$Contact')";
	   //echo "about to process: " . $query;
		$result = mysql_query( $query ) or Die( mysql_error() );
	       echo "<strong>Your location '$Name' has been added to the system. If you'd like to add another just like this you can use the pre-filled form below.</strong><br />
          
          	 &nbsp;<br />
          	 <a href='index.php'>Main Menu</a>";	
	  ?>
	       	 
<br />
<div ALIGN="center">
<H2>Duplicate Location Add Form</H2>
Use the form below to add a new location into the system.<br />
<form name="loc_add" method="post" action="process_add.php" enctype="multipart/form-data">

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
				<td align="left"><input type="text" size="40" maxlength="40" name="Country" value="<?php echo $Country; ?>"></td>
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
				<td align="right">Times:</td>
				<td align="left"><textarea type="text" rows="6" cols="35" name="Times" value=""><?php echo $Times; ?></textarea>
			</tr>
			<tr>		
				<td align="right">Contact:</td>
				<td align="left"><input type="text" size="50" maxlength="50" name="Contact" value="<?php echo $Contact; ?>"></td>
			</tr>		
			<tr>
				<td></td>
				<td align="left"><input type="submit" value="add"></td>
			</tr>
		</table>
		
		
		&nbsp;<br />
		<a href='index.php'>Main Menu</a> 
	       
	       
<?	       
	}
?>

</div>
</body>
</html>