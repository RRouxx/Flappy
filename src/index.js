import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 350 }
    }
  },
  scene: {
    preload,
    create,
    update
  }
}

const FlapVelocity = 250;
const PipeSpawmTime = 3000;

let bird = null;
let pipe = null;
let pipeTimeCount = 0;

function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create () {
  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.add.sprite(100, config.height/2,"bird");
  this.physics.add.existing(bird);

  this.input.keyboard.on("keydown-SPACE", flap);
}

function update(time, delta){
  pipeTimeCount += delta;
  if(pipeTimeCount >= PipeSpawmTime){
    Pipe(this);
    Pipe1(this);
    pipeTimeCount = 0;
  }
}

function flap(){
  bird.body.velocity.y = -FlapVelocity;
}

function Pipe(game){
  let yPos = (Math.random() * 200) + 550;
  pipe = game.add.sprite(config.width + 50, yPos, "pipe");
  game.physics.add.existing(pipe);
  pipe.body.allowGravity = false;
  pipe.body.immovable = true;
  pipe.body.velocity.x = -100;

  game.physics.add.collider(bird, pipe, function()
  {
    console.log("¡Colisión!");
    game.add.text(config.width / 2, config.height / 2, "Lose", { fontSize: '128px', fill: '#FF00FF' }).setOrigin(0.5);
    
  });
}
function Pipe1(game){
  let yPos = (Math.random() * 200) - 150;
  pipe = game.add.sprite(config.width + 50, yPos, "pipe");
  game.physics.add.existing(pipe);
  pipe.body.allowGravity = false;
  pipe.body.immovable = true;
  pipe.body.velocity.x = -100;

  game.physics.add.collider(bird, pipe, function()
  {
    console.log("Colisión!");
    game.add.text(config.width / 2, config.height / 2, "Lose", { fontSize: '128px', fill: '#FF00FF' }).setOrigin(0.5);
    
  });
}
new Phaser.Game(config);