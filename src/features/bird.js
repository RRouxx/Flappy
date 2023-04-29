const FLAP_VELOCITY=250;
const OFFBOUNS_THERSHOLD=15;

export default class Bird extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture)
    {
        super(scene,x,y,texture);
        this.scene=scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.immovable = true; 
        scene.input.keyboard.on("keydown-SPACE",this.flap,this);
        scene.input.keyboard.on("keydown-W",this.flap,this);
        this.blocked = false; 

    }
    checkOffbounds(callback)
    {
        if(this.getBounds().top >= 0-OFFBOUNS_THERSHOLD&&this.getBounds().bottom<=this.scene.config.height+OFFBOUNS_THERSHOLD)
        {
           return;
        }
        callback();
    }
    flap()
    {
        if (this.blocked) return; 
        this.body.velocity.y = -FLAP_VELOCITY;
    }
    
    triggerLoseAnimation(endcallback)
    {
        this.setTint(0xFF0000); 
        this.flap();
        this.blocked = true; 
        const loseTimer = this.scene.time.addEvent({
            delay: 2, 
            callback: () => {
                this.checkLoseAnimation(loseTimer, endcallback); 
            }, 
            loop: true
        }) 
    }

    checkLoseAnimation(timer, endcallback){
        if (this.getBounds().top > this.scene.config.height) {
            timer.remove(); 
            endcallback(); 
        }
    }
}