<?php
include_once("conexion.php");

$json = file_get_contents('php://input');
$json1=json_decode($json);
$var=$json1->{'registro'};
$b=json_decode($var);

if($b->{'numeroI'}){
    $numeroI=$b->{'numeroI'};
}
else{
    $numeroI='';
}

If($b->{'numeroE'}){
    $numeroE=$b->{'numeroE'};
}
else{
    $numeroE='';
}
//echo "s"$numeroI;
$consulta= mysql_query("SELECT Registro(1,'".$b->{'nombre'}."','".$b->{'apellidoP'}."','".$b->{'apellidoM'}."','".$b->{'sexo'}."','".$b->{'calle'}."',IFNULL('".$numeroI."',NULL),IFNULL('".$numeroI."',NULL),'".$b->{'colonia'}."','".$b->{'delegacion'}."','".$b->{'correo'}."','".$b->{'password'}."',".$b->{'matricula'}.",'".$b->{'carrera'}."','".$b->{'semestre'}."')",$conexion) or die("Error en la Consulta".mysql_error());
$Resultado=mysql_fetch_row($consulta);
echo $Resultado[0];
?>
