var Pwidth = 30,
	Pheight = 50,
	Pspeed = 5,
	Zwidth = 30,
	Zheight = 50,
	Zspeed = 2,
	player='<div id="personagem"></div>',
	numeroDeZumbi = 0,
	divZumbi='<div id="zumbi0" class="zumbi"></div>';
	
	
$(function(){
	function init(){
		$('#personagem').css('width', Pwidth);
		$('#personagem').css('heigth', Pheight );
		$('.zumbi').css('width', Zwidth);
		$('.zumbi').css('heigth', Zheight);
		$('#map').append(player);
		$('#map').append(divZumbi);
		moveZumbi('#zumbi0');
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
				console.log('entrou em X');
		}
		else if(letra == 'y' && 
			$(objA).position().top + widthA  > $(objB).position().top &&
			$(objA).position().top - widthB  < $(objB).position().top 
		){
			console.log('entrou em Y');
			return true;
		}
		else{	
			return false;
		}
	}	
	
	function addZumbi(){
		numeroDeZumbi++;
		divZumbi='<div id="zumbi' + numeroDeZumbi + '" class="zumbi"></div>';
		$('#map').append(divZumbi);
		var nome = "#zumbi" + numeroDeZumbi;
		moveZumbi(nome);
	}

	function moveZumbi(adr){
		var adress=$( adr ); 
		console.log(adr);
		var esquerda = $('#personagem').position().left ;
		var baixo =   $('#personagem').position().top ;
		var zumbiEsquerda = adress.position().left;
		var zumbiBaixo =  adress.position().top;   
		 if ( zumbiBaixo < baixo && adress.position().top  > 0){
			//console.log("subinu");
			$(adr).css('top', (parseFloat($(adr).css('top')) + Zspeed) + 'px');
			} 
		 else if ( zumbiBaixo > baixo && adress.position().top  > 448 ){
			$(adr).css('top', (parseFloat($(adr).css('top')) - Zspeed) + 'px');
			}  
		if ( zumbiEsquerda < esquerda && adress.position().left  > 0 ){
		   //console.log("arduinu");
			$(adr).css('left', (parseFloat($(adr).css('left')) + Zspeed) + 'px');	
		}
		else if ( zumbiEsquerda > esquerda && adress.position().left  < 767 ){
			$(adr).css('left', (parseFloat($(adr).css('left')) - Zspeed) + 'px');
			//adress.animate({left:  anima}, 2 , function(){});
		} 		   
	}

	function update(){
		window.setInterval(function(){
			//console.log(teclasEstado);
			var contador = 0;
			console.log(numeroDeZumbi+1);
			while(contador <= numeroDeZumbi ){
				moveZumbi('#zumbi'+contador);
				var nome = '#zumbi'+numeroDeZumbi;
				console.log('nome: '+ nome);
				if(colide('#personagem' , Pwidth , nome , Zwidth , 'x' ) &&  colide('#personagem' , Pheight , nome , Zheight , 'y' )){
					//alert('PERDEU!');
					window.location.reload(true);
				}
				else{
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
				contador++;
			}			//while
		},30);
	}



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

	init();	
	update();
	window.setInterval(function(){
		addZumbi();
	},6000);
	
})