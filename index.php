<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
	<script type="text/javascript">
		var g_dir='<?php echo isset($_GET["dir"])?$_GET["dir"]:"" ?>';
		$( document ).ready(function() {
		});
	</script>
	<script type="text/javascript" src="/surface/uno.js"></script>

	<style type="text/css">
		body {
			margin: auto;
			background: url("./fondo.png") #082b4f;
			background-attachment: fixed;
			background-size: contain;
		}
		#nivel1 {
			width: 100%;
			margin-left: auto;
			margin-right: auto;
		}
		#nivel2 {
			width: 100%;
			position: absolute;
		}
		.ui-draggable-dragging {
			opacity: .7 !important; 
			z-index: 100 !important;
		}
		.simple {
			position: absolute;
			border-radius: 14px;
			opacity: 1;
			background-size: cover;
			background-repeat:no-repeat;
			background-position: center; 
		}
		.texto {
			display: table;
			width: 100%;
			height: 100%;
			color: white;
			z-index: -1000;
			font-family: monospace;
			opacity: .7;
			overflow: hidden;
			text-align: center;
		}
		.textoStr {	display: table-cell; vertical-align: middle; font-size: 1em; opacity: 1;}

		.conImage .texto .textoStr {display: block; margin-top: 96%; max-height: 12px; font-size: 0.8em; }

		.folderIcon .texto .textoStr {color: blue; font-family: serif; font-size: 1em; opacity: 1}

		.texto p {
			margin: auto;
			letter-spacing: -0.5px;
		}
		.temporal {
			position: relative;
			z-index: -1;
			float: left;
			opacity: 0;
			background-color: white;
		}

		.directorio {
			margin: 0px 0px 0px 0px !important;
		}
		.doDelete { width: 48px; margin-top: 0px; }

		.simple img { margin-left: 78%; margin-top: 4%; }

		.simpleBorrar {display: none; }

		input {margin-top: 5px;}

		.editMe {
			border: solid thin black;
			border-style: dashed;
		}

		.trashMe {
			border-image: url("icons/equis20.png");
		}

		@media screen and (min-width: 1px) and (max-width: 600px) {
			.directorio {width: 6em !important; height: 6em !important; background-color: black !important;}
	    	.ui-draggable-dragging {height: 3.5em !important; width: 3.5em !important;}
		    .simple {height: 4em; width: 4em;}
		    .temporal {height: 4em; width: 4em;}
		    .textoStr {font-size: 0.7em;}
			.folderIcon .texto .textoStr {font-size: 0.7em;}
	    }
		@media screen and (min-width: 601px) and (max-width: 900px) {
			.directorio {width: 8em !important; height: 8em !important; background-color: black !important;}
	    	.ui-draggable-dragging {height: 5em !important; width: 5em !important;}
		    .simple {height: 6em; width: 6em;}
		    .temporal {height: 6em; width: 6em;}
		    .textoStr {font-size: 0.8em;}
	    }
		@media screen and (min-width: 901px) and (max-width: 6000px) {
			.directorio {width: 9em !important; height: 9em !important; background-color: black !important;}
	    	.ui-draggable-dragging {height: 6em !important; width: 6em !important;}
		    .simple {height: 7em; width: 7em;}
		    .temporal {height: 7em; width: 7em;}
	    }
}


	</style>
</head>
<body>
	<div id="nivel1">
		<div id="nivel2">
		</div>
	</div>

<div id="dialog-form" title="Bot&oacute;n" style="font-size:.8em; display: none">
		<form >
			<fieldset>
				<label for="f_tipo">tipo</label>
				<input type="text" name="f_tipo" id="f_tipo" value="1" maxlength="1" size="1" class="text ui-widget-content ui-corner-all">
				<br/>
				<label for="f_nombre">nombre</label>
				<input type="text" name="f_nombre" id="f_nombre" value="" maxlength="240" size="24" class="text ui-widget-content ui-corner-all">
				<br/>
				<label for="f_color">color</label>
				<input type="text" name="f_color" id="f_color" value="rgba(225, 225, 225, .2)" maxlength="24" size="24" class="text ui-widget-content ui-corner-all">
				<br/>
				<label for="f_imagen">imagen</label>
				<input type="text" name="f_imagen" id="f_imagen" value="" maxlength="550" size="24" class="text ui-widget-content ui-corner-all">
				<br/>
				<label for="f_url">url</label>
				<input type="text" name="f_url" id="f_url" value="" maxlength="550" size="24" class="text ui-widget-content ui-corner-all">
				
				<!-- Allow form submission with keyboard without duplicating the dialog button -->
				<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
			</fieldset>
		</form>
	</div>
</body>
</html> 