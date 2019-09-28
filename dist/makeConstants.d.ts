export interface IConstants extends Map<string, symbol> {
}
/**
 * Outputs a Map of string as keys and Symbols as it's values. For eg
 * {
 *    foo: Symbol('bar'),
 *    baz: Symbol('bax'),
 * }
 * @param constants [['foo', 'bar'], ['baz', 'bax']]
 */
export declare const makeConstantsWithKeys: (constants: string[][]) => IConstants;
/**
 * Outputs a Map of string as keys and Symbols as it's values. For eg
 * {
 *    foo: Symbol('foo'),
 *    bar: Symbol('bar'),
 * }
 * @param constants ['foo', 'bar']
 */
export declare const makeConstants: (constants: string[]) => IConstants;
