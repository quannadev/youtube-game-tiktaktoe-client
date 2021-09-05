import Enum = cc.Enum;

const {ccclass, property} = cc._decorator;

export enum PixelType {
    None,
    X,
    Y
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
    private row: number;
    private col: number;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            cc.tween(this.node)
                .blink(0.5, 2)
                .call(_ => {
                this.onUserClick(PixelType.X)
            }).start();
        })
    }
    setData(row: number, col: number){
        this.row = row;
        this.col = col;
    }

    onUserClick(type: PixelType) {
        if (this.pixelType != PixelType.None) {
            return
        }
        switch (type) {
            case PixelType.X:
                this.pixelName.string = "X";
                break
            case PixelType.Y:
                this.pixelName.string = "Y";
        }
    }

    start() {

    }

    // update (dt) {}
}
