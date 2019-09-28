import { IAction } from "./types";
import { IReducer } from "./";

export const augmentReducer = <S, A extends IAction<symbol | string, any>>(
  rootReducer: IReducer<any, A>
) => (reducers: { [k: string]: IReducer<any, A> }) => {
  return (state: S | undefined, action: A): S => {
    let nextState: S = rootReducer(state, action);
    let hasNestedStateChanged = false;
    for (const [key, reducer] of Object.entries(reducers)) {
      const prevState = nextState[key];

      const nextStateForKey = reducer(state && state[key], action);
      if (prevState !== nextStateForKey) {
        hasNestedStateChanged = true;
      }
      nextState[key] = nextStateForKey;
    }
    return hasNestedStateChanged ? { ...nextState } : nextState;
  };
};
