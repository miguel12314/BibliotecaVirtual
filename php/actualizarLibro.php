<?php 
	include('conexion.php');

	$path="../uploads/";
	$ruta="uploads/";
	$Codigo=$_POST['Codigo'];
	$imagen=$ruta.$_FILES["imagenes"]["name"];
    $imagen1=$_FILES["imagenes"]["name"];
	if(!is_dir($path)){
		mkdir($path);
	}
    $query=mysql_query("select  count(*) as conteo from inventario WHERE Codigo=$Codigo",$conexion);
    $query=mysql_fetch_assoc($query);
    //echo "sad ".$query['conteo'];
    
    if($query['conteo']> 0 ){
        
        if($imagen1 != ""){
            echo"Listo ".$imagen;
            if($_FILES["imagenes"]["error"] == UPLOAD_ERR_OK){
                move_uploaded_file($_FILES["imagenes"]["tmp_name"], $path.$_FILES["imagenes"]["name"]);
                mysql_query("UPDATE inventario SET imagen='$imagen' WHERE Codigo=$Codigo",$conexion);
                mysql_query("UPDATE prestamo_libro SET imagen='$imagen' WHERE Codigo=$Codigo",$conexion);
            }  
        }
        else{
            echo"Error al subir imagen intentalo otra vez";
        }
    }
    else{
        echo "El Codigo no Existe";
    }
    

	
 ?>