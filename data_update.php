<?php

$fichero = '';
if(isset($_GET['dir']) && $_GET['dir']){
	if(file_exists($_GET['dir'].".ser")){
		$fichero = $_GET['dir'].".ser";
	}
}
if(!$fichero)
	$fichero = 'data.ser';
    
if(isset($_POST['data']) && $_POST['data']){
	$data = $_POST['data'];
	$data = json_decode($data);
	$arr = array();
	foreach($data as $val){
		$arr[] = array(
			'id' 		=> $val->id,
			'nombre'	=> $val->nombre,
			'color'		=> $val->color,
			'tipo'		=> $val->tipo,
			'padre'		=> $val->padre,
			'clase'		=> $val->clase,
			'image'		=> $val->image,
			'url'		=> $val->url
			);
	}

	while(count($arr) < 100) {
		$arr[] = array('id' => 'new_'.rand().'_'.count($arr), 'nombre' => 'nuevo','color' => 'rgba(255,255,255,.1)', 'tipo' => '2', 'padre' => '0', 'clase' => 'simple', 'image' => '', 'url' => '');
	}

	$fp = fopen($fichero, 'w');
	fwrite($fp, json_encode($arr));
	fclose($fp);
}


?>