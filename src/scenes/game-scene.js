import Bird from "../features/bird";
import PipeSystem from "../features/pipes";
import Score from "../features/score";
import FlappyBirdScene from "./flappy-bird-scene";

export default class GameScene extends FlappyBirdScene
{
    constructor(config)
    {
        super("GameScene", config);
        this.bird=null;
        this.pipeSystem=null;
        this.score=null;
        this.pauseButton = null; 
        this.paused = false; 
    } 
    preload()
    {
        
        this.load.image("bird","assets/bird.png");
        this.load.image("pipe","assets/pipe.png");
        this.load.image("pauseButton","assets/pause.png");
    }
    create()
    {
        super.create(); 

        this.bird=new Bird(this,100,this.config.height/2,"bird");
        this.Layers.game.add(this.bird);

        this.pipeSystem=new PipeSystem(this,this.Layers.game);
        this.physics.add.collider(this.bird,this.pipeSystem.getGroup(), this.gameOver,null,this);

        this.score=new Score(this,16,16,this.Layers.ui);
        this.pauseButton=this.add.image(this.config.width - 10 , 10,"pauseButton")
        .setOrigin(1, 0)
        .setInteractive()
        .setScale(3);
        
        this.pauseButton.on("pointerup", this.pause,this);

        this.pipeSystem.onPipeExited=()=>
        {
            this.score.addScore(1);
        }
        this.pipeSystem.start();
    }

    update()
    {
        this.paused = true; 

        this.bird
        .checkOffbounds(()=>
        {
            this.gameOver();
        })
        this.pipeSystem.update();
    }
   
    
    gameOver()
    {
        this.pipeSystem.stop(); 
        this.pauseButton.setVisible(false);  
        this.Layers.game.bringToTop(this.bird); 
        this.bird.triggerLoseAnimation(()=>
        {
            this.score.checkHighScore();
            this.scene.restart();
        }); 
        
    }
    pause()
    {
        this.physics.pause();
        this.paused = true; 

        const continueButtonCallbacks = 
        {
            onClick: ()=> this.resume(), 
            onMouseEnter: text => text.setFill("#0F0"), 
            onMouseExit: text => text.setFill("#FFF")
        }

        const quitButtonCallbacks = 
        {
            onClick: ()=> this.scene.start("MenuScene"), 
            onMouseEnter: text => text.setFill("#F00"), 
            onMouseExit: text => text.setFill("#FFF")
        }

        const mainMenu = 
        {
            items: 
            [
                {label: "Continue", style: {fontSize: "32px", fill: "#FFF"}, ...continueButtonCallbacks}, 
                {label: "Quit", style: {fontSize: "32px", fill: "#FFF"}, ...quitButtonCallbacks}
            ], 
            firstItemPosition: {x: this.config.width / 2,  y: this.config.height / 2},
            origin: {x: 0.5, y: 0.5},
            spacing: 45
        }
        this.showMenu(mainMenu) 
    }

    resume ()
    {
        this.physics.resume(); 
        this.paused = false;  
    }
}
//export default GameScene;