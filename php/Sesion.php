<?php 
session_start();
if (!isset($_SESSION['userMatricula'])) {
	echo "/arcanaBibliotecaV1.3/templates/login.html";
}

 ?>