import {IUser} from "../UserProfile";

export enum RoomType {
    Lobby,
    Battle
}

export interface RoomInfo {
    RoomType: RoomType;
    Players: IUser[];
}