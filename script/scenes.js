function sceneOpening() {
  curScene = 1;

  // Reseta os pontos
  player.points = 0;

  // Cria e reinicia os canos
  pipes.splice(0, pipes.length)
  for (let i = 1; i <= 100; i++) {
    height = random(50, (contx.canvH / 2) + 30);
    
    pipes.push({
      up: new Pipe(i * 200, 0, 51, height),
      down: new Pipe(i * 200, height + gap, 51, (contx.canvH - height) - gap)
    });
  }

  // Tela de fundo
  contx.ctx.fillStyle = "white";
  contx.ctx.fillRect(0, 0, contx.canvW, contx.canvH);

  // Imagem
  contx.ctx.drawImage(img, (contx.canvW / 2) - 65, 20, 120, 120);

  // Textos
  contx.ctx.fillStyle = "#555";
  contx.ctx.font = "30px Arial";
  contx.ctx.fillText("Flappy Cube", (contx.canvW / 2) - 80, contx.canvH - 90);
  contx.ctx.font = "15px Arial";
  contx.ctx.fillText("(Clique para Iniciar)", (contx.canvW / 2) - 70, (contx.canvH / 2) + 70);
  contx.ctx.fillText("(Use espaço para pular)", (contx.canvW / 2) - 80, (contx.canvH) - 15);
}

function sceneEnd() {
  curScene = 3;
  // Tela de fundo
  contx.ctx.fillStyle = "white";
  contx.ctx.fillRect(0, 0, contx.canvW, contx.canvH);

  // Imagem
  contx.ctx.drawImage(imgWin, (contx.canvW / 2) - 65, 20, 120, 120);

  // Textos
  contx.ctx.fillStyle = "#555";
  contx.ctx.font = "30px Arial";
  contx.ctx.fillText("Você Venceu!! Como é possível!?", 30, contx.canvH - 100);

  contx.ctx.font = "20px Arial";
  contx.ctx.fillText("Clique para Reiniciar", (contx.canvW / 2) - 90, contx.canvH - 70);

  contx.ctx.font = "20px Arial";
  contx.ctx.fillText("Pontos: " + player.points, 10, 30);
}

function gameOver() {
  curScene = 4;
  // Tela de fundo
  contx.ctx.fillStyle = "white";
  contx.ctx.fillRect(0, 0, contx.canvW, contx.canvH);

  // Imagem
  contx.ctx.drawImage(imgGameOver, (contx.canvW / 2) - 65, 20, 120, 120);

  // Textos
  contx.ctx.fillStyle = "#555";
  contx.ctx.font = "30px Arial";
  contx.ctx.fillText("Você Bateu!?", (contx.canvW / 2) - 85, contx.canvH - 100);

  contx.ctx.font = "15px Arial";
  contx.ctx.fillText("(Clique para Reiniciar)", (contx.canvW / 2) - 75, contx.canvH - 70);

  contx.ctx.font = "20px Arial";
  contx.ctx.fillText("Pontos: " + player.points, 10, 30);

}

function game() {
  curScene = 2;

  // Fundo
  contx.ctx.drawImage(imgBgrd, 0, 0, contx.canvW, contx.canvH);
  
  id = requestAnimationFrame(game);
  
  // Desenha o jogador
  player.draw();
  
  // Desenha os canos
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].up.draw();
    pipes[i].down.draw();
    pipes[i].up.x -= 1;
    pipes[i].down.x -= 1;
    
    // Aumenta a pontuação
    if ((pipes[i].up.x + pipes[i].up.w) < player.x) {
      player.points = i + 1;
    }
    
    if (player.collision(pipes[i].up) || player.collision(pipes[i].down)) {
      // Reseta alguns parametros
      player.y = posY;
      pos = posY;
      a.time = 0;

      cancelAnimationFrame(id);
      gameOver();
      return;
    }
  }
  
  // Desenha os pontos
  contx.ctx.fillStyle = "#555";
  contx.ctx.font = "20px Arial";
  contx.ctx.fillText("Pontos: " + player.points, 10, 30);

  if (player.points == 100) {
    cancelAnimationFrame(id);
    sceneEnd();
    return;
  }
  
  // Pula ou cai se tecla for pressionada
  if (keyIsPressed) {
    player.jump();
    a.time = 0;
    pos = player.y;
  } else {
    a.acel(pos, player);
  }
}