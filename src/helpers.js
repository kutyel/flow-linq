// @flow

/**
 *
 * @param a
 * @param b
 * @param _keySelector
 * @param descending
 * @returns {number}
 */
export function compare<T>(
  a: T,
  b: T,
  _keySelector: (key: T) => any,
  descending?: boolean
): number {
  if (_keySelector(a) > _keySelector(b)) {
    return !descending ? 1 : -1;
  } else if (_keySelector(a) < _keySelector(b)) {
    return !descending ? -1 : 1;
  } else {
    return 0;
  }
}

/**
 *
 * @param _keySelector
 * @param descending
 * @returns {function(T=, T=): number}
 */
export function comparerForKey<T>(
  _keySelector: (key: T) => any,
  descending?: boolean
): (a: T, b: T) => number {
  return (a: T, b: T) => compare(a, b, _keySelector, descending);
}

/**
 *
 * @param previousComparer
 * @param currentComparer
 * @returns {function(T=, T=): *}
 */
export function composeComparers<T>(
  previousComparer: (a: T, b: T) => number,
  currentComparer: (a: T, b: T) => number
): (a: T, b: T) => number {
  return (a: T, b: T) => previousComparer(a, b) || currentComparer(a, b);
}
