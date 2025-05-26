let jardineiro;
let plantas = [];
let temperatura = 10;
let totalArvores = 0;
let animais = [];
let tempo = 0;

function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width / 2, height - 50);
}

function draw() {
  tempo += 0.02; // Simula passagem do tempo
  let corFundo = lerpColor(color(217, 112, 26), color(219, 239, 208),
    map(totalArvores, 0, 100, 0, 1));
  background(corFundo);

  mostrarInformacoes();

  temperatura += 0.05 + sin(tempo) * 0.05; // Temperatura oscila com o tempo

  jardineiro.atualizar();
  jardineiro.mostrar();

  verificarFimDeJogo();

  plantas.map((arvore) => arvore.crescer());
  plantas.map((arvore) => arvore.mostrar());

  animais.map((animal) => animal.mover());
  animais.map((animal) => animal.mostrar());

  if (totalArvores > 0 && frameCount % 200 === 0) {
    animais.push(new Animal(random(width), random(height / 2))); // Adiciona animais com o tempo
  }
}

function mostrarInformacoes() {
  textSize(26);
  fill(0);
  text("Vamos plantar árvores para reduzir a temperatura?", 10, 30);
  textSize(14);
  fill('white');
  text("Temperatura: " + temperatura.toFixed(2), 10, 390);
  text("Árvores plantadas: " + totalArvores, 460, 390);
}

function verificarFimDeJogo() {
  if (totalArvores > temperatura) {
    mostrarMensagemDeVitoria();
  } else if (temperatura > 50) {
    mostrarMensagemDeDerrota();
  }
}

function mostrarMensagemDeVitoria() {
  textSize(20);
  fill(0);
  text("Você venceu! A temperatura caiu!", 100, 200);
  noLoop();
}

function mostrarMensagemDeDerrota() {
  textSize(20);
  fill(0);
  text("😞 Você perdeu! A temperatura está muito alta.", 100, 200);
  noLoop();
}

class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = '👨‍🌾';
    this.velocidade = 3;
  }

  atualizar() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.velocidade;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.velocidade;
    if (keyIsDown(UP_ARROW)) this.y -= this.velocidade;
    if (keyIsDown(DOWN_ARROW)) this.y += this.velocidade;
  }

  mostrar() {
    textSize(32);
    text(this.emoji, this.x, this.y);
  }
}

class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.estagio = 0;
    this.emojis = ['🌱', '🌿', '🌳'];
  }

  crescer() {
    if (frameCount % 300 === 0 && this.estagio < this.emojis.length - 1) {
      this.estagio++;
    }
  }

  mostrar() {
    textSize(24);
    text(this.emojis[this.estagio], this.x, this.y);
  }
}

class Animal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = random(['🦋', '🐦', '🐿']);
  }

  mover() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  mostrar() {
    textSize(20);
    text(this.emoji, this.x, this.y);
  }
}

function keyPressed() {
  if (key === 'p' || key === 'P' || keyCode === 32) { // 'p' or spacebar to plant
    criarArvore();
  }
}

function criarArvore() {
  let x = jardineiro.x;
  let y = jardineiro.y - 10;
  plantas.push(new Arvore(x, y));
  totalArvores++;
}