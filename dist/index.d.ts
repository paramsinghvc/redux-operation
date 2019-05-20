import { IConstants, IAction, IActionCreator } from './types';
export * from './augmentReducer';
export * from './types';
export declare const createActionWithPayload: IActionCreator<Symbol | string, any>;
/**
 * Outputs a Map of string as keys and Symbol | strings as it's values. For eg
 * {
 *    foo: Symbol('bar'),
 *    baz: Symbol('bax'),
 * }
 * @param constants [['foo', 'bar'], ['baz', 'bax']]
 */
export declare const makeConstantsWithKeys: (constants: string[][]) => IConstants;
export interface IReduxOperations {
    pending: boolean;
    success: boolean;
    failure: boolean;
    errors: any;
}
export declare enum actionFlags {
    REQUEST = "REQUEST",
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}
declare const createReduxOperation: (actionName: string) => {
    constants: IConstants;
    actions: ((payload?: any) => IAction<string | Symbol, any>)[];
    reducer: (state: IReduxOperations, { type, payload }: {
        type: any;
        payload?: any;
    }) => IReduxOperations;
};
export default createReduxOperation;
