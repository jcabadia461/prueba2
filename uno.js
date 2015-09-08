var g_data = new Object();
var g_orden = new Object();
var g_idSrc, g_idTar;
var g_reordenar = false;
var g_movil;
var g_tiembla;
//var g_dir='ax_55'; 

$( window ).resize(function() {
	g_reordenar = true;
});

reordenar = function(){
	if(g_reordenar) {
		$(".temporal").css("margin", "4px");
		g_reordenar = false;
		var a = $(".nivel2");
		var lastRowElem = 0;
		a.each(function(atmp,b){
			xtop = $(b).position().top;
			if(xtop == 0)
				lastRowElem = $(b);
			xleft = $(b).position().left; 
		})
		setBestMargin(lastRowElem);
		g_orden = new Object();
		a.each(function(atmp,b){
			xtop = $(b).position().top;
			xleft = $(b).position().left; 
			g_orden[xtop + '_' + xleft] = atmp;
		})
		showAll();
	}
}

setBestMargin = function(lastRowElem){
	var id;
	id = $(lastRowElem).attr('id');
	flag = true;
	bestMargin = 4;
	while(flag){
		if($(lastRowElem).position().top == 0) {
			bestMargin++;
			$(".temporal").css("margin", bestMargin.toString()+"px");
		} else {
			bestMargin--;
			$(".temporal").css("margin", bestMargin.toString()+"px");
			flag = false;
		}
	}
	$(".simple").css("margin", bestMargin.toString()+"px");
}

showData = function(){
	g_reordenar = true;
	setInterval(function () {reordenar()}, 500);
	$.each(g_data, function(idx,rec){
		g_data[idx].getHtml();
		g_data[idx].showElem();
	});

	// recuperamos el orden original de los elementos y los guardamos en g_orden
	var a = $(".nivel2");
	a.each(function(a,b){
		xtop = $(b).position().top;
		xleft = $(b).position().left; 
		g_orden[xtop + '_' + xleft] = a;
	})

	$(".simple").on( "dragstop", function( event, ui ) {
		showAll();
	});

	$(".temporal").droppable({
	    // tolerance can be set to 'fit', 'intersect', 'pointer', or 'touch'
	    tolerance: 'intersect',
	    over: function(event, ui) {
			if($(event.srcElement).hasClass('textoStr')){
			   	idSrc = $(event.srcElement).parent().parent().attr('idElem');
			} else {
			   	idSrc = $(event.srcElement).parent().attr('idElem');
			}
	    	idTar = $(this).attr('idElem');
	    	if(idSrc != idTar) {
	    		if(idSrc != g_idSrc || idTar != g_idTar) {
	    			g_idSrc = idSrc;
	    			g_idTar = idTar;
	    			setTimeout(dropExec, 700, idSrc, idTar, $(this).attr("id"));
	    		}
	    	}
	    },
	    out: function(event, ui) {
		  	$(".directorio").removeClass('directorio');
	    	g_idSrc = '';
	    	g_idTar = '';
	    },
	    drop: function(event, ui) {
	    	g_idSrc = '';
	    	g_idTar = '';
	    	idTar = $(this).attr('idElem');
	    	idIdTar = $(this).attr('id');
	    	idSrc = $(event.srcElement).attr('idElem');

			elemSrc = $("#o_" + idSrc);
			//elemTar = $(this);
			elemTar = $("#o_" + idTar);

			//TODO, esta parte se está repitiendo.
			if(elemTar.position() != null && elemSrc.position() != null && elemTar.position() != null && elemSrc.position() != null){
				if(elemTar.position().top < elemSrc.position().top && elemTar.position().left < elemSrc.position().left){
					alturaSrc = elemSrc.position().top + elemSrc.height();
					alturaTar = elemTar.position().top + elemTar.height();
					anchoSrc = elemSrc.position().left + elemSrc.width();
					anchoTar = elemTar.position().left + elemTar.width();
					if(alturaTar >= alturaSrc && anchoTar >= anchoSrc){
						if(g_data[idTar].isDir()) {
							g_data[idSrc].chgPadre(idTar);
							console.log('** ENCARPETAR **');
						}
					} 
				}
			}
	    	showAll();
	    }
	});

		/**
		 *
		 * dialogo de nuevo botón
		 *
		 **/
		$(function() {
			var dialog, form;
			var idElem, idIdElem;

			function createNewButton() {
				var f_tipo = $("#f_tipo").val();
				var f_nombre = $("#f_nombre").val();
				var f_color = $("#f_color").val();
				var f_image = $("#f_imagen").val();
				var f_url = $("#f_url").val();
				dialog.dialog( "close" );

				g_data[idIdElem].setTipo(f_tipo);
				g_data[idIdElem].setNombre(f_nombre);
				g_data[idIdElem].setColor(f_color);
				g_data[idIdElem].setImage(f_image);
				g_data[idIdElem].setUrl(f_url);
				exporta();
			}

			dialog = $( "#dialog-form" ).dialog({
				autoOpen: false,
				height: 300,
				width: 320,
				modal: true,
				buttons: {
					"Listo": createNewButton,
					Cancel: function() {
						dialog.dialog( "close" );
					}
				},
				close: function() {}
			});
			$(".simple").click(function() {
				$this = $(this);
				if($this.hasClass('editMe')){
					switch(this.id){
						case 'o_ax_trash' :
							break;
						case 'o_ax_edit' :
							g_tiembla = false;
							$(".normalIcon").removeClass("editMe");	
							break;
						default :
							idElem = $(this).attr('id'); 
							idIdElem = $("#"+idElem).attr("idElem");
							$("#f_tipo").val(g_data[idIdElem].getTipo());
							$("#f_nombre").val(g_data[idIdElem].getNombre());
							$("#f_color").val(g_data[idIdElem].getColor());
							$("#f_imagen").val(g_data[idIdElem].getImage());
							$("#f_url").val(g_data[idIdElem].getUrl());
							dialog.dialog( "open" );
					}
				} else {
					switch(this.id){
						case 'o_ax_trash' :
							if(g_tiembla)
								stopTiembla();
							else
								startTiembla();
							break;
						case 'o_ax_edit' :
							if(g_tiembla)
								stopTiembla();
							if($(".normalIcon").hasClass("editMe"))
								$(".normalIcon").removeClass("editMe");	
							else
								$(".normalIcon").addClass("editMe");
							break;
						default :
							if(!g_tiembla){
								objId = $this.attr('idElem');
								url = g_data[objId].getUrl();
								if(url){
									window.open(url, '_blank');
								}
							}
					}
				}

			});
		});
}


dropExec = function(idSrc, idTar, idIdTar) {
console.log('***********************************************');
console.log(idSrc);
console.log(idTar);
console.log(idIdTar);
	if(idSrc == g_idSrc && idTar == g_idTar){
		g_idSrc = 0;
		g_idTar = 0;
		elemSrc = $("#o_" + idSrc);
		elemTar = $("#" + idIdTar);
		if(elemTar.position() != null && elemSrc.position() != null && elemTar.position() != null && elemSrc.position() != null){
			if(idTar != 'ax_trash' && idSrc != 'ax_trash' && idTar != 'ax_edit' && idSrc != 'ax_edit'){
				if(g_data[idTar].getTipo() == '4' && g_data[idSrc].getTipo() == '1'){
					if(elemTar.position().top < elemSrc.position().top && elemTar.position().left < elemSrc.position().left){
						alturaSrc = elemSrc.position().top + elemSrc.height();
						alturaTar = elemTar.position().top + elemTar.height();
						anchoSrc = elemSrc.position().left + elemSrc.width();
						anchoTar = elemTar.position().left + elemTar.width();
						if(alturaTar > alturaSrc && anchoTar > anchoSrc){
							g_data[idTar].setClassDir();
							return;
						}
					}
				}
			}
			idObjSrc = idSrc;
			idObjTarget = idTar;
			targetID = idIdTar;
			sourceID = g_data[idObjSrc].getIdTemporal();
			g_data[idObjSrc].setTemporal(targetID);
			g_data[idObjTarget].setTemporal(sourceID);
			showAll(idObjSrc);
		} else {
			console.log('hay un error');
		}
	}
}

showAll = function(excluye){
  	$(".directorio").removeClass('directorio');
	$.each(g_data, function(idx,rec){
		if(idx != excluye) {
			g_data[idx].showElem();
		} else {
			exporta();
		}
	});
}

inicio = function(){
   	g_movil = false;
	if($.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))){
    	g_movil = true;
	}	
	$.getJSON('/surface/data.php?dir='+g_dir, function (response) {
		i = 0;
		$.each(response, function(idx, rec){
			// luego creamos el enlace
			g_data[rec.id] = new objSimple();
			g_data[rec.id].init(rec);
			i++;
		})
		setTimeout(function(){ showData(); }, 300);
	})
}

/**
 *
 **/
 objSimple = function(){
 	this.p_data, this.p_contenedor, this.p_obj, this.p_objTmp;

 	this.init = function(data){
 		this.p_data = data;
 		if(data.padre = '0'){
 			this.p_contenedor = 'nivel2';
 		} else {
 			this.p_contenedor = g_data[data.padre].p_contenedor;
 		}
 	}
 	this.dropped = function(idSrc) {
 		if(this.p_obj.hasClass('directorio')){
 			this.p_obj.removeClass('directorio');
	 		g_data[idSrc].destroy();
 		}
 	}
 	this.setClassDir = function() {
 		this.p_obj.addClass('directorio');
 	}
 	this.isDir = function(){
 		return this.p_obj.hasClass('directorio');
 	}
 	this.destroy = function(){
 		this.p_obj.remove();
 		this.p_objTmp.remove();
 	}
 	this.getId = function(){
 		return this.p_data.id;
 	}
 	this.getHtml = function(){
		// creamos el botón
		html = '<div id="o_'+this.getId()+'" idElem="'+this.getId()+'" class="'+this.getClass()+'" style=""></div>';
		$("#"+this.p_contenedor).append(html);
		this.p_obj = $("#o_"+this.getId());

		if(this.getId() != 'ax_trash' && this.getId() != 'ax_edit') {
			$(this.p_obj).append('<a href="javascript:void(0)" onclick="trashIcon(\''+this.getId()+'\');" class="simpleBorrar"><img src="icons/equis20.png"/></a>');
		}

		$(this.p_obj).append("<div class='texto'><div class='textoStr'></div></div>");

		if(this.p_data.image != ""){
			this.setImage(this.p_data.image);
		}

		this.setColor(this.p_data.color);
		this.setTipo(this.p_data.tipo);
		this.setNombre(this.p_data.nombre);
		this.p_obj.draggable();
		/* if(this.p_data.tipo == '2'){this.p_obj.addClass("insertable");} */

		//creamos el temporal
		html = '<div id="t_'+this.getId() +'" class="nivel2 temporal"></div>';
		$("#"+this.p_contenedor).append(html);

		this.setTemporal("t_"+this.getId());

	}

	this.chgPadre = function(idPadre){
		console.log("El padre es : " + idPadre);
		//this.p_obj.hide();
		//this.p_objTmp.hide();
	}
	this.setTemporal = function(id){
		this.p_objTmp = $("#"+id);
		this.p_objTmp.attr('idElem', this.getId());
	}
	this.getIdTemporal = function() {
		return this.p_objTmp.attr("id"); 
	}
	this.getTop = function(){
		return this.p_obj.position().top;
	}
	this.getLeft = function(){
		return this.p_obj.position().left;
	}
	this.getTopTemporal = function() {
		return this.p_objTmp.position().top;
	}
	this.getLefTemporal = function() {
		return this.p_objTmp.position().left;
	}
	this.getOrdenTemporal = function() {
		return g_orden[this.getTopTemporal() + '_' + this.getLefTemporal()];
	}
	this.showElem = function(){
		if(this.getTop() != this.getTopTemporal() || this.getLeft() != this.getLefTemporal()){
			if(g_movil){
				this.p_obj.css('top',this.getTopTemporal());
				this.p_obj.css('left',this.getLefTemporal());
			} else {
				this.p_obj.animate({
					top: this.getTopTemporal(),
					left: this.getLefTemporal()
				});
			}
		}
	}

	this.setClass = function(clase){
		this.p_data.clase = clase;
		this.p_obj.addClass(clase);
	}


	this.getClass = function(){
		var clase = this.p_data.clase;
		switch(this.getId()){
			case 'ax_trash' :
			case 'ax_edit' :
				break;
			default :
				clase = clase + " normalIcon";
		}
		if(this.getTipo() == '4')
			clase = clase + " folderIcon";	
		return clase;
	}


	this.getTipo = function(){
		return this.p_data.tipo;
	}
	this.setTipo = function(tipo){
		this.p_data.tipo = tipo;
		if(tipo == '4'){
			this.setImage('folder-icon.png');
			this.setColor('rgba(255,255,255,.1)');
		}
	}

	this.getNombre = function(){
		return this.p_data.nombre;
	}
	this.setNombre = function(nombre){
		this.p_data.nombre = nombre;
		if(this.getTipo() != 2){
			this.p_obj.find(".textoStr").html(nombre);
			//si tiene imágen, ponemos el texto debajo de la imágen
			if(this.getTipo() != 4 && this.getImage() != ""){
				this.p_obj.addClass('conImage');
			} else {
				this.p_obj.removeClass('conImage');
			}
		} else {
			//this.p_obj.find(".textoStr").html(nombre);
		}
	}
	this.getColor = function() {
		return this.p_data.color;
	}
	this.setColor = function(color){
		this.p_data.color = color;
		this.p_obj.css("background-color",color);
	}
	this.getImage = function() {
		return this.p_data.image;
	}
	this.setImage = function(name) {
		this.p_data.image = name;
		this.p_obj.css("background-image", "url('"+name+"')");
	}
	this.getUrl = function() {
		var url = '';
		if(this.p_data.tipo == '4'){
			url = "/surface?dir="+this.getId();
		} else
			url = this.p_data.url;
		return url;
	}
	this.setUrl = function(url){
		this.p_data.url = url;
	}
}

exporta = function(){
	var finalData = new Object();
	$.each(g_data, function(idx, rec){
		data = g_data[idx].p_data;
		if (typeof data.id != 'undefined') {
			finalData[g_data[idx].getOrdenTemporal()] = new Object();
			finalData[g_data[idx].getOrdenTemporal()]['id'] = data.id;
			finalData[g_data[idx].getOrdenTemporal()]['nombre'] = data.nombre;
			finalData[g_data[idx].getOrdenTemporal()]['color'] = data.color;
			finalData[g_data[idx].getOrdenTemporal()]['tipo'] = data.tipo;
			finalData[g_data[idx].getOrdenTemporal()]['padre'] = data.padre;
			finalData[g_data[idx].getOrdenTemporal()]['clase'] = data.clase;
			finalData[g_data[idx].getOrdenTemporal()]['image'] = data.image;
			finalData[g_data[idx].getOrdenTemporal()]['url'] = data.url;
		}
	})
	$.post('data_update.php?dir='+g_dir, {data : JSON.stringify(finalData)}, function(data, status){});
}

$( document ).ready(function() {
	inicio();
});



trashIcon = function(id){
	if(confirm("Borrar : " + g_data[id].p_data.nombre)){
		console.log("borrar : " + id);
	}
}
tiembla = function(num){
    $(".normalIcon").css('transform', 'rotate('+num+'deg)');
}
tiemblaMas = function() {
	tiembla(0);
	if(g_tiembla) {
		tiembla(1);
		setTimeout(function(){tiemblaMenos()}, 100);
	}
}
tiemblaMenos = function(){
	tiembla(0);
	if(g_tiembla) {
		tiembla(-1);
		setTimeout(function(){tiemblaMas()}, 100);
	}
}
stopTiembla = function() {
	g_tiembla = false;
	$(".simpleBorrar").css("display", "none");
	$(".texto").show();
	tiemblaMas();
}
startTiembla = function(){
	g_tiembla = true;
	$(".simpleBorrar").css("display", "block");	
	$(".texto").hide();
	tiemblaMas();
}