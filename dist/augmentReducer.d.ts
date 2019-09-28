import { IAction } from "./types";
import { IReducer } from "./";
export declare const augmentReducer: <S, A extends IAction<string | symbol, any>>(rootReducer: IReducer<any, A>) => (reducers: {
    [k: string]: IReducer<any, A>;
}) => (state: S, action: A) => S;
