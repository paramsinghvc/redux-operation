import { IAction, IActionFactory } from "./types";
export * from "./augmentReducer";
export * from "./types";
export * from "./makeConstants";
export declare const createActionWithPayload: <T extends string | symbol, P>(type: T) => (payload?: P) => IAction<T, P>;
export interface IReduxOperations<T = any> {
    pending: boolean;
    success: boolean;
    failure: boolean;
    errors: any;
    payload: T;
}
export declare enum actionFlags {
    REQUEST = "REQUEST",
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE",
    CLEAR = "CLEAR"
}
export declare const createReduxOperation: (actionName: string) => {
    constants: import("./types").IConstants;
    actions: IActionFactory<symbol, unknown>[];
    reducer: (state: IReduxOperations<any>, { type, payload }: {
        type: any;
        payload?: any;
    }) => IReduxOperations<any>;
};
