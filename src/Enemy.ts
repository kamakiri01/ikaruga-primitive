import { Player } from "./Player";
import { EnemyBullet } from "./EnemyBullet";
import { ManagedCommonOffset, StateManager } from "./StateManager";

export interface EnemyParameterObject extends ManagedCommonOffset {
    side: boolean;
}

export class Enemy extends g.FilledRect {
    player: Player;
    stateManager: StateManager;
    private _currentSide: boolean;
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

    shot() {
        let vecX = this.stateManager.player.x - this.x;
        let  vecY = this.stateManager.player.y - this.y;
        const norm = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2));
        vecX = vecX / norm;
        vecY = vecY / norm;
        this.stateManager.createEnemyBullet(this, vecX, vecY, this._currentSide);
    }

    movement() {
        const frequency = (g.game.age % g.game.fps) / g.game.fps;
        this.x += Math.sin(frequency * Math.PI * 2);
        this.modified();
    }
}