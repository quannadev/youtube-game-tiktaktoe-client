export interface GameInfoData {
    MatchStatus: MatchStatus;
    TimeCount: number;
}
export enum MatchStatus {
    Init = 1,
    Start,
    GameOver
}
export interface ITurn {
    Id: string;
    PlayerId: string;
    Turn: number;
    Game: number,
    TimerCount: number,
}
export interface GameOverData {
    WinnerId: string;
    Point: number;
}