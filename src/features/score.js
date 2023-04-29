const CURRENT_SCORE_LABEL ="Score ";
const HIGH_CSCORE_LABEL="High score: ";
const HIGH_SCORE_SAVE_KEY="high_score";
export default class score{
    constructor(scene,x,y,layer){
        this.scene=scene;
        this.currentScoreValue=0;
     
        var loadHighScore=parseInt(localStorage.getItem(HIGH_SCORE_SAVE_KEY))
        this.highScoreValue= isNaN(loadHighScore) ? 0:loadHighScore;
        /*if(loadHighScore==NaN){ es lo mismo que lode arriba
            this.highScoreValue=0;
        }
        else{
            this.highScoreValue=loadHighScore;
        }*/
        this.currentScoreText=scene.add.text(x,y,CURRENT_SCORE_LABEL+this.currentScoreValue).setOrigin(0);
        this.highScoreText=scene.add.text(x,y+12,HIGH_CSCORE_LABEL+this.highScoreValue).setOrigin(0);
        layer.add([this.currentScoreText,this.highScoreText]);
    }
    addScore(amount){
        this.currentScoreValue  += amount;
        this.currentScoreText.setText(CURRENT_SCORE_LABEL+this.currentScoreValue)
        
    }

    checkHighScore(){
        if(this.currentScoreValue>this.highScoreValue){
            this.highScoreValue=this.currentScoreValue;
            this.highScoreText.setText(HIGH_CSCORE_LABEL+this.highScoreValue);
            localStorage.setItem(HIGH_SCORE_SAVE_KEY,this.highScoreValue);

        }
    }
    //por si se necesita resetea el score
    resetScore(){
        this.currentScoreValue=0;
        this.currentScoreText.setText(CURRENT_SCORE_LABEL+this.currentScoreValue);
    }
}