import UserProfile from "./UserProfile";
import Player from "./Player";
import {RoomInfo} from "./Rooms/RoomType";
import MatchItem from "./MatchItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Lobby extends cc.Component {

    @property(UserProfile)
    userProfile: UserProfile = null;
    @property(cc.Node)
    listRoomNode: cc.Node = null;
    @property(cc.Prefab)
    matchItem: cc.Prefab = null

    onLoad() {
    }

    start() {
        this.userProfile.SetData(Player.Instance.userInfo)
    }

    onUserClickCreateRoom() {
        Player.Instance.CreateRoom();
    }

    update(dt) {
    }

    SetListMatch(data: RoomInfo[]) {
        this.listRoomNode.removeAllChildren();
        data.forEach(item => {
            const match = cc.instantiate(this.matchItem);
            match.getComponent(MatchItem).setData(item);
            this.listRoomNode.addChild(match);
        })
    }
}
