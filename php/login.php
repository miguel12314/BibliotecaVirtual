<?php
include_once("conexion.php");
session_start();

$json = file_get_contents('php://input');

$login=json_decode(json_decode($json)->{'login'});
//echo $login->{password};
$usuario=$login->{'usuario'};
$password=$login->{'password'};



$consulta= mysql_query("SELECT login($usuario,'$password')",$conexion) or die("Error en la Consulta".mysql_error());
$Resultado=mysql_fetch_row($consulta);
if ($Resultado[0] !== "Usuario o Password Incorrecto") {
	$_SESSION['userMatricula']=$usuario;
}
echo $Resultado[0];
?>
