import Phaser from "phaser";

var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    scene: {
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
var scoreText;
var lives = 3;
var livesText;
var gameOver = false;

function preload () {
    this.load.image('background', 'ruta/al/fondo.png');
    this.load.image('ball', 'https://labs.phaser.io/assets/sprites/balls/ball1.png');
    this.load.image('paddle', 'https://labs.phaser.io/assets/sprites/paddle.png');
    this.load.image('brick', 'https://labs.phaser.io/assets/sprites/bricks/brick1.png');
}

function create() {
    // Establece el fondo personalizado
    this.add.image(0, 0, 'background').setOrigin(0);

    // Crea la pelota y establece sus propiedades
    this.ball = this.physics.add.image(300, 400, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);

    // Crea la paleta y establece sus propiedades
    this.paddle = this.physics.add.image(300, 450, 'paddle');
    this.paddle.setCollideWorldBounds(true);
    this.paddle.setImmovable(true);

    // Crea la colisión entre la pelota y la paleta
    this.physics.add.collider(this.ball, this.paddle, function() {
        this.ball.setVelocityY(-300);
    }, null, this);
    
    // Crea un texto para mostrar "Lose"
    this.loseText = this.add.text(200, 200, 'Lose', { font: '48px Arial', fill: '#ffffff' });
    this.loseText.visible = false;

    // Crea un botón de reinicio
    this.restartButton = this.add.text(200, 300, 'Restart', { font: '24px Arial', fill: '#ffffff' });
    this.restartButton.visible = false;
    this.restartButton.setInteractive();
    this.restartButton.on('pointerdown', function() {
        this.scene.restart();
    }, this);
}

function update() {
    // Mueve la paleta con las teclas de flecha izquierda y derecha
    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
        this.paddle.setVelocityX(-300);
    } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
        this.paddle.setVelocityX(300);
    } else {
        this.paddle.setVelocityX(0);
    }

    // Si la pelota cae al fondo, muestra "Lose" y el botón de reinicio
    if (this.ball.y > 480) {
        this.ball.setPosition(300, 400);
        this.ball.setVelocity(0, 0);
        this.loseText.visible = true;
        this.restartButton.visible = true;
    }
    
    // Si la pelota pasa la paleta, muestra "Lose" y el botón de reinicio
    if (this.ball.y > this.paddle.y + 30) {
        this.loseText.visible = true;
        this.restartButton.visible = true;
    }
}

