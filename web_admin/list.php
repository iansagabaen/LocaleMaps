<?php 
	include "includes/sessionLoader.php";
	include "includes/opendb.php";
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head><title>Locale Database Listing</title></head>

<link rel="stylesheet" type="text/css" href="css.css" />

<body>
<div ALIGN="center">
<H2>Select a Location to Edit or Remove</H2>

<?php

  $sortvar = 'name';
  
  if(ISSET($_GET['sortby'])){
      $sortvar = $_GET['sortby'];
  }
	
	$query = "SELECT localeid,name,address1,city,state,country,zip, date_format(timestamp,'%M %d, %Y') AS timestamp FROM locale ORDER BY $sortvar ASC";
	
	$result = mysql_query( $query );
	$numrows = mysql_numrows( $result );
	
	if( $numrows == 0 ){
		//no results
		echo "<div style='background-color: #00ee00; padding: 20px;'>
			Sorry, there were no results.
		      </div>";
	} else {
		//show results
		echo "<div style='background-color: #eeeeee; padding: 20px;'>
			Found $numrows Locations.<br />
			Sorty these columns by: <a href='list.php?sortby=name'>Name</a>, <a href='list.php?sortby=address1'>Address</a>, <a href='list.php?sortby=city'>City</a>, <a href='list.php?sortby=state'>State</a>, <a href='list.php?sortby=zip'>Zip</a>, <a href='list.php?sortby=country'>Country</a>, <a href='list.php?sortby=timestamp'>Last Edited</a> 
		      </div>";
		echo "<table><tr>
			<td align='left' width=''><strong>.</strong></td>
			<td align='left' width='100'><strong>Name</strong></td>
			<td align='left' width='100'><strong>Address1</strong></td>
			<td align='left' width='100'><strong>City</strong></td>
			<td align='left' width='100'><strong>State</strong></td>
			<td align='left' width='100'><strong>Zip</strong></td>
			<td align='left' width='100'><strong>Country</strong></td>
			<td align='left' width='100'><strong>Last Edited</strong></td>			
			<td align='left' width=''><strong>.</strong></td>
			</tr>";
		      echo "&nbsp;<br />";
		      
		      for($i=0;$i<$numrows;$i++){
			
			$localeid            = mysql_result($result, $i, 'localeid');
			$Name                = mysql_result($result, $i, 'name');
			$Address1            = mysql_result($result, $i, 'address1');
			$City                = mysql_result($result, $i, 'city');
			$State               = mysql_result($result, $i, 'state');
			$Country             = mysql_result($result, $i, 'country');
			$Zip                 = mysql_result($result, $i, 'zip');
			$Timestamp           = mysql_result($result, $i, 'timestamp');
			
			$showNum = $i+1;
			
			
			if($i%2==0){
			echo "<tr>
				<td align='left' bgcolor='#f9e5d1'><a href='edit.php?id=$localeid'>edit</a>&nbsp;</td>
				<td align='left' bgcolor='#f9e5d1'> $Name</td>
				<td align='left' bgcolor='#f9e5d1'> $Address1</td>
				<td align='left' bgcolor='#f9e5d1'> $City</td>
				<td align='left' bgcolor='#f9e5d1'> $State</td>
				<td align='left' bgcolor='#f9e5d1'> $Zip</td>
				<td align='left' bgcolor='#f9e5d1'> $Country</td>
				<td align='left' bgcolor='#f9e5d1'> $Timestamp</td>
				<td align='left' bgcolor='#f9e5d1'> <a href='delete.php?id=$localeid'>delete</a>&nbsp;</td>
			</tr>";
			} else {
			echo "<tr>
				<td align='left' ><a href='edit.php?id=$localeid'>edit</a>&nbsp;</td>
				<td align='left' > $Name</td>
				<td align='left' > $Address1</td>
				<td align='left' > $City</td>
				<td align='left' > $State</td>
				<td align='left' > $Zip</td>
				<td align='left' > $Country</td>
				<td align='left' > $Timestamp</td>
				<td align='left' > <a href='delete.php?id=$localeid'>delete</a>&nbsp;</td>
			</tr>";	
			}
		      }//for
		      
		      echo "</table>";// end table echo
	}//else numrows=0
?>
&nbsp;<br />
<a href='index.php'>Main Menu</a>
</div>
</form>
</body>
</html>