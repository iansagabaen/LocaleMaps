<?php 
define('TIME_FORMAT', '%Y-%m-%d %H:%M');
	include "includes/sessionLoader.php";
	include "includes/opendb.php";
	include 'services-table.php';
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head><title>Add Location</title></head>

<link rel="stylesheet" type="text/css" href="css.css" />
<body>
<div ALIGN="center">
<H2>Location Add Form</H2>
<?php
  function updateEventTable($localeid, $times) {
    $query = "delete from event where type = 1 and locale_id = $localeid";
    $result = mysql_query($query);
    $times = str_replace('\"', '"', $times);
		$obj = json_decode($times);
		foreach ($obj as $event) {
		  $query = array("insert into event (locale_id, type, recurring, day_of_week, schedule, metadata) values ($localeid, 1, 1, ");
		  array_push($query, $event->day . ", '");
		  array_push($query, strftime(constant('TIME_FORMAT'), strtotime($event->time)) . "', ");
		  if ($event->cws || (!is_null($event->language))) {
		    $metadata = array("'<service>");
		    if ($event->cws) {
		      array_push($metadata, '<cws/>');
		    }
		    if (strlen($event->language) > 0) {
		      array_push($metadata, "<language>" . $event->language . "</language>");
		    }
		    array_push($metadata, "</service>')");
		    $metadata = implode('', $metadata);
		  } else {
		    $metadata = "NULL)";
		  }
		  array_push($query, $metadata);
		  $query = implode('', $query);
		  mysql_query($query);
		}
    return mysql_query("select * from event where locale_id = $localeid and type = 1 order by day_of_week, schedule");
  }

  function updateCountryAndState($localeId, $state) {
    if (strcmp($Country, 'US') == 0) {
      $result = mysql_query("select id from country where iso2 = 'US'") or Die( mysql_error() );
      $row = mysql_fetch_assoc($result);
      $countryId = $row['id'];
      mysql_free_result($result);
      $result = mysql_query("select name from region where abbrev = '$state'");
      $row = mysql_fetch_assoc($result);
      $fullStateName = $row['name'];
      mysql_query("update locale set country_id = $countryId, full_state = '$fullStateName' where localeid = $localeId");
    }
  }


	$FormedDate = date('m/d/Y');
	$localeid = $_REQUEST['localeid'];
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
	
	if( ISSET($_POST['tell']) && strcmp($_POST['tell'],'edit')==0 ) {
		$query = "UPDATE locale SET name='$Name', address1='$Address1', address2='$Address2', " .
			"city='$City', state='$State', zip='$Zip', country='$Country', latitude='$Latitude' ," .
			"longitude='$Longitude', emailcontact='$Email_Contact', contact='$Contact' " .
			"WHERE localeid='$localeid'";
		$result = mysql_query( $query ) or Die( mysql_error() );
    $result = updateEventTable($localeid, $Times);
    updateCountryAndState($localeid, $State);
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
				<td align='left'>";
	  createServicesTable($result);
		print "</td>
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
		
		
<?php
	}else{
		$query = "INSERT INTO locale (name, address1, address2, city, state, zip, country, latitude, longitude, emailcontact, contact)
			VALUES ( '$Name', '$Address1', '$Address2', '$City', '$State', '$Zip', '$Country', '$Latitude', '$Longitude', '$Email_Contact', '$Contact')";
	   //echo "about to process: " . $query;
		mysql_query( $query );
		$localeid = mysql_insert_id();
    $result = updateEventTable($localeid, $Times);
    updateCountryAndState($localeid, $State);
		
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
				<td align="left"><?php createServicesTable($result); ?></textarea>
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
	       
	       
<?php
	}
?>

</div>
<script src="json.js" type="text/javascript"></script>
<script src="jquery.js" type="text/javascript"></script>
<script src="edit.js" type="text/javascript"></script>

</body>
</html>