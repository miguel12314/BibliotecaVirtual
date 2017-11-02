<?php 
	include("conexion.php");
	
	$matricula=$_POST['Matricula'];
	$Identificacion=$_POST['Identificacion'];
	$Libro=$_POST['Libro'];
	$entrega=mysql_query("SELECT Consulta_Sitio($matricula,'$Identificacion','$Libro')",$conexion)or die(mysql_error());
	$row=mysql_fetch_row($entrega);
	echo $row[0];
 ?>