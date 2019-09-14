import { Player } from "./Player";
import { EnemyBullet } from "./EnemyBullet";
import { Enemy } from "./Enemy";

/**
 * 状態管理クラス
 * mock段階ではゲームの状態はほぼ無いため、実質的に描画エンティティの生成と管理を行う
 */
export class StateManager {
    player: Player;
    // playerBullets: PlayerBullet[];
    enemies: Enemy[];
    enemyBullets: EnemyBullet[];

    root: g.E;

    constructor() {
        // this.playerBullets = [];
        this.enemies = [];
        this.enemyBullets = [];

        const scene = g.game.scene();
        this.root = new g.E({
            scene: scene
        });
        scene.append(this.root);
    }

    /**
     * 毎フレーム実行する処理
     */
    update() {
        this.checkEnemyBulletCollision();
    }

    createPlayer() {
        if (this.player) return;
        this.player = new Player({
            x: g.game.width / 2,
            y: g.game.height / 2
        });
        this.root.append(this.player);
    }

    createEnemy(x: number, y: number, side: boolean) {
        const enemy = new Enemy({
            stateManager: this,
            x,
            y,
            side
        });
        this.enemies.push(enemy);
        this.root.append(enemy);
    }

    createEnemyBullet(enemy: Enemy, vecX: number, vecY: number) {
        const bullet = new EnemyBullet({
            x: enemy.x,
            y: enemy.y,
            vecX,
            vecY,
            side: enemy._currentSide
        });
        this.enemyBullets.push(bullet);
        this.root.append(bullet);
    }

    checkPlayerBulletCollision() {
        // soon
    }

    checkEnemyBulletCollision() {
        this.enemyBullets.forEach((bullet) => {
            if (g.Collision.intersectAreas(this.player, bullet)) {
                if (bullet.side !== this.player._currentSide) console.log("dead!");
            }
        });
    }
}

export interface ManagedCommonOffset extends g.CommonOffset {
    stateManager: StateManager;
}