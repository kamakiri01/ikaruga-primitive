export interface EnemyBulletParameterObject extends g.CommonOffset {
    vecX: number;
    vecY: number;
    speed?: number;
    side: boolean;
}

export class EnemyBullet extends g.FilledRect {
    vecX: number;
    vecY: number;
    speed: number;
    side: boolean;
    constructor(param: EnemyBulletParameterObject) {
        const _param = {
            scene: g.game.scene(),
            x: param.x,
            y: param.y,
            cssColor: param.side ? "red" : "green",
            width: 5,
            height: 5
        };
        super(_param);

        this.vecX = param.vecX;
        this.vecY = param.vecY;
        this.speed = param.speed ? param.speed : 5;
        this.side = param.side;

        this.update.add(() => {
            this.x += this.vecX * this.speed;
            this.y += this.vecY * this.speed;
            this.modified();
        })
    }
}