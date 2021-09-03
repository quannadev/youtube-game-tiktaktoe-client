const {ccclass, property} = cc._decorator;

export interface IUser {
    DisplayName: string;
    Avatar?: string;
    Level: number;
    Amount: number;
}

@ccclass
export default class UserProfile extends cc.Component {

    @property(cc.Label)
    displayName: cc.Label = null;

    @property
    userId: string = '';

    SetData(data: IUser) {
        this.displayName.string = data.DisplayName;
    }

    start() {

    }

    // update (dt) {}
}
