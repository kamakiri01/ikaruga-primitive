export class Player extends g.FilledRect {
    _currentSide: boolean;
    private _inputKeys: {[key: number]: boolean};
    private _flipInterval: number;

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
            if (this._inputKeys[enableKeyCode.up]) this.y -= this.SPEED;
            if (this._inputKeys[enableKeyCode.down]) this.y += this.SPEED;
            if (this._inputKeys[enableKeyCode.left]) this.x -= this.SPEED;
            if (this._inputKeys[enableKeyCode.right]) this.x += this.SPEED;
            if (this._inputKeys[enableKeyCode.space]) this.flipSide();
            this.modified();
        });
    }

    flipSide() {
        if (this._flipInterval > 1) return;
        this._currentSide = !this._currentSide;
        this.cssColor = this._currentSide ? "red" : "green";
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

