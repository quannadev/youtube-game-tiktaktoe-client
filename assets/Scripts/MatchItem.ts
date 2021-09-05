import {RoomInfo} from "./Rooms/RoomType";
import RotateMode = sp.spine.RotateMode;
import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MatchItem extends cc.Component {

    @property(cc.Label)
    RomId: cc.Label = null;
    @property(cc.Label)
    Players: cc.Label = null;
    @property(cc.Button)
    joinBtn: cc.Button = null

    private roomInfo: RoomInfo = null

    onLoad() {
    }

    setData(data: RoomInfo) {
        this.roomInfo = data;
        this.RomId.string = `ID: ${data.RoomId}`
        this.Players.string = `Players: ${data.Players.length}`;
        this.joinBtn.node.active = data.Players.length < 2;
    }

    start() {

    }

    onClickJoin() {
        console.log(this.roomInfo.RoomId, "Join room")
        Player.Instance.JoinRoom(this.roomInfo.RoomId, "")
    }

    // update (dt) {}
}
