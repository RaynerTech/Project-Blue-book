

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;
  
var snake = {
  x:160,
  y: 162,
  
  // velocidade da serpente. aumentar um comprimento a cada quadro em ambas direções x ou y.
  dx: 0,
  dy: 0,
  
  //manter o controle de todos os quadros do corpo da cobra ocupa
  cells: [],
  
  // comprimento da cobra. cresce ao comer uma maçã
  maxCells: 5
};
var apple = {
  x: 320,
  y: 320
};


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function loop() {
  requestAnimationFrame(loop);

  // loop de jogo lento para 15 fps em vez de /60 (60/15 = 4)
  if (++count < 6) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  // mover cobra
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Enrole a posição da serpente horizontalmente na borda da tela
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  
  // Enrole a posição da serpente verticalmente na borda da tela
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  //manter o controle de onde cobra foi. Na frente da matriz é sempre a cabeça
  snake.cells.unshift({x: snake.x, y: snake.y});

  // remover células quando nós afastamos delas
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // desenhar maçã
  context.fillStyle = 'gray';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  // desenhar uma célula da cobra
  context.fillStyle = 'red';
  snake.cells.forEach(function(cell, index) {
    
    // desenho 1 px menor
    context.fillRect(cell.x, cell.y, grid-1, grid-1);  

    // cobra comeu maçã
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;

      // canvas 400x400 25x25
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    // Verifique a colisão 
    for (var i = index + 1; i < snake.cells.length; i++) {
      
      
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

//
document.addEventListener('keydown', function(e) {
  
 // tecla para  esquerda
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // tecla para cima
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // tecla para direita 
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // tecla para baixo
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});



// Iniciar jogo
requestAnimationFrame(loop);
