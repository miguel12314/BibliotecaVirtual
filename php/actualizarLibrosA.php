<?php 
	include('conexion.php');

	$id=$_POST['id'];
	$Codigo=$_POST['Codigo'];
	$Titulo=$_POST['Titulo'];
	$Autor=$_POST['Autor'];
	$Clasificacion=$_POST['Clasificacion'];
	$Editorial=$_POST['Editorial'];
	$Edicion=$_POST['Edicion'];
	$Ejemplares=$_POST['Ejemplares'];
    $query=mysql_query("UPDATE inventario SET Codigo='$Codigo',Titulo='$Titulo',Autor='$Autor',Editorial='$Editorial',Edicion='$Edicion',Clasificacion='$Clasificacion',Ejemplares='$Ejemplares' WHERE ID_Inventario=$id",$conexion) or die("Error guardar 1");
           mysql_query("UPDATE prestamo_libro SET Codigo='$Codigo',Libro='$Titulo',Autor='$Autor',Editorial='$Editorial',Edicion='$Edicion',Ejemplares='$Ejemplares' WHERE ID_Prestamo=$id",$conexion) or die("Error guardar 2");

	
 ?>