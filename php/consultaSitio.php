<?php 
	include("conexion.php");
	$num=$_POST['numero'];
	if (isset($num)) {
	   $matricula=$_POST['Matricula'];
		$Identificacion=$_POST['Identificacion'];
		$Libro=$_POST['Libro'];
		$entrega=mysql_query("SELECT Consulta_Sitio($num,$matricula,'$Identificacion','$Libro')",$conexion)or die(mysql_error());
		$row=mysql_fetch_row($entrega);
		echo $row[0];
		
	}
	
	else{
		$ConsutaSitio=mysql_query("SELECT * from consutassitio WHERE Status=0",$conexion)or die(mysql_error());

		while ($row=mysql_fetch_assoc($ConsutaSitio)) {
			$a[]=$row;
		}
		echo json_encode($a);
	}
 ?>