/**
 * 自機のクラス
 * 本来の責務を逸脱するが、実装簡略化のためキー入力も扱う
 */
export class Player extends g.FilledRect {

    /**
     * 現在の属性
     * NOTE: 3属性以上に備えてbooleanをやめtypeにする
     */
    _currentSide: boolean;

    /**
     * 現在押下されているキーのコード一覧
     */
    private _inputKeys: {[key: number]: boolean};

    /**
     * 属性反転できるまでの待ち時間
     * キーを押下し続けたとき、30FPSで反転しないための措置
     */
    private _flipInterval: number;

    /**
     * 移動速度の係数
     */
    SPEED: number;
    constructor(param: g.CommonOffset) {
        const _param: g.FilledRectParameterObject = {
            scene: g.game.scene(),
            x: param.x,
            y: param.y,
            cssColor: "red",
            width: 10,
            height: 10
        };
        super(_param);
        this._currentSide = true;
        this.SPEED = 3;
        this._flipInterval = 10;
        this._inputKeys = {};

        // Akashicの流儀に反するがPC以外のPFを考慮しないので使う
        document.addEventListener("keydown", (event) => {
            const code = event.keyCode;
            this._inputKeys[code] = true;
        });
        document.addEventListener("keyup", (event) => {
            const code = event.keyCode;
            this._inputKeys[code] = false;
        });

        this.update.add(() => {
            this._flipInterval = Math.abs(this._flipInterval - 1);

            // キー入力に応じた処理
            if (this._inputKeys[enableKeyCode.up]) this.y -= this.SPEED;
            if (this._inputKeys[enableKeyCode.down]) this.y += this.SPEED;
            if (this._inputKeys[enableKeyCode.left]) this.x -= this.SPEED;
            if (this._inputKeys[enableKeyCode.right]) this.x += this.SPEED;
            if (this._inputKeys[enableKeyCode.space]) this.flipSide();

            this.modified();
        });
    }

    /**
     * 属性反転する
     */
    flipSide() {
        // インターバル時間を経過していない場合、反転しない
        if (this._flipInterval > 1) return;
        this._currentSide = !this._currentSide;
        this.cssColor = this._currentSide ? "red" : "green"; // 描画色変更
        this._flipInterval += 10;
    }
}

module enableKeyCode {
    export const up = 38;
    export const down = 40;
    export const left = 37;
    export const right = 39;
    export const space = 32;
}

