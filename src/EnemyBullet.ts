export interface EnemyBulletParameterObject extends g.CommonOffset {
    /**
     * 弾の方向ベクトル
     */
    vecX: number;
    vecY: number;

    /**
     * 弾にかかる速度係数
     */
    speed?: number;

    /**
     * 弾の属性
     */
    side: boolean;
}

/**
 * 敵弾のクラス
 */
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