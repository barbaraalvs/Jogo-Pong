//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 20;
let raio = dBolinha / 2;

//Velocidade da bolinha
let velocidadeXDaBolinha = 6;
let velocidadeYDaBolinha = 6;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 6;
let raqueteAltura =80;

//Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3") 
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background('rgb(0, 155, 0)');
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete, yRaquete);
  movimentoDaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  fill(255)
  circle(xBolinha, yBolinha, dBolinha);
  
}

function movimentaBolinha(){
  xBolinha += velocidadeXDaBolinha;
  yBolinha += velocidadeYDaBolinha;
}

function verificaColisao(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXDaBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYDaBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  fill(255);
  rect(x, y, raqueteComprimento, raqueteAltura);
}


function movimentoDaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  } 
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
}
  yRaquete = constrain(yRaquete, 0, 310);
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
    velocidadeXDaBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
  velocidadeXDaBolinha *= -1;
    raquetada.play();
}
} 

function movimentaRaqueteOponente(){
   if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  } 
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
}
  yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(255);
  rect(150, 10, 40, 20);
  fill(0);
  text(meusPontos, 170, 26);
  fill(255);
  rect(450, 10, 40,20);
  fill(0);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}
