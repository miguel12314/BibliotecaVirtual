<?php 
	include('conexion.php');

	$path="../uploads/";
	$ruta="uploads/";
	$Codigo=$_POST['Codigo'];
	$Titulo=$_POST['Titulo'];
	$Autor=$_POST['Autor'];
	$Clasificacion=$_POST['Clasificacion'];
	$Editorial=$_POST['Editorial'];
	$Edicion=$_POST['Edicion'];
	$Ejemplares=$_POST['Ejemplares'];
	$imagen=$ruta.$_FILES["imagenes"]["name"];

	if(!is_dir($path)){
		mkdir($path);
	}

	if($_FILES["imagenes"]["error"] == UPLOAD_ERR_OK){
		move_uploaded_file($_FILES["imagenes"]["tmp_name"], $path.$_FILES["imagenes"]["name"]);
	}
	
	//echo "dfsdfs ".$registro->{'Titulo'};

	$insert=MYSQL_QUERY("SELECT Registro_Libros(".$Codigo.",
												'".$Titulo."',
												'".$Autor."',
												'".$Clasificacion."',
												'".$Editorial."',
												'".$Edicion."',
												".$Ejemplares.",
												'".$imagen."')",$conexion) 
			or die('Error en el registro'.mysql_error());
	
	$Resultado=mysql_fetch_row($insert);
	echo $Resultado[0];
 ?>