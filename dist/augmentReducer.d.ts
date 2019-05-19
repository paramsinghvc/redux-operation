import { IAction, IReducer } from './types';
export declare const augmentReducer: <S, A extends IAction<string | Symbol, any>>(rootReducer: IReducer<any, A>) => (reducers: {
    [k: string]: IReducer<any, A>;
}) => (state: S, action: A) => {};
