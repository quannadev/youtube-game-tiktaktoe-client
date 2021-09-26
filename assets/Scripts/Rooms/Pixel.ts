import Enum = cc.Enum;
import Player from "../Player";

const {ccclass, property} = cc._decorator;

export enum PixelType {
    None,
    X,
    O
}

Enum(PixelType)

@ccclass
export default class Pixel extends cc.Component {

    @property(cc.Label)
    pixelName: cc.Label = null;

    @property({
        type: PixelType
    })
    pixelType: PixelType = PixelType.None
    public row: number;
    public col: number;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            cc.tween(this.node)
                .blink(0.5, 2)
                .call(_ => {
                    this.onUserClick(PixelType.X)
                }).start();
        })
    }

    setData(row: number, col: number, pixel: PixelType = PixelType.None) {
        this.row = row;
        this.col = col;
        this.pixelType = pixel
        cc.tween(this.node)
            .blink(0.5, 2)
            .start();
        if (pixel != PixelType.None){
            switch (pixel) {
                case PixelType.X:
                    this.pixelName.string = "X";
                    this.pixelName.node.color = cc.Color.RED
                    break
                case PixelType.O:
                    this.pixelName.string = "O";
                    this.pixelName.node.color = cc.Color.BLUE
                    break
            }
        }
    }

    onUserClick(type: PixelType) {
        if (this.pixelType != PixelType.None) {
            return
        }
        Player.Instance.SetPlace(this.row, this.col)
    }

    start() {

    }

    // update (dt) {}
}
