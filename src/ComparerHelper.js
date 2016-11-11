// @flow

class ComparerHelper {

    /**
     *
     * @param _keySelector
     * @param descending
     * @returns {function(T=, T=): number}
     */
    static comparerForKey<T>(_keySelector: (key: T) => any, descending?: boolean): (a: T, b: T) => number {
        return (a: T, b: T) => this.compare(a, b, _keySelector, descending);
    }

    /**
     *
     * @param a
     * @param b
     * @param _keySelector
     * @param descending
     * @returns {number}
     */
    static compare<T>(a: T, b: T, _keySelector: (key: T) => any, descending?: boolean): number {
        return _keySelector(a) > _keySelector(b) ? !descending ? 1 : -1 :
            _keySelector(a) < _keySelector(b) ?!descending ? -1 : 1 : 0;
    }

    /**
     *
     * @param previousComparer
     * @param currentComparer
     * @returns {function(T=, T=): *}
     */
    static composeComparers<T>(
        previousComparer: (a: T, b: T) => number,
        currentComparer: (a: T, b: T) => number
    ): (a: T, b: T) => number {
        return (a: T, b: T) => previousComparer(a, b) || currentComparer(a, b);
    }
}

export default ComparerHelper;
