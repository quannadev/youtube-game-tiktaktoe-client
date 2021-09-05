import {IUser} from "../UserProfile";

export enum RoomType {
    Lobby,
    Battle
}

export interface RoomInfo {
    RoomId: string;
    RoomType: RoomType;
    Players: IUser[];
}