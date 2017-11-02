<?php 
	include("conexion.php");
	$codigo=json_decode(file_get_contents('php://input'))->{'codigo'};
	$matricula=json_decode(file_get_contents("php://input"))->{'matricula'};
	$entrega=mysql_query("SELECT adeudos($matricula,'$codigo')",$conexion)or die(mysql_error());
	$row=mysql_fetch_row($entrega);
	echo $row[0];
 ?>