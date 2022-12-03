function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function Barreira(reversa = false) {
    this.elemento = novoElemento('div', 'barreira')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(corpo)
    this.setAltura = altura => corpo.style.width = `${altura}px`
    this.getAltura = () => parseInt(corpo.style.width.split('px')[0])
    this.display = k => this.elemento.style.display= k

}

var degrau=0
var bloqueio=1
var ele=0
function ParDeBarreiras(altura, abertura, popsicaoNaTela) {
    this.elemento = novoElemento('div', 'par-de-barreiras')
    this.superior = new Barreira(true)
    this.meio = new Barreira(true)
    this.inferior = new Barreira(false)
  



    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.meio.elemento)
    this.elemento.appendChild(this.inferior.elemento)
    
     this.sortearAbertura = () => {
        
        const alturaSuperior = Math.random() * (altura - abertura)

        const alturaInferior = altura - abertura - (alturaSuperior)
 
        this.meio.display("none")
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
        
        

        if(ele===8){
            bloqueio=2
            ele=0
            this.superior.setAltura(0)
            this.inferior.setAltura(0)
        }
        

        ele=ele+1
        console.log("abertura"+degrau)
    }
    this.degrau_esquerda= () =>{
    
        if(ele===9){
            bloqueio=3
            ele=0
        }
        ele=ele+1
        this.superior.setAltura(800-degrau)
        this.inferior.setAltura(100+degrau)
        if(degrau>350){
            this.superior.setAltura(0)
            this.inferior.setAltura(0)
        }
        if(degrau<=100){
            this.superior.setAltura(0)
            this.inferior.setAltura(0)
        }
        degrau=degrau+50
    }
    this.degrau_direita= () =>{
        if(ele===9){
            bloqueio=4
            ele=0
           
        }
        ele=ele+1
       
        this.superior.setAltura(100+degrau)
        this.inferior.setAltura(800-degrau)
        if(degrau>350){
            this.superior.setAltura(0)
            this.inferior.setAltura(0)
        }

        
        if(degrau<=100){
            this.superior.setAltura(0)
            this.inferior.setAltura(0)
        }
        degrau=degrau+50
    }
    this.bi= () =>{
        this.meio.display("flex")
        if(ele===9){
            bloqueio=1
            ele=0
            degrau=0
            this.meio.display("none")
        }
        ele=ele+1
        this.superior.setAltura(300-degrau)
        this.meio.setAltura(degrau)
        this.inferior.setAltura(300-degrau)
        if(degrau<=50){
            this.superior.setAltura(0)
            this.inferior.setAltura(0)
            this.meio.setAltura(0)
        }
        degrau=degrau+25
        

    }
    this.getsup = () => this.superior.getAltura()
    this.getinf = () => this.inferior.getAltura()
    this.getX = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setX =  popsicaoNaTela => this.elemento.style.bottom = `${popsicaoNaTela}px`
    this.getLargura = () => this.elemento.clientWidth
    
    this.sortearAbertura()
    this.setX(popsicaoNaTela)
 } 

var descida=600.00
function Barreiras(altura, largura, abertura, espaco, notificarPonto) {

    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco*2),
        new ParDeBarreiras(altura, abertura, largura + espaco*3),
        new ParDeBarreiras(altura, abertura, largura + espaco*4),
        new ParDeBarreiras(altura, abertura, largura + espaco*5),
        new ParDeBarreiras(altura, abertura, largura + espaco*6),
        new ParDeBarreiras(altura, abertura, largura + espaco*7),
        new ParDeBarreiras(altura, abertura, largura + espaco*8),
    ]
    const deslocamento = 3

    five_s.setY(500)
    moeda.setY(500)
    one_s.setY(500)
    this.animar = () => {
        
        soma=0
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)
            
            one_s.setX(moedita)
            five_s.setX(moedita)
            moeda.setX(moedita)
           descida=parseFloat(five_s.getY())-0.9

           five_s.setY(descida)
           one_s.setY(descida)
           moeda.setY(descida)
            if(five_s.getY()<-10){
                console.log("raaa")
                five_s.reset()
                moedita=100+par.getsup()
            }
            if(moeda.getY()<-10){
                console.log("raaa")
                moeda.reset()
                moedita=100+par.getsup()
                vez(five_s,one_s,moeda)

            }
            if(moeda.getY()<-10){
                console.log("raaa")
                one_s.reset()
                moedita=100+par.getsup()
                
            }
            if (par.getX() < -150) {
                soma=soma++
                par.setX(document.querySelector('[wm-flappy]').clientHeight)
                if(bloqueio===1){
                    par.sortearAbertura()
                }
                else if(bloqueio===2){
                    par.degrau_esquerda()
                    console.log(degrau)
                }
                else if(bloqueio===3){
                    par.degrau_direita()
                    console.log(degrau)
                }
                else if(bloqueio===4){
                    par.bi()
                    console.log(degrau)
                }
                if(degrau>350){
                    degrau=0            
                }
                
                
            }
            const meio = largura / 2
            const cruzouMeio = par.getX() + deslocamento >= meio
                && par.getX() < meio
            if (cruzouMeio) {
    
            }
            
        })
    }
}



function Foguete(alturaJogo) {
    let apertou = false

    this.elemento = novoElemento('img', 'foguete')
    this.elemento.src = 'img/Sem título-1.png'

    this.getY = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setY = y => this.elemento.style.left= `${y}px`
    const esquerda=0
    var posi
    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                posi=-10
                break;
            case 39:
                posi=10
                break;
        }  
    }
    window.onkeyup = e => posi=0
   

    this.animar = () => {
        this.setY(this.getY()+posi)
    }
    this.setY(alturaJogo / 2)
}
function moeda1() {
    this.elemento = novoElemento('img', 'moeda')
    this.elemento.src = 'img/moeda.png'
    this.setX = x => this.elemento.style.left = `${x}px`
    this.setY = y => this.elemento.style.bottom= `${y}px`
    this.getY = () => parseFloat(this.elemento.style.bottom.split('px')[0])
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.display = k => this.elemento.style.display= k
    this.reset= () => {
        this.setY(600)
        this.setX(0)
    }
    
}
var C=0

function five_star() {
    this.elemento = novoElemento('img', 'five_s')
    this.elemento.src = 'img/5_1.png'
    this.setX = x => this.elemento.style.left = `${x}px`
    this.setY = y => this.elemento.style.bottom= `${y}px`
    this.getY = () => parseFloat(this.elemento.style.bottom.split('px')[0])
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.display = k => this.elemento.style.display= k
    this.reset= () => {
        this.setY(600)
        this.setX(0)
    }
    
}
function one_star() {
    this.elemento = novoElemento('img', 'one_s')
    this.elemento.src = 'img/1_1.png'
    this.setX = x => this.elemento.style.left = `${x}px`
    this.setY = y => this.elemento.style.bottom= `${y}px`
    this.getY = () => parseFloat(this.elemento.style.bottom.split('px')[0])
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.display = k => this.elemento.style.display= k
    this.reset= () => {
        this.setY(600)
        this.setX(0)
    }
    
}
function combustivel(){
    C=C-0.01
}


function Progresso() {
    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
    }
    this.atualizarPontos(0)
}
function atualiza_combustivel() {
    this.elemento = novoElemento('span', 'combustivel')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = parseInt(C)
    }
    this.atualizarPontos(0)
}


 function estaoSobrepostos(elementoA, elementoB) {

    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()
    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

function colidiu(foguete, barreiras) {
    let colidiu = false

    barreiras.pares.forEach(parDeBarreiras => {
        if (!colidiu) {
            const superior = parDeBarreiras.superior.elemento
            const meio = parDeBarreiras.meio.elemento
            const inferior = parDeBarreiras.inferior.elemento
            colidiu = estaoSobrepostos(foguete.elemento, superior)
                || estaoSobrepostos(foguete.elemento, inferior)
                ||estaoSobrepostos(foguete.elemento, meio)
        }
    })
    return colidiu

}

function vez(){
    let vez=parseInt(Math.random() * (4 - 1) + 1)
        console.log("vez"+vez)
        if(vez===1){
            five_s.display("none")
            one_s.display("none")
            moeda.display("inline")
        }
        else if(vez===2){
            five_s.display("none")
            one_s.display("inline")
            moeda.display("none")
        }
        else if(vez===3){
            five_s.display("inline")
            one_s.display("none")
            moeda.display("none")
        }
}
var moedita=0
var spa=0
var spa1=0
var s_five=0
var s_o=0
var pt=0
function SpaceSolutions() {
    let pontos = 0
    C=100
    const areaDoJogo = document.querySelector('[wm-flappy]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth 
    moeda=new moeda1()
    five_s=new five_star()
    one_s=new one_star()
    const progresso = new Progresso()
    const a_combustivel = new atualiza_combustivel()
    const barreiras = new Barreiras(altura, largura, 200,100,
        () => progresso.atualizarPontos(++pontos),moeda,five_s,one_s)

    const foguete = new Foguete(largura)
    areaDoJogo.appendChild(progresso.elemento)
    areaDoJogo.appendChild(foguete.elemento)
    areaDoJogo.appendChild(moeda.elemento)
    areaDoJogo.appendChild(five_s.elemento)
    areaDoJogo.appendChild(one_s.elemento)
    areaDoJogo.appendChild(a_combustivel.elemento)
    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
    moeda.setX(moedita)
    five_s.display("none")
    one_s.display("none")
    moeda.display("none")
    this.start = () => {

        const temporizador = setInterval(() => {
            combustivel()
            a_combustivel.atualizarPontos(parseInt(C))
            console.log("C"+C)
            if(C<0){
                clearInterval(temporizador)
                new fim()
            }
            
            barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento)) 
            barreiras.animar()
            foguete.animar()

              if(colidiu(foguete,barreiras)){
                 clearInterval(temporizador) 
                 console.log("beteu")
                 new fim()
             } 
             if(estaoSobrepostos(foguete.elemento,moeda.elemento)){
                pontos=pontos+1
                progresso.atualizarPontos(pontos)
                pt=pontos
                moeda.display("none")
                
             }
             if(estaoSobrepostos(foguete.elemento,five_s.elemento)){
                C=C+10
                s_five=s_five+1
                five_s.display("none")
                
             }
             if(estaoSobrepostos(foguete.elemento,one_s.elemento)){
                s_o=s_o+1
                C=C-10
                one_s.display("none")
             }

           

        }, 20)
    }
}
function inicio(){
    const areaDoJogo = document.querySelector('[wm-flappy]')
    elemento = novoElemento('div', 'principal')
    areaDoJogo.appendChild(elemento)
    titulo=novoElemento('div', 'titulo')
    elemento.appendChild(titulo)
    texto=novoElemento('p', 'texto')
    titulo.innerHTML="Bem-vindo <br>"
    elemento.appendChild(texto)
    texto.innerHTML="Depois do ano 2050 EM conseguiu estabelecer um comércio interpalnetário, trabalhamos com manutenção de computadores nesse novo sistema."
    imagens=novoElemento('div', 'imagens')
    elemento.appendChild(imagens)
    div1=novoElemento('div', 'div1')
    imagens.appendChild(div1)
    moeda_ = novoElemento('img', 'moeda_')
    moeda_.src = 'img/moeda.png'
    moeda_.style.position= "realtive"
    texto1=novoElemento('p', 'texto1')
    div_moeda=novoElemento('div', 'div_moeda')
    div1.appendChild(moeda_)
    div1.appendChild(texto1)
    texto1.innerHTML="A moeda te dá pontos que cujo marcador está localizado no topo a direita"
    texto2=novoElemento('p', 'texto2')
    div2=novoElemento('div', 'div2')
    five_s = novoElemento('img', 'five_s_')
    five_s.src = 'img/5_1.png'
    imagens.appendChild(div2)
    div2.appendChild(five_s)
    div2.appendChild(texto2)
    texto2.innerHTML="Boas clasificações são nosso combustível e dão +10 te dá pontos de combsutivel que cujo marcador está localizado no topo a esquerda"
    div3=novoElemento('div', 'div3')
    texto3=novoElemento('p', 'texto3')
    imagens.appendChild(div3)
    one_s = novoElemento('img', 'one_s_')
    one_s.src = 'img/1_1.png'
    div3.appendChild(one_s)
    div3.appendChild(texto3)
    texto3.innerHTML="Más clasificações são indesejadas e tiram -10 te dá pontos  de combsutivel que cujo marcador está localizado no topo a esquerda"
    let apertou = false
    iniciar=novoElemento('p', 'iniciar')
    iniciar.innerHTML="Pressione qualquer tecla para inciar"
    elemento.appendChild(iniciar)
 
    this.start = () => {
        const temporizador = setInterval(() => {
            window.onkeydown = e => apertou = true
            if(apertou){
                elemento.style.display="none"
                clearInterval(temporizador)
                new SpaceSolutions().start() 
            }

        }, 20)
        
        
        
    }
    this.start()
}
new inicio()
//new fim()
function fim(){
    const areaDoJogo = document.querySelector('[wm-flappy]')
    elemento_f = novoElemento('div', 'principal_f')
    areaDoJogo.appendChild(elemento_f)
    titulo_f=novoElemento('div', 'titulo')
    elemento_f.appendChild(titulo_f)
    texto_f=novoElemento('p', 'texto')
    titulo_f.innerHTML="GAME OVER <br>"
    div1_f=novoElemento('div', 'div4')
    div2_f= novoElemento('div', 'div4')
    div3_f= novoElemento('div', 'div4')
    icones=novoElemento('div', 'icones')
    texto_f.innerHTML="Você conseguiu: <br>"
    elemento_f.appendChild(texto_f)
    elemento_f.appendChild(icones)
    icones.appendChild(div1_f)
    icones.appendChild(div2_f)
    icones.appendChild(div3_f)
    c_moedas=novoElemento('p', 'txt')
    c_moedas.innerHTML=pt
    _moeda = novoElemento('img', 'moeda_')
    _moeda.src = 'img/moeda.png'
    div1_f.appendChild(_moeda)
    div1_f.appendChild(c_moedas)
    f=novoElemento('p', 'txt')
    f.innerHTML=s_five
    _five_s = novoElemento('img', 'five_s_')
    _five_s.src = 'img/5_1.png'
    div2_f.appendChild(_five_s)
    div2_f.appendChild(f)
    o=novoElemento('p', 'txt')
    o.innerHTML=s_o
    _one_s = novoElemento('img', 'one_s_')
    _one_s.src = 'img/1_1.png'
    div3_f.appendChild(_one_s)
    div3_f.appendChild(o)
 
}