const {ccclass, property} = cc._decorator;

export interface IUser {
    Id: string;
    DisplayName: string;
    Avatar?: string;
    Level: number;
    Amount: number;
}

@ccclass
export default class UserProfile extends cc.Component {

    @property(cc.Label)
    displayName: cc.Label = null;
    @property(cc.Sprite)
    avatar: cc.Sprite = null;
    @property
    userId: string = '';

    onLoad() {
        this.node.setPosition(0,0);
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

    start() {

    }

    // update (dt) {}
}
