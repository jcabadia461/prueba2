var g_data = new Object();
var g_orden = new Object();
var g_idSrc, g_idTar;
var g_reordenar = false;

$( window ).resize(function() {
	g_reordenar = true;
});

reordenar = function(){
	if(g_reordenar) {
		g_reordenar = false;
		g_orden = new Object();
		var a = $(".nivel2");
		a.each(function(a,b){
			xtop = $(b).position().top;
			xleft = $(b).position().left; 
			g_orden[xtop + '_' + xleft] = a;
		})
		showAll();
	}
}

showData = function(){
	setInterval(function () {reordenar()}, 1000);
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
	    	idSrc = $(event.srcElement).attr('idElem');
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
			elemTar = $(this);

			//TODO, esta parte se está repitiendo.
			if(elemTar.position() != null && elemSrc.position() != null && elemTar.position() != null && elemSrc.position() != null){
				if(elemTar.position().top < elemSrc.position().top && elemTar.position().left < elemSrc.position().left){
					alturaSrc = elemSrc.position().top + elemSrc.height();
					alturaTar = elemTar.position().top + elemTar.height();
					anchoSrc = elemSrc.position().left + elemSrc.width();
					anchoTar = elemTar.position().left + elemTar.width();
					if(alturaTar > alturaSrc && anchoTar > anchoSrc){

						if(g_data[idTar].isDir()) {
							g_data[idSrc].chgPadre(idTar);
							console.log('** ENCARPETAR **');
						}
					} 
				}
			}
	//	    	g_data[idTar].dropped(idSrc);
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
				var f_nombre = $("#f_nombre").val();
				var f_color = $("#f_color").val();
				var f_image = $("#f_imagen").val();
				var f_url = $("#f_url").val();
				dialog.dialog( "close" );

				g_data[idIdElem].setNombre(f_nombre);
				g_data[idIdElem].setColor(f_color);
				g_data[idIdElem].setImage(f_image);
				g_data[idIdElem].setUrl(f_url);
				g_data[idIdElem].setTipo('1');
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
							$(".simple").removeClass("editMe");	
							break;
						default :
							idElem = $(this).attr('id'); 
							idIdElem = $("#"+idElem).attr("idElem");
							$("#f_nombre").val(g_data[idIdElem].getNombre());
							$("#f_color").val(g_data[idIdElem].getColor());
							$("#f_imagen").val(g_data[idIdElem].getImage());
							$("#f_url").val(g_data[idIdElem].getUrl());
							dialog.dialog( "open" );
					}
				} else {
					switch(this.id){
						case 'o_ax_trash' :
							break;
						case 'o_ax_edit' :
							if($(".simple").hasClass("editMe")){
								$(".simple").removeClass("editMe");	
							} else {
								$(".simple").addClass("editMe");
							}
							break;
						default :
							objId = $this.attr('idElem');
							url = g_data[objId].getUrl();
							if(url){
								window.open(url, '_blank');
							}
					}
				}

			});
		});
}

dropExec = function(idSrc, idTar, idIdTar) {
	if(idSrc == g_idSrc && idTar == g_idTar){
		g_idSrc = 0;
		g_idTar = 0;
		elemSrc = $("#o_" + idSrc);
		elemTar = $("#" + idIdTar);
		if(elemTar.position() != null && elemSrc.position() != null && elemTar.position() != null && elemSrc.position() != null){
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
	var a = $(".directorio");
	a.each(function(a,b){
		$(b).removeClass('directorio');
	})	
	$.each(g_data, function(idx,rec){
		if(idx != excluye) {
			g_data[idx].showElem();
		} else {
			exporta();
		}
	});
}

inicio = function(){
	$.getJSON('/surface/data.php', function (response) {
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
		html = '<div id="o_'+this.getId()+'" idElem="'+this.getId()+'" class="'+this.p_data.clase+'" style=""></div>';
		$("#"+this.p_contenedor).append(html);
		this.p_obj = $("#o_"+this.getId());

		if(this.p_data.image != ""){
			this.setImage(this.p_data.image);
		}

		this.setColor(this.p_data.color);

		this.p_obj.draggable();

		if(this.p_data.tipo == '2'){
			this.p_obj.addClass("insertable");
		}

		//creamos el temporal
		html = '<div id="t_'+this.getId() +'" class="nivel2 temporal"></div>';
		$("#"+this.p_contenedor).append(html);

		this.setTemporal("t_"+this.getId());
	}

	this.chgPadre = function(idPadre){
		console.log(idPadre);
		this.p_obj.hide();
		this.p_objTmp.hide();
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
			this.p_obj.animate({
				top: this.getTopTemporal(),
				left: this.getLefTemporal()
			});
		}
	}

	this.setClass = function(clase){
		this.p_data.clase = clase;
		this.p_obj.addClass(clase);
	}
	this.getNombre = function(){
		return this.p_data.nombre;
	}
	this.setNombre = function(nombre){
		this.p_data.nombre = nombre;
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
		return this.p_data.url;
	}
	this.setUrl = function(url){
		this.p_data.url = url;
	}
	this.setTipo = function(tipo){
		this.p_data.tipo = tipo;
	}
}

exporta = function(){
	var finalData = new Object();
	$.each(g_data, function(idx, rec){
		data = g_data[idx].p_data;
		finalData[g_data[idx].getOrdenTemporal()] = new Object();
		finalData[g_data[idx].getOrdenTemporal()]['id'] = data.id;
		finalData[g_data[idx].getOrdenTemporal()]['nombre'] = data.nombre;
		finalData[g_data[idx].getOrdenTemporal()]['color'] = data.color;
		finalData[g_data[idx].getOrdenTemporal()]['tipo'] = data.tipo;
		finalData[g_data[idx].getOrdenTemporal()]['padre'] = data.padre;
		finalData[g_data[idx].getOrdenTemporal()]['clase'] = data.clase;
		finalData[g_data[idx].getOrdenTemporal()]['image'] = data.image;
		finalData[g_data[idx].getOrdenTemporal()]['url'] = data.url;
	})

	$.post('data_update.php', {data : JSON.stringify(finalData)}, function(data, status){
	});
}




inicio();