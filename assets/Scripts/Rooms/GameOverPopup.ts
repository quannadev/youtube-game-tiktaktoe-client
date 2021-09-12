import UserProfile, {IUser} from "../UserProfile";

const {ccclass, property} = cc._decorator;

export interface IGameOver {
    user: IUser;
    Point: number;
}

@ccclass
export default class GameOverPopup extends cc.Component {

    @property(cc.Label)
    PName: cc.Label = null;
    @property(cc.Label)
    Point: cc.Label = null;
    @property(cc.Node)
    profileNode: cc.Node = null
    @property(cc.Prefab)
    avatar: cc.Prefab = null

    // onLoad () {}

    setData(data: IGameOver) {
        this.PName.string = data.user.DisplayName
        this.Point.string = `Point: ${data.Point}`
        const avatarNode = cc.instantiate(this.avatar);
        avatarNode.getComponent(UserProfile).SetData(data.user, false);
        this.profileNode.addChild(avatarNode)
    }

    start() {

    }

    // update (dt) {}
}
