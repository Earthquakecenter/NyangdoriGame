import * as Phaser from 'phaser';
import { Game } from './scenes/Game'; // 파일명 Game.js에 맞춤

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#1c1c1c',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // 탑다운 뷰
            debug: true       // 충돌체 히트박스 시각화
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Game]
};

const StartGame = (parent) => {
    return new Phaser.Game({ ...config, parent });
};

export default StartGame;