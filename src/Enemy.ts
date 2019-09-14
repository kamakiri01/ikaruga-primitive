import { Player } from "./Player";
import { ManagedCommonOffset, StateManager } from "./StateManager";

export interface EnemyParameterObject extends ManagedCommonOffset {
    /**
     * インスタンス生成時の属性
     * 同じ属性のEnemyBulletを発射する
     */
    side: boolean;
}

/**
 * 敵機のクラス
 */
export class Enemy extends g.FilledRect {
    stateManager: StateManager;
    _currentSide: boolean;
    constructor(param: EnemyParameterObject) {
        const _param = {
            scene: g.game.scene(),
            x: param.x,
            y: param.y,
            cssColor: param.side ? "red" : "green",
            width: 50,
            height: 50
        };
        super(_param);
        this.stateManager = param.stateManager;
        this._currentSide = param.side;

        this.update.add(() => {
            // 2sec毎
            if (g.game.age % (g.game.fps * 2) === 0) this.shot();
            this.movement();
        });
    }

    /**
     * 弾を撃つ
     */
    shot() {
        let vecX = this.stateManager.player.x - this.x;
        let  vecY = this.stateManager.player.y - this.y;
        const norm = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2));
        vecX = vecX / norm;
        vecY = vecY / norm;
        this.stateManager.createEnemyBullet(this, vecX, vecY);
    }

    /**
     * 適当に動かす
     */
    movement() {
        const frequency = (g.game.age % g.game.fps) / g.game.fps;
        this.x += Math.sin(frequency * Math.PI * 2);
        this.modified();
    }
}