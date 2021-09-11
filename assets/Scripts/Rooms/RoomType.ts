import {IUser} from "../UserProfile";
import {PixelType} from "./Pixel";

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
export interface PlaceData {
    Row: number;
    Col: number;
    PixelType: PixelType
}