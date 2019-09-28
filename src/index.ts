import { IAction, IActionFactory } from "./types";
import { makeConstantsWithKeys } from "./makeConstants";

export * from "./augmentReducer";
export * from "./types";

export const createActionWithPayload = <T extends symbol | string, P>(
  type: T
) => (payload?: P): IAction<T, P> => ({
  type,
  payload
});

const DELIMITER = `_`;
export interface IReduxOperations<T = any> {
  pending: boolean;
  success: boolean;
  failure: boolean;
  errors: any;
  payload: T;
}

export enum actionFlags {
  REQUEST = "REQUEST",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  CLEAR = "CLEAR"
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
  const actions: Array<IActionFactory<symbol, unknown>> = Object.values(
    actionFlags
  ).map(constant => createActionWithPayload(<symbol>constants.get(constant)));

  const initialState: IReduxOperations = {
    pending: false,
    success: false,
    failure: false,
    errors: null,
    payload: null
  };

  /**
   * Create a reducer to be combined with the original one in the parent context
   * @param state Redux State holding flags
   * @param action Redux Action
   */
  const reducer = (state = initialState, { type, payload = undefined }) => {
    switch (type) {
      case constants.get(actionFlags.REQUEST):
        return { ...state, pending: true, success: false };
      case constants.get(actionFlags.SUCCESS):
        return {
          ...state,
          success: true,
          pending: false,
          payload,
          failure: false,
          errors: null
        };
      case constants.get(actionFlags.FAILURE):
        return {
          ...state,
          failure: true,
          pending: false,
          errors: payload
        };
      case constants.get(actionFlags.CLEAR):
        return { ...initialState };
      //return { ...state, payload: null, errors: null };
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
