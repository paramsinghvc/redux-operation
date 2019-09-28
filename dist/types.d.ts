export declare type IReducer<S, A extends IAction<symbol | string, any>> = (state: S, action: A) => S;
export interface IConstants extends Map<string, symbol> {
}
export interface IAction<T extends symbol | string, P = any> {
    type: T;
    payload?: P;
}
export declare type IActionFactory<T extends string | symbol, P> = (payload?: P) => IAction<T, P>;
export declare type IActionCreator<T extends symbol | string, P = any> = (type: T) => (payload?: P) => IAction<T, P>;
export declare type IActionCreatorWithPayloadCreator<T extends symbol | string, P, R> = (type: T, payloadCreator: (payload: P) => R) => (payload?: P) => IAction<T, R>;
export interface IObject<T> {
    [key: string]: T;
}
