export default class FlappyBirdScene extends Phaser.Scene {
    constructor(sceneName, config){
        super(sceneName);
        this.config = config;
        this.Layers = {
            background: null,
            game: null,
            ui: null   
        }
    } 

    create() {
        this.Layers.background = this.add.layer();
        this.Layers.game = this.add.layer();
        this.Layers.ui = this.add.layer();

        var sky=this.add.image(0,0,"sky").setOrigin(0.2,0.15);
        this.Layers.background.add(sky);

    }

    showMenu(menu){
        let yPos = menu.firstItemPosition.y; 
        menu.items.forEach(item => {
            const textObject = this.add.text(menu.firstItemPosition.x, yPos, item.label, item.style)
            .setOrigin(menu.origin.x, menu.origin.y)
            .setInteractive(); 
            yPos += menu.spacing; 
            textObject.on("pointerup",  item.onClick, this); 
            textObject.on("pointerover", () => { item.onMouseEnter(textObject)}, this); 
            textObject.on("pointerout", () => {item.onMouseExit(textObject)}, this);
        });
    }
}