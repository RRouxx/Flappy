const FLAP_VELOCITY= 300;
const PIPE_SPAWN_TIME = 3000;
const PIPE_VELOCITY = 150;

class GameScene extends Phaser.Scene{
    constructor(config)
    {
        super();
        this.config = config;
        this.bird = null;
        this.pipes = null;
    }

    preload()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/pipe.png');
    }

    create()
    {
        this.add.image(0, 0, 'sky').setOrigin(0);

        this.bird = this.add.sprite(100, this.config.height/2,"bird");
        this.physics.add.existing(this.bird);

        this.input.keyboard.on("keydown-SPACE", this.flap);

        this.pipes = this.physics.add.group({
            allowGravity: false,
            immovable: true
  });

  this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);

  this.spawnPipe();
  this.time.addEvent({
    delay: PIPE_SPAWN_TIME,
    callback: () => {
      this.spawnPipe();
    },
            loop: true
        });
    }

    update()
    {

    }

    flap()
    {
        this.bird.body.velocity.y = FLAP_VELOCITY;
    }

    spawnPipe()
    {
        var spawnPosition = Phaser.Math.Between(50,250);
        var gapSize = Phaser.Math.Between(100,300);
        var upper = this.pipes.create(this.config.width, spawnPosition, "pipe").setOrigin(0,1);
        var lower = this.pipes.create(this.config.width, spawnPosition + gapSize, "pipe").setOrigin(0);
        upper.body.velocity.x = -PIPE_VELOCITY;
        lower.body.velocity.x = -PIPE_VELOCITY;


    }

    gameOver()
    {
        alert("You lose");
        this.scene.restart();
    }
}

export default GameScene;
