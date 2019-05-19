export interface IAction<T extends Symbol | string, P = any> {
    type: T;
    payload?: P;
}

export type IReducer<S, A extends IAction<Symbol | string, any>> = (
    state: S,
    action: A
) => S;

export type IActionCreator<T extends Symbol | string, P = any> = (
    type: T
) => (payload?: P) => IAction<T, P>;

export interface IConstants extends Map<string, Symbol | string> { }