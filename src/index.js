import Phaser from "phaser";

var config =
{
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  physics:
  {
      default: 'arcade',
      arcade:
      {
          gravity: {y: 0},
          gravity: false
      }
  },
  scene:
  {
        preload: preload,
        create: create,
        update: update
  }
};

var game = new Phaser.Game(config);
var ball;
var paddle;
var bricks;
var score = 0;
var highScore = 0;
var scoreText;
var highScoreText;
var lives = 3;
var livesText;
var gameOver = false;

function preload()
{
    this.load.image("background", "assets/background.jpg");
    this.load.image("ball", "assets/Ball.png");
    this.load.image("paddle", "assets/Paddle.png");
    this.load.image("brick", "assets/Brick.png");
}

function create()
{
    // Se agrega la imagen de fondo al juego en la posición (0, 0).
    this.add.image(0, 0, "background").setOrigin(0);

    //Se crea la bola y se establecen sus propiedades de rebote, colisión con los límites del mundo y velocidad.
    ball = this.physics.add.sprite(config.width / 2, config.height - 50, "ball");
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);
    ball.setVelocity(200, -200);

    //Se crea la paleta del jugador y se establece como inamovible.
    paddle = this.physics.add.sprite(config.width / 2, config.height - 10, "paddle");
    paddle.setImmovable(true);

    bricks = this.physics.add.staticGroup
    ({
        key: "brick",
        frameQuantity: 20,
        gridAlign:
        {
            width: 10,
            height: 4,
            cellWidth: 70,
            cellHeight: 70,
            x: 55,
            y: 55,
        },
    });

    //Se crea el texto del puntaje, del puntaje más alto y de las vidas del jugador.
    scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "20px", fill: "#00FFFF" });
    highScoreText = this.add.text(200, 16, "High Score: 0", { fontSize: "20px", fill: "#00FFFF" });
    livesText = this.add.text(config.width - 170, 16, "Lives: 3", { fontSize: "20px", fill: "#00FFFF" });


    // Cargar el highScore almacenado en localStorage
    highScore = localStorage.getItem("highScore") || 0;
    highScoreText.setText("High Score: " + highScore);  
}

function update(time, delta) {
    if (gameOver) return;

    handlePaddleMovement.call(this);

    // Rebote instantáneo de la bola con el paddle
    this.physics.add.collider(ball, paddle, function ()
    {
        const diff = ball.x - paddle.x;
        ball.setVelocityY(-300);
    if (ball.body.velocity.x < 0)
    {
        ball.setVelocityX(-10 * diff);
    }
    else if (ball.body.velocity.x > 0)
    {
        ball.setVelocityX(10 * diff);
    }
    });

    // Actualización de los textos
    scoreText.setText("Score: " + score);
    livesText.setText("Lives: " + lives);

    this.physics.world.setBoundsCollision(true, true, true, false);

    this.physics.world.on('worldbounds', function (body) 
    {
        if (body.gameObject === ball)
        {
            lives--;
            livesText.setText('Lives: ' + lives);
    
        }
    }, this);

    if (ball.y > config.height) 
    {
        loseLife();
    }  

    // Colisión entre la bola y los ladrillos
    this.physics.add.collider(ball, bricks, function (ball, brick)
    {
    brick.disableBody(true, true);
    score += 10;
    scoreText.setText("Score: " + score);


    // Si se han destruido todos los ladrillos, se gana el juego
    if (score == 180)
    {
      gameOver = true;
      scoreText.setText("You win! Press 'R' to restart");
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreText.setText("High Score: " + highScore);
      }
    }
    });

  // Reiniciar la escena al presionar la tecla "R"
  if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R).isDown) {
    restartGame();
  }

}



function loseLife()
{
    lives--;
    livesText.setText('Lives: ' + lives);
    if (lives === 0)
    {
        //Mostrar el mensaje de fin de juego y reiniciar el juego
        gameOver = true;
        scoreText.setText("You lose! Press 'R' to restart");
    }
    else
    {
        ball.setPosition(config.width / 2, config.height - 50);
        ball.setVelocity(200, -200);
        paddle.setPosition(config.width / 2, config.height - 10);
    }
}



function restartGame()
{
    gameOver = false;
    score = 0;
    lives = 3;
    scoreText.setText('Score: 0');
    livesText.setText('Lives: ' + lives);
    bricks.children.iterate(function (child)
    {
        child.enableBody(true, child.x, child.y, true, true);
    });
    ball.setPosition(config.width / 2, config.height - 50);
    paddle.setPosition(config.width / 2, config.height - 10);
    ball.setVelocity(200, -200);
}

function handlePaddleMovement()
{
    // Movimiento del paddle
  /*if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown) {
    if (paddle.x > 0) {
      paddle.setVelocityX(-400);
    } else {
      paddle.setVelocityX(0);
    }
  } else if (
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown
  ) {
    if (paddle.x < config.width - paddle.width) {
      paddle.setVelocityX(400);
    } else {
      paddle.setVelocityX(0);
    }
  } else {
    paddle.setVelocityX(0);
  }*/

    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown)
    {
    paddle.setVelocityX(-400);
    } 
    else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown)
    {
    paddle.setVelocityX(400);
    } 
    else 
    {
    paddle.setVelocityX(0);
    }

}