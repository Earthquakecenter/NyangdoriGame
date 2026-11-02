import * as Phaser from 'phaser';

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        // 배경색 설정 (짙은 회색)
        this.cameras.main.setBackgroundColor(0x222222);

        // 화면 중앙 좌표 (가로 1024, 세로 768 기준)
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // 화면 중앙에 초록색 사각형 생성 (가로 40, 세로 40, 초록색 0x00ff00)
        this.player = this.add.rectangle(centerX, centerY, 40, 40, 0x00ff00);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        // WASD 키 및 방향키 입력 설정
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // 이동 속도 설정
        this.playerSpeed = 250;
    }

    update() {
        let vx = 0;
        let vy = 0;

        // WASD 및 화살표 키 입력 감지
        if (this.keys.left.isDown || this.cursors.left.isDown) vx -= 1;
        if (this.keys.right.isDown || this.cursors.right.isDown) vx += 1;
        if (this.keys.up.isDown || this.cursors.up.isDown) vy -= 1;
        if (this.keys.down.isDown || this.cursors.down.isDown) vy += 1;

        // 대각선 이동 시에도 동일한 속도를 유지하도록 정규화
        if (vx !== 0 || vy !== 0) {
            const moveVec = new Phaser.Math.Vector2(vx, vy).normalize();
            this.player.body.setVelocity(moveVec.x * this.playerSpeed, moveVec.y * this.playerSpeed);
        } else {
            this.player.body.setVelocity(0, 0);
        }
    }
}
