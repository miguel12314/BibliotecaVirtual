<?php 
	include("conexion.php");

	$num=$_POST['numero'];
	if (isset($num)) {
		$entrega=mysql_query("SELECT DevolucionLibro($num)",$conexion)or die(mysql_error());
		$row=mysql_fetch_row($entrega);
		echo $row[0];
		
	}
	
	else{
		$ConsutaSitio=mysql_query("SELECT * from adeudos",$conexion)or die(mysql_error());

		while ($row=mysql_fetch_assoc($ConsutaSitio)) {
			$a[]=$row;
		}
		echo json_encode($a);
	}
	
 ?>