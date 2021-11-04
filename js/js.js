// CRIANDO A 1º FUNÇÃO DO JOGO
function start() { // Inicio da função start()

    $("#inicio").hide(); //chamando e ocultando com o comando hide a div inicio
	
    // criando novas divs dentro da div id="fundoGame" 
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

    //Principais variáveis do jogo
	
	var jogo = {}
    
	var TECLA = {
        W: 87,
        S: 83,
        ESPACO: 32
    }

    // movimentação do inimigo
    var velocidade=5; // velocidade
    // var posicaoY = parseInt(Math.random() * 334);  O helicoptero inimigo se movimentará no eixo y em varias posições
    var posicaoY = parseInt(Math.random() * 380);

    jogo.pressionou = []; 
    
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
        moveinimigo1();

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


        }
    
    } // fim da função movejogador()

    // Função que movimenta o jogador
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
}

