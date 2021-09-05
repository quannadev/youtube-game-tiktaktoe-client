import Pixel from "./Pixel";
import UserProfile, {IUser} from "../UserProfile";
import Player from "../Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Match extends cc.Component {

    @property(cc.Node)
    boardGrid: cc.Node = null;
    @property(cc.Prefab)
    pixelNode: cc.Prefab = null
    @property(cc.Prefab)
    userProfileNode: cc.Prefab = null
    @property(cc.Node)
    meNode: cc.Node = null
    @property(cc.Node)
    targetNode: cc.Node = null
    @property(cc.Label)
    roomId: cc.Label = null

    private boardSize = cc.v2(10, 10);
    private matchId: string = ""

    onLoad() {
        this.initBoard()
    }

    start() {
        this.InitMatchInfo()
    }

    private initBoard() {
        this.boardGrid.removeAllChildren();
        for (let row = 0; row < this.boardSize.x; row++) {
            for (let col = 0; col < this.boardSize.y; col++) {
                const pixel = cc.instantiate(this.pixelNode);
                pixel.getComponent(Pixel).setData(row, col)
                this.boardGrid.addChild(pixel);
            }
        }
    }

    private InitProfile(userInfo: IUser) {
        const profile = cc.instantiate(this.userProfileNode);
        profile.getComponent(UserProfile).SetData(userInfo, false);
        profile.setContentSize(120, 120)
        const isMe = userInfo.Id == Player.Instance.userInfo.Id;
        if (isMe) {
            this.meNode.removeAllChildren();
            this.meNode.addChild(profile);
            return
        }
        this.targetNode.removeAllChildren();
        this.targetNode.addChild(profile);
    }

    private InitMatchInfo() {
        const players = Player.Instance.roomData.Players;
        players.forEach(user => {
            this.InitProfile(user)
        })
        this.matchId = Player.Instance.roomData.RoomId;
        this.roomId.string = `ID: ${this.matchId}`;
    }

    // update (dt) {}
}
