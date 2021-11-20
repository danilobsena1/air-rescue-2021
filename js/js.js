// CRIANDO A 1º FUNÇÃO DO JOGO
function start() { // Inicio da função start()

    $("#inicio").hide(); //chamando e ocultando com o comando hide a div inicio
	
    // criando novas divs dentro da div id="fundoGame" 
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

    //PRINCIPAIS VARIAVEIS DO JOGO ----------------------------------
	
	var jogo = {}
    
	var TECLA = {
        W: 87,
        S: 83,
        ESPACO: 32
    }

    var podeAtirar=true;

    var fimdejogo = false; //Variavel responsavel por verificar se o jogo finalizou ou não.

    // movimentação do inimigo
    var velocidade=5; // velocidade
    // var posicaoY = parseInt(Math.random() * 334);  O helicoptero inimigo se movimentará no eixo y em varias posições
    var posicaoY = parseInt(Math.random() * 380);

    jogo.pressionou = []; 
    
    // ------------------------------------------------------------------------

    // Verifica se o usuário pressionou ou não uma tecla
	$(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
        });
    
    $(document).keyup(function(e){
           jogo.pressionou[e.which] = false;
        });



	// Game Loop
	jogo.timer = setInterval(loop,30); // chamando a função loop a cada 30 milisegundos.
	
	function loop() {
	    movefundo();
        movejogador();
        moveamigo();
        moveinimigo1();
        moveinimigo2();
        colisao();

	}

    // Função que movimenta o fundo do jogo
	function movefundo() {
	
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-2);
        
    } // fim da função movefundo()

    // Função que movimenta o jogador
    function movejogador() {
	
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo-10);

            // EVITANDO QUE O HELICOPTERO SUBA ALÉM DO LIMITE MAXIMO DA TELA
            if (topo<=0) {
		
                $("#jogador").css("top",topo+10);
            }
            
        }
        
        if (jogo.pressionou[TECLA.S]) {
            
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo+10);
            
            // EVITANDO QUE O HELICOPTERO DESÇA ALÉM DO LIMITE MAXIMO DA TELA
            if (topo>=434) {	
                $("#jogador").css("top",topo-10);
                    
            }
        }
        
        if (jogo.pressionou[TECLA.ESPACO]) {
            
            //Chama função Disparo
            disparo();	
        }
    
    } // fim da função movejogador()

    // Função que movimenta o amigo:
    function moveamigo() {
	
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX+1);
                    
            if (posicaoX>906) {
                
            $("#amigo").css("left",0);
                        
            }
    
    } // fim da função moveamigo()

    // Função que movimenta o inimigo1:
    function moveinimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY);
            
            if (posicaoX<=0) {
            posicaoY = parseInt(Math.random() * 334); // recrie a posiçãoY e posicione no valor randomico
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);  
            }
    } //Fim da função moveinimigo1()

    // Função que movimenta o inimigo2:
    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
	    $("#inimigo2").css("left",posicaoX-3.2); // inimigo se movimenta 3 unidades para a esquerda 
				
		if (posicaoX<=0) {	
		    $("#inimigo2").css("left",775); // Reposiciona o inimigo2 do lado direito da div
		    }
    } // Fim da função moveinimigo2()

    function disparo() {
	
        if (podeAtirar==true) { 
            
        podeAtirar=false; // Impede que  o usuário atire varias vezes seguidas, enquando o código abaixo está sendo executado.
        
        topo = parseInt($("#jogador").css("top")) //posição em cima da helice do helicoptero
        posicaoX= parseInt($("#jogador").css("left")) // posição lado esquerdo
        tiroX = posicaoX + 190; 
        topoTiro=topo+49; //37
        $("#fundoGame").append("<div id='disparo'></div"); //Criando a div disparo
        $("#disparo").css("top",topoTiro);
        $("#disparo").css("left",tiroX);
        
        var tempoDisparo=window.setInterval(executaDisparo, 30); // variavel com valor de tempo de disparo
        
        } //Fecha podeAtirar
    
        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX+15); // fazendo a função caminhar 15 unidades.
     
                if (posicaoX>900) {  //Quando o disparo chegar na posição maior que 900
                            
                    window.clearInterval(tempoDisparo); // Removendo a variavel de tempo
                    tempoDisparo=null; // Zerando
                    $("#disparo").remove(); //Removendo o disparo da tela
                    podeAtirar=true; // Após o disparo ter sido removido da tela o usuário pode realizar um novo disparo.
                        
                }
            } // Fecha executaDisparo()
    } // Fecha disparo()

    function colisao() { // Função responsavel por todas as colisões do jogo.

        // Variavel colisao1 vai conter a colisão entre jogador com o inimigo1
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        // var colisao4 = ($("#disparo").collision($("#inimigo2"))); helicoptero não dispara no caminhão.
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        
        // jogador com o inimigo1
        if (colisao1.length>0) { // Se a variavel colisao1 for maior que 0 houve colisão.
		
            //capturando as posições do inimigo
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X,inimigo1Y); //chamando a função que receberá os valores para criar a explosão.
        
            //Reposicionando o inimigo1 após uma colisão
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
        }

        // jogador com o inimigo2 
        if (colisao2.length>0) { // verificando se houve colisão entre o jogador e o inimigo2
        
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X,inimigo2Y);
                    
            $("#inimigo2").remove(); // removendo inimigo2 após colisão.
                
            reposicionaInimigo2(); // Função que irá exibir novamente o inimigo2.
                
            }
            
        // Disparo com o inimigo1
        if (colisao3.length>0) {
              
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
                
            explosao1(inimigo1X,inimigo1Y);
            $("#disparo").css("left",950);
                
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);        
        }

        // jogador com o amigo
        if (colisao5.length>0) {    
            reposicionaAmigo();
            $("#amigo").remove();
        }
        
        //Inimigo2 com o amigo
        if (colisao6.length>0) {
                
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX,amigoY);
            $("#amigo").remove();
                    
            reposicionaAmigo();            
        }


    } //Fim da função colisao()

    //Explosão 1
    function explosao1(inimigo1X,inimigo1Y) {
        $("#fundoGame").append("<div id='explosao1'></div"); //criando nova div explosao1 dentro da div id="fundoGame"
        $("#explosao1").css("background-image", "url(../recursos/imagens/explosao.png)");
        var div=$("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:200, opacity:0}, "slow");
        
        //Removendo a explosão da tela após 1 segundo
        var tempoExplosao=window.setInterval(removeExplosao, 1000);
        
            function removeExplosao() {
                
                div.remove();
                window.clearInterval(tempoExplosao);
                tempoExplosao=null;
                
            }
	} // Fim da função explosao1()

    //Explosão2
	function explosao2(inimigo2X,inimigo2Y) {
        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(../recursos/imagens/explosao.png)");
        var div2=$("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
        
            function removeExplosao2() {
                
                div2.remove();
                window.clearInterval(tempoExplosao2);
                tempoExplosao2=null;
                
            }  
    } // Fim da função explosao2()

    //Explosão3
    function explosao3(amigoX,amigoY) {
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);
        var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
        
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3=null;    
        }
    
    } // Fim da função explosao3

    //Função que reposiciona Inimigo2
	function reposicionaInimigo2() {
	
        var tempoColisao4=window.setInterval(reposiciona4, 3000); // 3000 == 3segundos
            
        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;       
                if (fimdejogo==false) { // O inimigo só vai aparecer novamente só o findojogo for igual a false
                    $("#fundoGame").append("<div id=inimigo2></div");
                }
            }	
    }	
    
    //Função que reposiciona Amigo
	function reposicionaAmigo() {
        var tempoAmigo=window.setInterval(reposiciona6, 5000);
        
            function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo=null;
            
            if (fimdejogo==false) {
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            }
        }
    } // Fim da função reposicionaAmigo()
    


}