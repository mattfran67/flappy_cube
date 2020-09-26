// Valor boolean para verificar se a tecla foi pressionada
var keyIsPressed = false;
var curScene = 0; // Cena Atual
var posY = 150; // Posição Y inicial
var id;

// Variaveis dos canos
var gap = 80;
var pipes = [];
var height;

// Instancia o jogador e a aceleração
var player = new Player(img, 30, posY, 30);
var pos = player.y;
var a = new Aceleration();

// Muda as cenas
canvas.addEventListener('click', () => {
  if (curScene == 1) {
    game();
  }
  else if (curScene == 3 || curScene == 4) {
    sceneOpening();
  } 
})

img.onload = () => {
  sceneOpening();
}

// Verifica se a tecla espaço foi pressionada
document.addEventListener("keydown", (event) => {
  if (event.key == " ") {
    keyIsPressed = true;
  }
});

// Verifica se a tecla espaço foi solta
document.addEventListener("keyup", (event) => {
  if (event.key == " ") {
    keyIsPressed = false;
  }
});