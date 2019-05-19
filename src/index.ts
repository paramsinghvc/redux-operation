import { IConstants, IAction, IActionCreator } from './types';

export const createActionWithPayload: IActionCreator<Symbol | string, any> = <
    T extends Symbol | string,
    P
>(
    type: T
) => (payload?: P): IAction<T, P> => ({
    type,
    payload
});

/**
 * Outputs a Map of string as keys and Symbol | strings as it's values. For eg
 * {
 *    foo: Symbol('bar'),
 *    baz: Symbol('bax'),
 * }
 * @param constants [['foo', 'bar'], ['baz', 'bax']]
 */
export const makeConstantsWithKeys = (constants: string[][]): IConstants =>
    constants.reduce((constantsMap: IConstants, constant: string[]) => {
        const [key, val] = constant;
        constantsMap.set(key, Symbol(val));
        return constantsMap;
    }, new Map<string, Symbol | string>());


const DELIMITER = `_`;

export interface IReduxOperations {
    pending: boolean;
    success: boolean;
    failure: boolean;
    errors: any;
}

export enum actionFlags {
    REQUEST = "REQUEST",
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}

export const createReduxOperation = (actionName: string) => {
    /**
     * Will generate constants map in the form of { SUCCESS: Symbol('FETCH_DATA_SUCCESS') }
     */
    const constants = makeConstantsWithKeys(
        Object.values(actionFlags).map((constant: string) => [
            constant,
            `${actionName}${DELIMITER}${constant}`
        ])
    );

    /**
     * Generate redux actions for corresponding intents like request, success, failure
     */
    const actions = Object.values(actionFlags).map(constant =>
        createActionWithPayload(<Symbol | string>constants.get(constant))
    );

    const initialState: IReduxOperations = {
        pending: false,
        success: false,
        failure: false,
        errors: null
    };

    /**
     * Create a reducer to be combined with the original one in the parent context
     * @param state Redux State holding flags
     * @param action Redux Action
     */
    const reducer = (state = initialState, { type, payload = undefined }) => {
        switch (type) {
            case constants.get(actionFlags.REQUEST):
                return { ...initialState, pending: true };
            case constants.get(actionFlags.SUCCESS):
                return { ...initialState, success: true };
            case constants.get(actionFlags.FAILURE):
                return { ...initialState, failure: true, errors: payload };
            default:
                return state;
        }
    };
    return {
        constants,
        actions,
        reducer
    };
};
