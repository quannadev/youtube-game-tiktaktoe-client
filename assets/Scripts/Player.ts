import {IUser} from "./UserProfile";
import {RoomInfo, RoomType} from "./Rooms/RoomType";

const {ccclass, property} = cc._decorator;

export enum WsTags {
    Invalid,
    Login,
    Register,
    UserInfo,
    RoomInfo,
    LobbyInfo,
    CreateRoom,
    QuickPlay
}

export interface WsMessage {
    Tags: WsTags;
    Data: any;
}
export enum GameLayout {
    Login = 'login',
    Lobby = 'lobby',
    Match = 'match',
}

@ccclass
export default class Player extends cc.Component {

    static Instance: Player = null;

    @property()
    wsServer: string = 'ws://localhost:8080'

    @property(cc.Node)
    layoutContent: cc.Node = null;
    @property(cc.Prefab)
    loginLayout: cc.Prefab = null
    @property(cc.Prefab)
    lobbyLayout: cc.Prefab = null
    @property(cc.Prefab)
    matchLayout: cc.Prefab = null
    public userInfo: IUser = null;

    private client: WebSocket = null

    onLoad() {
        this.client = new WebSocket(this.wsServer)
        this.client.onopen = () => {
            console.log('Connected to server')
        }
        this.client.onerror = err => {
            console.error(`Connect server error: ${err}`)
        }
        this.client.onmessage = mess => {
            this.onMessage(mess.data)
        }
        Player.Instance = this;
        this.changeLayout(GameLayout.Login);
    }
    private onMessage(msg: string) {
        const message = JSON.parse(msg) as WsMessage;
        switch (message.Tags) {
            case WsTags.UserInfo:
                this.userInfo = message.Data as IUser
                break;
            case WsTags.RoomInfo:
                const roomData = message.Data as RoomInfo;
                switch (roomData.RoomType ) {
                    case RoomType.Lobby:
                        this.changeLayout(GameLayout.Lobby);
                        break
                    case RoomType.Battle:
                        this.changeLayout(GameLayout.Match);
                        break
                }
                break
        }
    }
    private changeLayout(data: GameLayout){
        let targetNode = null;
        this.layoutContent.removeAllChildren()
        switch (data) {
            case GameLayout.Login:
                targetNode = cc.instantiate(this.loginLayout)
                break
            case GameLayout.Lobby:
                targetNode = cc.instantiate(this.lobbyLayout)
                break
            case GameLayout.Match:
                targetNode = cc.instantiate(this.matchLayout)
                break
        }
        this.layoutContent.addChild(targetNode)
    }
    CreateRoom(){
        const createData = {
            "Time": 5,
        }
        const loginMessage: WsMessage = {
            Tags: WsTags.CreateRoom,
            Data: createData
        }
        this.sendMessage(loginMessage);
    }

    Login(username: string, password: string) {
        const loginData = {
            "Username": username,
            "Password": password
        }
        const loginMessage: WsMessage = {
            Tags: WsTags.Login,
            Data: loginData
        }
        this.sendMessage(loginMessage);
    }

    start() {
        Player.Instance = this;
    }

    public sendMessage(msg: WsMessage) {
        this.client.send(JSON.stringify(msg))
    }

    update(dt) {

    }

    Register(username: any, pwd: any, displayName: any) {
        const loginData = {
            "Username": username,
            "Password": pwd,
            "DisplayName": displayName
        }
        const loginMessage: WsMessage = {
            Tags: WsTags.Register,
            Data: loginData
        }
        this.sendMessage(loginMessage);
    }
}
