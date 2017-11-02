<?php
	$json = file_get_contents('php://input');
	$hola=json_decode($json)->{'hola'};
// Folder uploads file
$folder = "nuevo_folder/";
// If does not exist folder, it is created
if(!is_dir($folder)) {
  mkdir($folder,0777,true);
  chmod($folder,0777);
}
// If does not exist error
if ($_FILES["file"]["error"] == UPLOAD_ERR_OK) {
  // Move file into folder
  move_uploaded_file( $_FILES["file"]["tmp_name"], $folder . $_FILES['file']['name']);
}
// Response with object file
echo json_encode([$_FILES['file'],$_POST])." ".$hola;
?>