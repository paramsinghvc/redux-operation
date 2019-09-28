export type IReducer<S, A extends IAction<symbol | string, any>> = (
  state: S,
  action: A
) => S;

export interface IConstants extends Map<string, symbol | string> {}

export interface IKeyValueType {
  value: string;
  displayName: string;
  hintText?: string;
}

export interface IAction<T extends symbol | string, P = any> {
  type: T;
  payload?: P;
}

export type IActionFactory<T extends string | symbol, P> = (
  payload?: P
) => IAction<T, P>;

export type IActionCreator<T extends symbol | string, P = any> = (
  type: T
) => (payload?: P) => IAction<T, P>;

export type IActionCreatorWithPayloadCreator<
  T extends symbol | string,
  P,
  R
> = (
  type: T,
  payloadCreator: (payload: P) => R
) => (payload?: P) => IAction<T, R>;

export interface IObject<T> {
  [key: string]: T;
}
