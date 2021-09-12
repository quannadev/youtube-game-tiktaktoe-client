import Pixel, {PixelType} from "./Pixel";
import UserProfile, {IUser} from "../UserProfile";
import Player from "../Player";
import {GameInfoData, GameOverData, ITurn, MatchStatus} from "./GameInfoData";
import {PlaceData} from "./RoomType";
import GameOverPopup, {IGameOver} from "./GameOverPopup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Match extends cc.Component {

    @property(cc.Node)
    boardGrid: cc.Node = null;
    @property(cc.Node)
    boardNode: cc.Node = null;
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
    @property(cc.Label)
    turnId: cc.Label = null
    @property(cc.Node)
    boardOverLay: cc.Node = null
    @property(cc.Button)
    btnStartGame: cc.Button = null;

    private boardSize = cc.v2(10, 10);
    private matchId: string = ""
    private OwnerId: string = ""
    private targetInfo: IUser = null;
    private matchStatus: MatchStatus = MatchStatus.Init
    private timeCount: number = 0;

    onLoad() {
        this.initBoard()
    }

    start() {
        this.InitMatchInfo()
    }

    private initBoard() {
        this.boardGrid.removeAllChildren();
        for (let row = 0; row < this.boardSize.x; row++) {
            const colBoard = Array.of<PixelType>();
            for (let col = 0; col < this.boardSize.y; col++) {
                const pixel = cc.instantiate(this.pixelNode);
                pixel.getComponent(Pixel).setData(row, col)
                this.boardGrid.addChild(pixel);
                colBoard.push(PixelType.None)
            }
        }
    }

    private InitProfile(userInfo: IUser) {
        const profile = cc.instantiate(this.userProfileNode);
        profile.getComponent(UserProfile).SetData(userInfo, false);
        profile.setContentSize(120, 120)
        const isMe = userInfo.Id == Player.Instance.userInfo.Id;
        if (isMe) {
            Player.Instance.pixelType = userInfo.PixelType;
            this.meNode.removeAllChildren();
            this.meNode.addChild(profile);
            return
        }
        this.targetNode.removeAllChildren();
        this.targetNode.addChild(profile);
        this.targetInfo = userInfo;
    }

    private InitMatchInfo() {
        const players = Player.Instance.roomData.Players;
        players.forEach(user => {
            this.InitProfile(user)
        })
        this.matchId = Player.Instance.roomData.RoomId;
        this.roomId.string = `ID: ${this.matchId}`;
        this.OwnerId = Player.Instance.roomData.OwnerId
    }

    onUserExitMatch() {
        Player.Instance.ExitMatch();
    }
    private resetMatch(){
        this.initBoard();
        const popupGameOver = this.boardNode.getChildByName('GameOver');
        if (popupGameOver){
            this.boardNode.removeChild(popupGameOver);
        }
    }

    onUserStartGame() {
        if (Player.Instance.userInfo.Id != this.OwnerId) {
            console.log("Không phải chủ phòng")
            return
        }
        Player.Instance.StartGame()
    }

    onGameStart(data: GameInfoData) {
        if (this.matchStatus == MatchStatus.GameOver){
            this.resetMatch()
        }
        this.matchStatus = data.MatchStatus
        this.timeCount = data.TimeCount
        this.boardOverLay.active = false;
        this.btnStartGame.node.active = false;

    }

    onTurn(data: ITurn) {
        this.turnId.string = `Lượt: ${data.Turn}`;
        const myProfile = this.meNode.children[0];
        const targetProfile = this.targetNode.children[0];
        if (data.PlayerId == Player.Instance.userInfo.Id) {
            myProfile.getComponent(UserProfile).StartTimer(data.TimerCount)
            targetProfile.getComponent(UserProfile).StopTimer()
        } else {
            targetProfile.getComponent(UserProfile).StartTimer(data.TimerCount)
            myProfile.getComponent(UserProfile).StopTimer()
        }
    }

    // update (dt) {}
    SetPlace(data: PlaceData) {
        for (let p = 0; p < this.boardGrid.children.length; p++) {
            const tempNode = this.boardGrid.children[p].getComponent(Pixel);
            if (tempNode.row == data.Row && tempNode.col == data.Col) {
                tempNode.setData(tempNode.row, tempNode.col, data.PixelType);
                break
            }
        }
    }

    GameOver(data: GameOverData) {
        const myProfile = this.meNode.children[0];
        const targetProfile = this.targetNode.children[0];
        targetProfile.getComponent(UserProfile).StopTimer()
        myProfile.getComponent(UserProfile).StopTimer()
        let Winner = Player.Instance.userInfo;
        this.matchStatus = MatchStatus.GameOver;
        if (data.WinnerId != Winner.Id) {
            Winner = this.targetInfo;
        }
        this.btnStartGame.node.active = true;
        this.btnStartGame.node.getChildByName('Background')
            .getChildByName('Label')
            .getComponent(cc.Label).string = 'Reset Game'
        cc.resources.load<cc.Prefab>('prefabs/GameOver', (error, asset) => {
            if (error) {
                return
            }
            const popup = cc.instantiate(asset);
            const gameOverData: IGameOver = {
                user: Winner,
                Point: data.Point
            }
            popup.getComponent(GameOverPopup).setData(gameOverData)
            this.boardNode.addChild(popup, 99, 'GameOver');
        })
    }
}
