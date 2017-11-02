<?php 
	include('conexion.php');

	
    $query=mysql_query("select ID_Inventario,Autor,Clasificacion,Codigo,Edicion,Editorial,Ejemplares,Titulo from inventario",$conexion);
    
    $json=array();
    while($row=mysql_fetch_assoc($query)){
        $json[] = $row;
    }
    echo json_encode($json);

	
 ?>