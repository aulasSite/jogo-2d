var Pwidth = 30,
	Pheight = 50,
	Pspeed = 5,
	Zwidth = 30,
	Zheight = 50,
	Zspeed = 2,
	player='<div id="personagem"></div>',
	numeroDeZumbi = 0,
	listaZumbi = ['#zumbi0'];
	divZumbi='<div id="zumbi0" class="zumbi"></div>',
	max = 30000,
	lastState = '';
	gameState = 'inicial';															//possiveis: jogando, fuga, inicial, perdeu
	
	
$(function(){
	function init(){
		$('#personagem').css('width', Pwidth);
		$('#personagem').css('heigth', Pheight );
		$('.zumbi').css('width', Zwidth);
		$('.zumbi').css('heigth', Zheight);
		$('#map').append(player);
		$('#map').append(divZumbi);
		moveZumbi('#zumbi0');
		gameState = 'jogando';							
	}
	
	function botao(){
		$('#botao').click(function(){
			if(gameState == 'inicial' ){
				gameState = lastState;
			}
			else{
				lastState = gameState;
				gameState = 'inicial';
			}
			console.log(gameState);
		});
	}
	
	function colide(objA, widthA, objB, widthB, letra){
		//console.log('letra:' + letra);
		//console.log($(objA).position().left);
		//console.log($(objA).position().left - + widthB +'<'+ $(objB).position().left );
		if(letra == 'x' && 
			$(objA).position().left + widthA  > $(objB).position().left &&
			$(objA).position().left < $(objB).position().left + widthB  
			){
				return true;
		}
		else if(letra == 'y' && 
			$(objA).position().top + widthA  > $(objB).position().top &&
			$(objA).position().top - widthB  < $(objB).position().top 
		){
			return true;
		}
		else{	
			return false;
		}
	}	
	
	function colideZumbi(adr){
		$.each(listaZumbi , function(index, value){
			zumbi = $( adr );
			nome = $( value );
			
			if(adr != value && zumbi.position().left + Zwidth > nome.position().left && zumbi.position().left <= nome.position().left + Zwidth/2 &&
				zumbi.position().top + Zheight  >nome.position().top &&
				zumbi.position().top - Zheight  < nome.position().top 
			){
				if(zumbi.position().left < 50){
					nome.css('left', (parseFloat(nome.css('left')) + Zwidth/1.9) + 'px');
				}
				else{
					zumbi.css('left', (parseFloat(zumbi.css('left')) - Zwidth/1.9) + 'px');
					//console.log('colidiu');
				}
			}
			if(adr != value && zumbi.position().top + Zheight > nome.position().top && zumbi.position().top <= nome.position().top + Zheight/2 &&
				zumbi.position().left + Zwidth  >nome.position().left &&
				zumbi.position().left - Zwidth  < nome.position().left
			){
				if(zumbi.position().top < 50){
					nome.css('top', (parseFloat(nome.css('top')) + Zheight/1.9) + 'px');
				}
				else{
					zumbi.css('top', (parseFloat(zumbi.css('top')) - Zheight/1.9) + 'px');
				}
			}

		});
	}
	
	function addZumbi(){
			if(gameState == "jogando" || gameState == "fuga"){
			numeroDeZumbi++;
			divZumbi='<div id="zumbi' + numeroDeZumbi + '" class="zumbi"></div>';
			$('#map').append(divZumbi);
			var nome = "#zumbi" + numeroDeZumbi;
			listaZumbi.push(nome);
			moveZumbi(nome);
			//console.log(listaZumbi);
		}
	}

	function moveZumbi(adr){
		window.setInterval(function(){
			if($(adr).length > 0){
				//console.log($(adr).length );
				var adress=$( adr ); 
				var esquerda = $('#personagem').position().left ;
				var baixo =   $('#personagem').position().top ;
				var zumbiEsquerda = adress.position().left;
				var zumbiBaixo =  adress.position().top;   
				//console.log(adress.position().top + "< 448");
				//console.log(zumbiBaixo +'<'+ baixo);
				if(gameState == "jogando"){
					if ( zumbiBaixo > baixo && adress.position().top  > 0 ){
						//console.log("subinu");
						$(adr).css('top', (parseFloat($(adr).css('top')) - Zspeed) + 'px');
					} 
					 else if ( zumbiBaixo < baixo && adress.position().top  < 550 ){
						$(adr).css('top', (parseFloat($(adr).css('top')) + Zspeed) + 'px');
					}  
					if ( zumbiEsquerda < esquerda && adress.position().left  <768){
					   //console.log("arduinu");
						$(adr).css('left', (parseFloat($(adr).css('left')) + Zspeed) + 'px');	
					}
					else if ( zumbiEsquerda > esquerda && adress.position().left  > 0 ){
						$(adr).css('left', (parseFloat($(adr).css('left')) - Zspeed) + 'px');
						//adress.animate({left:  anima}, 2 , function(){});
					}
				}
				else if(gameState == "fuga"){
					if ( zumbiBaixo > baixo && adress.position().top  < 445 ){
						//console.log("subinu");
						$(adr).css('top', (parseFloat($(adr).css('top')) - Zspeed) + 'px');
					} 
					 else if ( zumbiBaixo < baixo && adress.position().top > 0 ){
						$(adr).css('top', (parseFloat($(adr).css('top')) + Zspeed) + 'px');
					}  
					if ( zumbiEsquerda < esquerda && adress.position().left  > 3){
					   //console.log("arduinu");
						$(adr).css('left', (parseFloat($(adr).css('left')) + Zspeed) + 'px');	
					}
					else if ( zumbiEsquerda > esquerda && adress.position().left  < 768 ){
						$(adr).css('left', (parseFloat($(adr).css('left')) - Zspeed) + 'px');
						//adress.animate({left:  anima}, 2 , function(){});
					}
				}
				 
				colideZumbi(adr);
			}	
		},30);
	}

	function update(){
		window.setInterval(function(){
			$.each(listaZumbi , function(index, nome){
				if($(nome).length > 0){
					if(colide('#personagem' , Pwidth , nome , Zwidth , 'x' ) &&  colide('#personagem' , Pheight , nome , Zheight , 'y' )){
						if(gameState == 'jogando'){
							console.log('PERDEU');
							//window.location.reload(true);
							gameState = 'perdeu';
						}
						if(gameState == 'fuga'){
							$( nome ).remove();
							var removeItem = 2;
							listaZumbi = jQuery.grep(listaZumbi, function(value) {
								return value != nome;
							});
						}
					}
				}
			});
			
			if(gameState == 'jogando' &&$('.star').length > 0 && colide('#personagem' , Pwidth , '.star' , 30 , 'x' ) && colide('#personagem' , Pheight , '.star' , 30 , 'y' )){
				alert('colidiu');
			}
			if(gameState == 'jogando' || gameState == 'fuga'){
				//console.log('estou no else');
				if(jQuery.inArray("37down" , teclasEstado) != -1 && $('#personagem').position().left  > 0){
					$('#personagem').css('left', (parseFloat($('#personagem').css('left')) - Pspeed) + 'px');	
				}
				if(jQuery.inArray("39down" , teclasEstado) != -1 && $('#personagem').position().left  < 769){
					$('#personagem').css('left', (parseFloat($('#personagem').css('left')) + Pspeed) + 'px');	
				}
				if(jQuery.inArray("38down" , teclasEstado) != -1 && $('#personagem').position().top  > 2){
					$('#personagem').css('top', (parseFloat($('#personagem').css('top')) - Pspeed) + 'px');	
				}
				if(jQuery.inArray("40down" , teclasEstado) != -1 && $('#personagem').position().top  < 448){
					$('#personagem').css('top', (parseFloat($('#personagem').css('top')) + Pspeed) + 'px');	
				}
			}		
		},30);
	}

	function novoNum() {
		return Math.floor(Math.random() * max) + 1;
	}

	setTimeout(function foo(){
		max += 1000;
		console.log(max);
		$('#map').append("<div class='star'></div>");
		setTimeout(foo, novoNum());
	}, novoNum());

	var pressedKeys = [],
	teclasEstado = [];
	$(document.body).keydown(function (evt) {										//detecta quando abaixado
		var li = pressedKeys[evt.keyCode];
		if (!li) {
			pressedKeys[evt.keyCode] = li;
		}
		if(jQuery.inArray( (evt.keyCode + "down"), teclasEstado) == -1){
			var index = teclasEstado.indexOf(evt.keyCode + "up");
			if (index !== -1) {
				teclasEstado[index] = evt.keyCode + "down" ;
			}
			else{
				teclasEstado.push(evt.keyCode + "down");
			}
		}			
	});
	$(document.body).keyup(function (evt) {								//detecta quando levanta
		var li = pressedKeys[evt.keyCode];
		if (!li) {	}
		var index = teclasEstado.indexOf(evt.keyCode + "down");
		if (index !== -1) {
			teclasEstado[index] = evt.keyCode + "up" ;
		}
		else{
			teclasEstado.push(evt.keyCode + "up");
		}				
	});
	botao();
	init();	
	update();
	window.setInterval(function(){
		addZumbi();
	},6000);
	
})