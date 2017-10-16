$(function () {
	var player='<div id="personagem"></div>';
	var divZumbi='<div id="zumbi1" class="zumbi"></div>';
	$('#map').append(player);
	$('#map').append(divZumbi);

	

function moveJogador() {
    $('html').keydown(function(e){
       var direction = e.which;
	   $("#personagem").stop();
	   var esquerda = $('#personagem').css('left');
		esquerda = esquerda.replace('px','');
	   var baixo = $('#personagem').css('bottom');
	   baixo = baixo.replace('px','');
	   if (direction == 37 && esquerda > 0) {
            $("#personagem").animate({left:  "-=2%"}, 2 , function(){});
        }
        if (direction == 38 && baixo < 450) {	
             $("#personagem").animate({bottom:  "+=2%"}, 2 , function(){});
        }
        if (direction == 39 && esquerda < 760) {
             $("#personagem").animate({left:  "+=2%"}, 2 , function(){});
        }
        if (direction == 40 && baixo > 0) {
             $("#personagem").animate({bottom:  "-=2%"}, 2 , function(){});
        }
		direction = 0;
    }); 
}
	
	
	
	
	
	
function moveZumbi(adress) {
	console.log(adress);
	   adress.stop();
	   var esquerda = $('#personagem').css('left');
		esquerda = esquerda.replace('px','');
	   var baixo = $('#personagem').css('bottom');
	   baixo = baixo.replace('px','');
	   var zumbiEsquerda = adress.css('left');
	   zumbiEsquerda = zumbiEsquerda.replace( 'px' , '' );
	   var zumbiBaixo = adress.css('bottom');
	   zumbiBaixo = zumbiBaixo.replace( 'px' , '' );
	   console.log(zumbiBaixo);
	   console.log(baixo);
	   $("#p").append("text<br/>");
	   if(zumbiBaixo < baixo){
		   adress.animate({bottom:  "+=2%"}, 2 , function(){});
	   }
}	
	
	
	
	
	setInterval(function(){ 
	   var adress=$('#zumbi1');
	   adress.stop();
	   var esquerda = $('#personagem').css('left');
		esquerda = esquerda.replace('px','');
	   var baixo = $('#personagem').css('bottom');
	   baixo = baixo.replace('px','');
	   var zumbiEsquerda = adress.css('left');
	   zumbiEsquerda = zumbiEsquerda.replace( 'px' , '' );
	   var zumbiBaixo = adress.css('bottom');
	   zumbiBaixo = zumbiBaixo.replace( 'px' , '' );
	    console.log(zumbiBaixo);
	    //console.log(baixo);
	   // $("#p").append("text<br/>");
	   console.log("if "+zumbiBaixo + "<" + baixo);
	   if(zumbiBaixo < baixo){
		   console.log("subinu");
		   adress.animate({bottom:  "+=2%"}, 0 , function(){});
	   } }, 200);

	
	setInterval(moveJogador(), 100);
	/* setInterval(
		function(){
		console.log("ola");
		}, 100);*/
	

});
