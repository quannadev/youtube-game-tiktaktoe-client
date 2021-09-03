import UserProfile from "./UserProfile";
import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Lobby extends cc.Component {

    @property(UserProfile)
    userProfile: UserProfile = null;

    onLoad () {}

    start () {
        this.userProfile.SetData(Player.Instance.userInfo)
    }
    onUserClickCreateRoom(){
        Player.Instance.CreateRoom();
    }

    update (dt) {}
}
