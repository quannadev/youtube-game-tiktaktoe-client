import {PixelType} from "./Rooms/Pixel";

const {ccclass, property} = cc._decorator;

export interface IUser {
    Id: string;
    DisplayName: string;
    Avatar?: string;
    Level: number;
    Amount: number;
    PixelType: PixelType;
}

@ccclass
export default class UserProfile extends cc.Component {

    @property(cc.Label)
    displayName: cc.Label = null;
    @property(cc.Sprite)
    avatar: cc.Sprite = null;
    @property
    userId: string = '';
    @property(cc.Node)
    timerNode: cc.Node = null
    @property(cc.Label)
    timerTxt: cc.Label = null
    private timerCount: number = 0

    onLoad() {
        this.node.setPosition(0, 0);
    }

    SetData(data: IUser, showName = true) {
        if (showName) {
            this.displayName.string = data.DisplayName;
        } else {
            this.displayName.node.active = false;
        }
        cc.assetManager.loadRemote<cc.Texture2D>(data.Avatar, ((err, asset) => {
            if (err) {
                console.error("Load avatar error", err)
                return
            }
            this.avatar.spriteFrame = new cc.SpriteFrame(asset);
        }))
    }

    private TimerCounter() {
        // const timerSprite = this.timerNode.getComponent(cc.Sprite);
        // timerSprite.fillRange -= this.timerCount / 100
        // if (timerSprite.fillRange == -1) {
        //     timerSprite.fillRange = 0;
        //     this.unschedule(this.TimerCounter)
        //     return
        // }
        let counter = this.timerCount - 1;
        this.timerTxt.node.active = true;
        this.timerTxt.string = `${counter}`;
        const timer = setInterval(() => {
            this.timerTxt.string = `${counter}`;
            if (counter <= 0) {
                clearInterval(timer)
                this.timerTxt.node.active = false;
                return
            }
            counter--;
        }, 1000)
    }

    StartTimer(time: number) {
        this.timerCount = time;
        this.timerTxt.node.active = true;
        this.TimerCounter()
        // this.schedule(this.TimerCounter, 0.1)
        const timerSprite = this.timerNode.getComponent(cc.Sprite);
        timerSprite.fillRange = 1;
        cc.tween(timerSprite).to(time, {fillRange: 0}).delay(1).start()

    }

    StopTimer() {
        this.unschedule(this.TimerCounter)
    }

    start() {

    }

    // update (dt) {}
}
