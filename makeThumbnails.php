<?php

$data = file_get_contents('data.ser');


$a = json_decode($data);
$dataFinal = $a;
$contador = count($a);

foreach ($a as $key => $val) {
	$imagen = $val->image;
	$info = pathinfo($imagen);
    
	//$res = grab_image($imagen, $val->id);
	if(eregi('http:', $imagen)) {
		if($imagen) {
echo "<p>entrando : $imagen</p>";
			if(UR_exists($imagen)){
				$con = file_get_contents($imagen);
				$ext = '';
				if(isset($info['extension']))
					$ext = $info['extension'];
				$fichero = "/var/www/surface/icons/".$val->id.".$ext";
				$urlFinal = "/surface/icons/".$val->id.".$ext";
				file_put_contents($fichero, $con);
				if(imgThumbs($fichero)){
					$dataFinal[$key]->image = $urlFinal;
				}
			}
		}
	}
}

if(count($dataFinal) == $contador){
	$salida = json_encode($dataFinal);
	file_put_contents('data.ser', $salida);
	echo "<h1>fichero escrito</h1>";
}

echo "<h1>...FINALIZAMOS...</h1>";


function UR_exists($url){
   $headers=get_headers($url);
   return stripos($headers[0],"200 OK")?true:false;
}


	function imgThumbs($img) {
		if(file_exists($img)){
			$imagen = new Imagick($img);
			if($imagen->getImageHeight() <= $imagen->getImageWidth()){
				$imagen->resizeImage(120,0,Imagick::FILTER_LANCZOS,1);
			} else {
				$imagen->resizeImage(0,120,Imagick::FILTER_LANCZOS,1);
			}
			$imagen->setImageCompression(Imagick::COMPRESSION_JPEG);
			$imagen->setImageCompressionQuality(75);
			$imagen->stripImage();
			$imagen->writeImage($img);
			$imagen->destroy();
			chmod($img, 0777);

			return true;
		} else {
			return false;
		}
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
