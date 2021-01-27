
let Contador_Tempo = 0; // CRONOMETRO DO JOGO

function Jogar(){
    
    // recuperar a url a partir do sinal de interrogação

    let recuperanivel = window.location.search
    let nivelrecuperado = recuperanivel.replace("?", "")

    // Tempo dos Niveis

    let tempojogo = 0

    if(nivelrecuperado == 1){
        tempojogo = 120
    }
    if(nivelrecuperado == 2){
        tempojogo = 60
    }
    if(nivelrecuperado == 3){
        tempojogo = 30
    }

    let inserircronometro = document.getElementById('cronometro')
    inserircronometro.innerHTML = tempojogo
    inserircronometro.style.color = 'red'


    // Chama a função de criar baloes
     
    let qnts_baloes = 80;
    CriarBaloes(qnts_baloes)

   
    // Quantidade de baloes nao estourados

    let total = document.getElementById('qnt-baloes-inteiros')
    total.innerHTML = qnts_baloes

    // Quantidade de baloes estourados

    let total_estourados = document.getElementById('qnt-baloes-estourados')
    total_estourados.innerHTML = '0'

    // Iniciar a funcao de contagem de tempo

    ContagemTempo(tempojogo + 1)
}

function CriarBaloes(qnts_baloes){
     
    for (let i = 1; i <= qnts_baloes; i++) {
        
        let balao = document.createElement("img")
        balao.src = 'imagens/balao_azul_pequeno.png'

        let criar = document.getElementById('criabalao')
        criar.appendChild(balao)
        balao.style.margin = '10px'

        // Evento para estourar os baloes

        balao.onclick = function(){Estourando_Balao(this)} 

        // Para cada balao vamos assosiar ele a uma id usanso a variavel (i) e dar o nome de b
        // vai ficar b1 , b2 , b3 

        balao.id = 'b'+i
    }
}

function ContagemTempo(temposegundos){

    temposegundos = temposegundos - 1
    
    if(temposegundos == -1){      
        clearTimeout(Contador_Tempo) // para a exexução da funcao settimeout
        GameOver()
        return false;
       
    }

    document.getElementById('cronometro').innerHTML = temposegundos
   
    Contador_Tempo =  setTimeout("ContagemTempo("+temposegundos+")", 1000) // contagem de tempo do cronometro, settimeout recebe dois parametros
                                                                          // funcao a ser chamada a cada segundo, os milisegundos
}

function Estourando_Balao(id_balao){
    // clicou no balao aparece o id 
    let id = id_balao.id
    
    // recupera o id do balao para inserir a imagem do balao estourado
    let balao_estourado = document.getElementById(id)
    balao_estourado.src = 'imagens/balao_azul_pequeno_estourado.png'

    // retirar o evento depois do balao estourar
    document.getElementById(id).setAttribute("onclick","")

    // pegando a pontuação dos balor inteiros e estourados
    Pontuacao(1)
    
}

function Pontuacao(valor){

    let baloes_inteiros = document.getElementById('qnt-baloes-inteiros').innerHTML
    let baloes_estourados = document.getElementById('qnt-baloes-estourados').innerHTML
    
    baloes_inteiros = parseInt(baloes_inteiros)
    baloes_estourados = parseInt(baloes_estourados)

    baloes_inteiros = baloes_inteiros - valor
    baloes_estourados = baloes_estourados + valor

    // inserir a pontuação na imagem do jogo

    document.getElementById('qnt-baloes-inteiros').innerHTML = baloes_inteiros
    document.getElementById('qnt-baloes-estourados').innerHTML = baloes_estourados

    Situacao_Jogo(baloes_inteiros)
}

function Situacao_Jogo(baloes_inteiros){
     if(baloes_inteiros == 0 ){
         alert(' PARABÉNS!!! VOCÊ GANHOU ')
         clearTimeout(Contador_Tempo);
         window.location.href = 'index.html'
     }
     
}

function GameOver(){   
    alert(' GAME OVER!!! VOCÊ PERDEU ')
    clearTimeout(Contador_Tempo);
    window.location.href = 'index.html' 
}

