import { StateManager } from "./StateManager";

function main(param: g.GameMainParameterObject): void {
    // ゲームシーンの生成
    const scene = new g.Scene({
        game: g.game,
        assetIds: []
    });
    // シーンのロード（アセットなど）完了後に実行する処理
    scene.loaded.add(() => {

        // ゲーム状態を管理するオブジェクト
        const stateManager = new StateManager();

        // プレイヤー生成
        stateManager.createPlayer();

        // 毎フレーム実行する処理のリスナー設置
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
