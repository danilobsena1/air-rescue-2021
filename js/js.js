// CRIANDO A 1º FUNÇÃO DO JOGO
function start() { // Inicio da função start()

    $("#inicio").hide(); //chamando e ocultando com o comando hide a div inicio
	
    // criando novas divs dentro da div id="fundoGame" 
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    //PRINCIPAIS VARIAVEIS DO JOGO ----------------------------------
	
	var jogo = {}
    
	var TECLA = {
        W: 87,
        S: 83,
        ESPACO: 32
    }

    //PONTUAÇÕES DO JOGO
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;

    var podeAtirar = true;

    var fimdejogo = false; //Variavel responsavel por verificar se o jogo finalizou ou não.

    // movimentação do inimigo
    var velocidade = 5; // velocidade
    // var posicaoY = parseInt(Math.random() * 334);  O helicoptero inimigo se movimentará no eixo y em varias posições
    var posicaoY = parseInt(Math.random() * 380);

    jogo.pressionou = [];
    
    var energiaAtual = 3;

    // VARIAVEIS QUE IDENTIFICAM O SOM DO GAME
    var somDisparo=document.getElementById("somDisparo");
    var somExplosao=document.getElementById("somExplosao");
    var musica=document.getElementById("musica");
    var somGameover=document.getElementById("somGameover");
    var somPerdido=document.getElementById("somPerdido");
    var somResgate=document.getElementById("somResgate");

    
    //Música em loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    
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
        placar();
        energia();

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
	
        somDisparo.play(); // TOCANDO O SOM DE DISPARO

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
        // var colisao4 = ($("#disparo").collision($("#inimigo2"))); DISPARO NÃO ACERTA CAMINHÃO
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        
        // jogador com o inimigo1
        if (colisao1.length>0) { // Se a variavel colisao1 for maior que 0 houve colisão.
            
            energiaAtual--; // perda de energia

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

            velocidade=velocidade+0.5; // AUMENTANDO A VELOCIDADE DO INIMIGO CASO ELE SEJA ATINGINDO
            energiaAtual--; // perda de energia

            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X,inimigo2Y);
                    
            $("#inimigo2").remove(); // removendo inimigo2 após colisão.
                
            reposicionaInimigo2(); // Função que irá exibir novamente o inimigo2.
                
            }
            
        // Disparo com o inimigo1
        if (colisao3.length>0) {

            velocidade=velocidade+0.5; // AUMENTANDO A VELOCIDADE DO INIMIGO CASO ELE SEJA ABATIDO
            pontos=pontos+100; // 100 PONTOS AO ACERTAR O INIMIGO1
              
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
            salvos++; // QUANTIDADE DE AMIGOS SALVOS
            somResgate.play();

            reposicionaAmigo();
            $("#amigo").remove();
        }
        
        //Inimigo2 com o amigo
        if (colisao6.length>0) {
            perdidos++; // ENCONTRO DO INIMIGO2 COM O AMIGO
            
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX,amigoY);
            $("#amigo").remove();
                    
            reposicionaAmigo();            
        }


    } //Fim da função colisao()

    //Explosão 1
    function explosao1(inimigo1X,inimigo1Y) {
        
        somExplosao.play();

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

        somExplosao.play();

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
        
        somPerdido.play();

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

    function placar() {
	
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
        
    } //fim da função placar()
    
    //Barra de energia

    function energia() {
        
        if (energiaAtual==3) {
            
            $("#energia").css("background-image", "url(../recursos/imagens/energia3.png)");
        }

        if (energiaAtual==2) {
            
            $("#energia").css("background-image", "url(../recursos/imagens/energia2.png)");
        }

        if (energiaAtual==1) {
            
            $("#energia").css("background-image", "url(../recursos/imagens/energia1.png)");
        }

        if (energiaAtual==0) {
            
            $("#energia").css("background-image", "url(../recursos/imagens/energia0.png)");
            
            //Game Over
            gameOver();
        }

    } // Fim da função energia()

    //Função GAME OVER
	function gameOver() {
        fimdejogo=true;
        musica.pause();
        somGameover.play();
        
        window.clearInterval(jogo.timer);
        jogo.timer=null;
        
        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();
        
        $("#fundoGame").append("<div id='fim'></div>");
        
        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
        } // Fim da função gameOver();

} // Fim da função start

//Reinicia o Jogo
		
function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
	
} //Fim da função reiniciaJogo
