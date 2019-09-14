import { StateManager } from "./StateManager";

function main(param: g.GameMainParameterObject): void {
    const scene = new g.Scene({
        game: g.game,
        assetIds: []
    });
    scene.loaded.add(() => {
        const stateManager = new StateManager();
        stateManager.createPlayer();
        scene.update.add(() => {
            stateManager.update();
        });

        // 開始1秒後に敵を生成
        scene.setTimeout(() => {
            stateManager.createEnemy(100, 100, true);
            stateManager.createEnemy(g.game.width / 2, 100, false);
            stateManager.createEnemy(g.game.width - 100, 100, false);
        }, 1000);
    });
    g.game.pushScene(scene);
}

export = main;
