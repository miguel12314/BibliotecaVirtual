<?php 
	include("conexion.php");
	session_start();
	$apartar=json_decode(file_get_contents('php://input'))->{'libro'};
    $imagen=json_decode(file_get_contents('php://input'))->{'imagen'};
	$matricula=$_SESSION['userMatricula'];
	
	$apartado= mysql_query("SELECT PrestamoLibro($matricula,'$apartar','$imagen')",$conexion) or die("Error".mysql_error());
	$row=mysql_fetch_row($apartado);
	echo $row[0];
 ?>