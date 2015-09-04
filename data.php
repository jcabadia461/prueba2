<?php
$fichero = '';
if(isset($_GET['dir']) && $_GET['dir']){
	if(!file_exists($_GET['dir'].".ser")){
		copy('limpio.ser', $_GET['dir'].".ser");
	}
	$fichero = $_GET['dir'].".ser";
}
if(!$fichero)
	$fichero = 'data.ser';

$data = file_get_contents($fichero);

echo $data;

?>
