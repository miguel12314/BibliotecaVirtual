<?php 
	include('conexion.php');

	$id=$_POST['id'];
    $query=mysql_query("DELETE FROM inventario WHERE ID_Inventario=$id",$conexion) or die("Error guardar 1");
           mysql_query("DELETE FROM prestamo_libro WHERE ID_Prestamo=$id",$conexion) or die("Error guardar 2");

	
 ?>