<?php 
session_start();
session_destroy();
	header("Location: /arcanaBibliotecaV1.3/templates/login.html");
 ?>