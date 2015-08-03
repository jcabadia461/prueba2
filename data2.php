<?php

$data = file_get_contents('data.ser');

$a = json_decode($data);

foreach ($a as $val) {
	$imagen = $val->image;
	$info = pathinfo($imagen);
	//$res = grab_image($imagen, $val->id);
	print_r($info);
}




	function grab_image($url,$saveto){
	    $ch = curl_init ($url);
	    curl_setopt($ch, CURLOPT_HEADER, 0);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
	    $raw=curl_exec($ch);
	    curl_close ($ch);
	    if(file_exists($saveto)){
	        unlink($saveto);
	    }
	    $fp = fopen($saveto,'x');
	    fwrite($fp, $raw);
	    fclose($fp);
	}


?>
