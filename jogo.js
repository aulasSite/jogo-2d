var listaX = [1];
var listaY = [1] ;
//var pixelX = [];
//var pixelY = [];
$(function () {
	var player='<div id="personagem"></div>';
	var numeroDeZumbi = 0;
	var divZumbi='<div id="zumbi0" class="zumbi"></div>';
	$('#map').append(player);
	$('#map').append(divZumbi);
	listaX[0] = $('#zumbi0').position().left;
	listaY[0] = $('#zumbi0').position().top;
	console.log(listaX);
	moveZumbi('#zumbi0');
	
	function zumbiXY(num){
		var varZumbi = '#zumbi' + num;
		//console.log("pos do " + varZumbi);
		listaX[num] = $(varZumbi).position().left;
		listaY[num] = $(varZumbi).position().top;
		//console.log(listaY);
	}	
	function update(){
		var contador = 0;
		var total = numeroDeZumbi + 1;
		//console.log("total: " + total);
		while(contador < total ){
			zumbiXY(contador);
			contador+=1;
		}
		/*contador = 0 ;
		pixelX = [];
		while(contador<30){
			pixelX.push($('#personagem').position().left + contador);
			contador++;
		}
		//console.log(listaX);*/
	}
	function colide(){
		
		var x = $('#personagem').position().left;
		var erros = 0;
		var y = $('#personagem').position().top;
		var contador = 1;
		console.log('x: ' + x + " zumbi: "+ listaX[0] );
		/*$.each([ listaX ], function( index, value ) {
			//console.log( x + " zumbi: "+ value );
			if(x > value && x < value+30){
				
				//console.log(x +">"+ value +"and" + x +"<" + (value+30));
				erros++;
			}
		});									//verifica o x
		$.each([ listaY ], function( index, value ) {
			//console.log( y + " zumbi: "+ value );
			if( y > value && y < value+30){
				console.log(y +">"+ value +"and" + y +"<" + (value+30));
				erros++;
			}
		});									//verifica o y*/
	console.log('erros:' + erros);
	if(erros > 1){alert("perdeu");}
	}
	
	
	
	window.setInterval(function(){
		numeroDeZumbi++;
		divZumbi='<div id="zumbi' + numeroDeZumbi + '" class="zumbi"></div>';
		$('#map').append(divZumbi);
		var nome = "#zumbi" + numeroDeZumbi;
		zumbiXY(numeroDeZumbi);
		moveZumbi(nome);
		update();
	},600000);
	

	var pressedKeys = [];
	var teclasEstado = [];
	$(document.body).keydown(function (evt) {										//detecta quando abaixado
		colide('x');
		var li = pressedKeys[evt.keyCode];
		if (!li) {
				pressedKeys[evt.keyCode] = li;
			}
		if(jQuery.inArray( (evt.keyCode + "down"), teclasEstado) == -1){
			//console.log(jQuery.inArray( (evt.keyCode + "down"), teclasEstado));
				//console.log(evt.keyCode + "down");
				var index = teclasEstado.indexOf(evt.keyCode + "up");
				if (index !== -1) {
					teclasEstado[index] = evt.keyCode + "down" ;
				}
				else{
					teclasEstado.push(evt.keyCode + "down");
				}
			
					//console.log(teclasEstado);
					
					//console.log("tá na posição " + index);
				}
				
			});
			
			$(document.body).keyup(function (evt) {								//detecta quando levanta
				var li = pressedKeys[evt.keyCode];
				if (!li) {
				}
				var index = teclasEstado.indexOf(evt.keyCode + "down");
				if (index !== -1) {
					teclasEstado[index] = evt.keyCode + "up" ;
				}
				else{
					teclasEstado.push(evt.keyCode + "up");
				}
				
				//console.log(teclasEstado);
				
				
				//console.log(evt.keyCode + "up");
			});

	
	setInterval(function(){
		var esquerda = $('#personagem').css('left');
		
		esquerda = esquerda.replace('px','');
		var baixo = $('#personagem').css('bottom');
		baixo = baixo.replace('px','');
		 if (jQuery.inArray("37down" , teclasEstado) != -1 && esquerda > 0) {
				$("#personagem").animate({left:  "-=2%"}, 2 , function(){});
			}
		if (jQuery.inArray("38down" , teclasEstado) != -1 && baixo < 450) {	
			 $("#personagem").animate({bottom:  "+=2%"}, 2 , function(){});
		}
		if (jQuery.inArray("39down" , teclasEstado) != -1  && esquerda < 753) {
				 $("#personagem").animate({left:  "+=2%"}, 2 , function(){});
			}
		if (jQuery.inArray("40down" , teclasEstado) != -1  && baixo > 0) {
			 $("#personagem").animate({bottom:  "-=2%"}, 2 , function(){});
		}
	}, 60);
	
	
		
	
	
	
	function moveZumbi(adr){
		 var adress=$( adr );
		setInterval(function(){ 
		   adress.stop();
		   
		   var esquerda = parseInt( $('#personagem').css('left') );
		   var baixo =       parseInt( $('#personagem').css('bottom') );
		   var zumbiEsquerda = parseInt( adress.css('left') );
		   var zumbiBaixo =       parseInt( adress.css('bottom') );
		   
		   //console.log("if "+zumbiBaixo + "<" + baixo);
		   if ( zumbiBaixo < baixo ){
			   //console.log("subinu");
			   adress.animate({bottom:  "+=2%"}, 2 , function(){});
		   } 
		   else if ( zumbiBaixo > baixo ){
			   //console.log("descenu");
			   adress.animate({bottom:  "-=2%"}, 2 , function(){});
		   } 
		   
			if ( zumbiEsquerda < esquerda ){
			   //console.log("arduinu");
			   adress.animate({left:  "+=2%"}, 2 , function(){});
		   }
			else if ( zumbiEsquerda > esquerda ){
			   //console.log("arduvinu");
			   adress.animate({left:  "-=2%"}, 2 , function(){});
		   } 
		   
		}, 200);
	}
	window.setInterval(function(){
		update();
		colide();
		//console.log(pixelX);
	},300);
	
});
