<?php 
	include "includes/sessionLoader.php";
	include "includes/opendb.php";
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
	$Latitude          = mysql_result($result, 0, 'latitude');
	$Longitude          = mysql_result($result, 0, 'longitude');
	
	$Email_Contact              = mysql_result($result, 0, 'emailcontact');
	$Email_Contact = str_replace('"',"'",$Email_Contact);
	//$Times      = mysql_result($result, 0, 'times');
	$Contact        = mysql_result($result, 0, 'contact');
	
	$result = mysql_query("select * from event where locale_id = $id and type = 1 order by day_of_week, schedule");
	
	
?>
		<form name="loc_add" method="post" action="process_add.php" enctype="multipart/form-data">
		<input type='hidden' name='tell' value='edit'>
		<input type='hidden' name='localeid' value='<? echo "$localeid"; ?>'>
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
				<td align="left">
				  <!--
				  <textarea type="text" rows="6" cols="35" name="Times" value=""><?php echo $Times; ?></textarea>
				  -->
				  <table class="times">
				    <thead>
				      <tr>
				        <th>Day</th>
				        <th>Time</th>
				        <th>Type</th>
				        <th>Language</th>
				      </tr>
				    </thead>
				    <?php
				    $daysOfWeek = array(
				      'Sunday' => 0,
				      'Monday' => 1,
				      'Tuesday' => 2,
				      'Wednesday' => 3,
				      'Thursday' => 4,
				      'Friday' => 5,
				      'Saturday' => 6
				    );
				    $languages = array(
				      '',
				      'English',
				      'Tagalog'
				    );
				    // TODO(rcruz): Add row for each service
				    while ($row = mysql_fetch_assoc($result)) {
				      print '<tr data-lm-locale="' . $result['locale_id'] . '">';
				      print '<td><select class="day-of-week">';
				      foreach ($daysOfWeek as $key => $value) {
				        if ($row['day_of_week'] == $value) {
				          print '<option value="' . $value . '" selected>' . $key . '</option>';
				        } else {
				          print '<option value="' . $value . '">' . $key . '</option>';
				        }
				        
				      }
				      print '</select></td>';

				      print '<td>';
				      print '<input class="schedule" type="text" value="' . strftime('%I:%M %p', strtotime($row['schedule'])) . '">';
				      print '</td>';

				      print '<td>';
				      $metadata = new DOMDocument();
				      $metadata->loadXML($row['metadata']);
				      $cws = $metadata->getElementsByTagName('cws')->item(0);
				      if (is_null($cws)) {
				        print '<input class="cws" type="checkbox"> CWS';
				      } else {
				        print '<input class="cws" type="checkbox" checked> CWS';
				      }
				      print '</td>';

              print '<td><select class="language">';
              $language = $metadata->getElementsByTagName('language')->item(0);
              $language = is_null($language) ? '' : $language->textContent;
              foreach ($languages as $value) {
                if ($language == $value) {
                  print '<option value="' . $value . '" selected>' . $value . '</option>';
                } else {
                  print '<option value="' . $value . '">' . $value . '</option>';
                }
              }
              print '</select></td>';

              print '<td><a href="#" class="delete">X</a></td>';
				      print '</tr>';
			      }
				    ?>
				  </table>
				  <a class="add-event" href="#">Add</a>
				</td>
			</tr>
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
    <script src="jquery.js" type="text/javascript"></script>
    <script src="edit.js" type="text/javascript"></script>
</div>
</form>
</body>
</html>