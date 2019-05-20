import { IAction, IReducer } from './types';

export const augmentReducer = <S, A extends IAction<Symbol | string, any>>(
    rootReducer: IReducer<any, A>
) => (reducers: { [k: string]: IReducer<any, A> }) => {
    return (state: S, action: A) => {
        const nextState = {};
        const nextRootState = rootReducer(state, action);
        Object.assign(nextState, nextRootState);
        for (const [key, reducer] of Object.entries(reducers)) {
            const nextStateForKey = reducer(state && state[key], action);
            nextState[key] = nextStateForKey;
        }
        return nextState;
    };
};
