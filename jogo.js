$(function () {
	var player='<div id="personagem"></div>';
	var numeroDeZumbi = 0;
	var divZumbi='<div id="zumbi0" class="zumbi"></div>';
	$('#map').append(player);
	$('#map').append(divZumbi);
	moveZumbi('#zumbi0');
	
	setInterval(function(){
		numeroDeZumbi++;
		divZumbi='<div id="zumbi' + numeroDeZumbi + '" class="zumbi"></div>';
		$('#map').append(divZumbi);
		var nome = "'#zumbi" + numeroDeZumbi + "'";
		moveZumbi(nome);
	},6000);
	

	console.log("estoy aqui");
	var pressedKeys = [];
	var teclasEstado = [];
	$(document.body).keydown(function (evt) {										//detecta quando abaixado
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
			
					console.log(teclasEstado);
					
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
				
				console.log(teclasEstado);
				
				
				//console.log(evt.keyCode + "up");
			});

	
	setInterval(function(){
		var esquerda = $('#personagem').css('left');
		esquerda = esquerda.replace('px','');
		var baixo = $('#personagem').css('bottom');
		baixo = baixo.replace('px','');
		console.log(jQuery.inArray("37down" , teclasEstado));
		 if (jQuery.inArray("37down" , teclasEstado) != -1 && esquerda > 0) {
				$("#personagem").animate({left:  "-=2%"}, 2 , function(){});
			}
		if (jQuery.inArray("38down" , teclasEstado) != -1 && baixo < 450) {	
			 $("#personagem").animate({bottom:  "+=2%"}, 2 , function(){});
			 console.log("hello word");
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
	
	

});
