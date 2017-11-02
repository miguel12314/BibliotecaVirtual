<?php 
	include('conexion.php');
	session_start();
	$pag=json_decode(file_get_contents('php://input'))->{'page'};
	$matricula=$_SESSION['userMatricula'];
	$consulta= mysql_query("CALL Usuario($pag,$matricula)",$conexion) or die("Error".mysql_error());
	while ($row=mysql_fetch_array($consulta)) {
		$r .=$row['libros'];
	}
	echo ('['.substr($r,0,-1).']');
	
 ?>