import {IUser} from "../UserProfile";

export enum RoomType {
    Lobby,
    Battle
}

export interface RoomInfo {
    OwnerId: string;
    RoomId: string;
    RoomType: RoomType;
    Players: IUser[];
}