import { IConstants } from "./types";

/**
 * Outputs a Map of string as keys and Symbols as it's values. For eg
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
  }, new Map<string, symbol>());

/**
 * Outputs a Map of string as keys and Symbols as it's values. For eg
 * {
 *    foo: Symbol('foo'),
 *    bar: Symbol('bar'),
 * }
 * @param constants ['foo', 'bar']
 */
export const makeConstants = (constants: string[]): IConstants =>
  constants.reduce((constantsMap: IConstants, constant: string) => {
    constantsMap.set(constant, Symbol(constant));
    return constantsMap;
  }, new Map<string, symbol>());
