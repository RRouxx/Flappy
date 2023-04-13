import Phaser from "phaser";
import GameScene from "../Scenes/game-scene";

const SHARED_CONFIG = {
  with: 800,
  height: 600,
}

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 400 }
    }
  },
  scene: [new GameScene(SHARED_CONFIG)]
}

new Phaser.Game(config);