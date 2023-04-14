import Phaser from "phaser";

var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            gravity: false
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
    this.load.image('background', 'assets/sky.png');
    this.load.image('ball', 'https://labs.phaser.io/assets/sprites/balls/ball1.png');
    this.load.image('paddle', 'https://labs.phaser.io/assets/sprites/paddle.png');
    this.load.image('brick', 'https://labs.phaser.io/assets/sprites/bricks/brick1.png');
}

function create () {
    
    this.add.image(0, 0, 'background').setOrigin(0);
    //this.cameras.main.setBackgroundColor('#00FFFF');



    ball = this.physics.add.sprite(config.width / 2, config.height - 50, 'ball');
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);
    ball.setVelocity(200, -200);
    ///ball.setScale(.1);
    

    paddle = this.physics.add.sprite(config.width / 2, config.height - 10, 'paddle');
    paddle.setImmovable(true);
    //paddle.setScale(.2);

    

    bricks = this.physics.add.staticGroup({
        key: 'brick',
        frameQuantity: 20,
        gridAlign: {
            width: 10,
            height: 4,
            cellWidth: 70,
            cellHeight: 70,
            x: 55,
            y: 55
        }
    });
    //bricks.setScale(.2);

    this.physics.add.collider(ball, paddle, function() {
        ball.setVelocityY(ball.body.velocity.y * -1);
    });

    this.physics.add.collider(ball, bricks, function(ball, brick) {
        brick.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        if (bricks.countActive() === 0) {
            gameOver = true;
            scoreText.setText('You win!');
        }
    });

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    livesText = this.add.text(config.width - 100, 16, 'Lives: 3', { fontSize: '32px', fill: '#000' });


}

function update () {
    if (gameOver) {
        return;
    }

    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown) {
        paddle.setVelocityX(-400);
    }
    else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown) {
        paddle.setVelocityX(400);
    }
    else {
        paddle.setVelocityX(0);
    }

    if (ball.y > config.height) {
        lives--;
        livesText.setText('Lives: ' + lives);

        if (lives === 0) {
            gameOver = true;
            scoreText.setText('You lose!');
        }
        else {
            ball.setPosition(config.width / 2, config.height - 50);
            ball.setVelocity(200, -200);
            paddle.setPosition(config.width / 2, config.height - 10);
        }
    }
}
