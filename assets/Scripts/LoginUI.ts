import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginUI extends cc.Component {

    @property(cc.Node)
    loginForm: cc.Node = null
    @property(cc.Node)
    registerForm: cc.Node = null;

    @property(cc.EditBox)
    userName: cc.EditBox = null;
    @property(cc.EditBox)
    passwd: cc.EditBox = null;
    @property(cc.EditBox)
    displayName: cc.EditBox = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.registerForm.active = false;
    }
    changeForm(e, form){
        if (form == 1){
            this.loginForm.active = true
            this.registerForm.active = false;
        }else {
            this.loginForm.active = false
            this.registerForm.active = true;
        }

    }

    start () {

    }
    onLogin(){
        const username = this.loginForm.getChildByName("Username").getComponent(cc.EditBox).string
        const pwd = this.loginForm.getChildByName("Password").getComponent(cc.EditBox).string
        Player.Instance.Login(username, pwd)
    }
    onRegister(){
        const username = this.registerForm.getChildByName("Username").getComponent(cc.EditBox).string
        const pwd = this.registerForm.getChildByName("Password").getComponent(cc.EditBox).string
        const displayName = this.registerForm.getChildByName("Displayname").getComponent(cc.EditBox).string
        Player.Instance.Register(username, pwd, displayName)
    }


    // update (dt) {}
}
