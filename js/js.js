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
        
        console.log(colisao1); //Exibindo as informações da colisão
    
    } //Fim da função colisao()

}