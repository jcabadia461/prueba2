<?php

foreach (glob("/var/www/surface/*.png") as $key => $val) {
	if(is_file($val)){
		$imagen = new Imagick($val);
		$wid = $imagen->getImageWidth();
		if($wid > 120){
			echo "<b>", __FILE__, "</b> linea : ", __LINE__, "<pre>"; print_r($val);echo "</pre>";
   			if($imagen->getImageHeight() <= $imagen->getImageWidth()){
				$imagen->resizeImage(120,0,Imagick::FILTER_LANCZOS,1);
			} else {
				$imagen->resizeImage(0,120,Imagick::FILTER_LANCZOS,1);
			}
			$imagen->setImageCompression(Imagick::COMPRESSION_JPEG);
			$imagen->setImageCompressionQuality(75);
			$imagen->stripImage();
			$imagen->writeImage($val);
			$imagen->destroy();
			chmod($val, 0777);
		}
	}	    
}

echo "<h1>...FINALIZAMOS...</h1>";

?>
