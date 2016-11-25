"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compare = compare;
exports.comparerForKey = comparerForKey;
exports.composeComparers = composeComparers;


/**
 *
 * @param a
 * @param b
 * @param _keySelector
 * @param descending
 * @returns {number}
 */
function compare(a, b, _keySelector, descending) {
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
function comparerForKey(_keySelector, descending) {
    return function (a, b) {
        return compare(a, b, _keySelector, descending);
    };
}

/**
 *
 * @param previousComparer
 * @param currentComparer
 * @returns {function(T=, T=): *}
 */
function composeComparers(previousComparer, currentComparer) {
    return function (a, b) {
        return previousComparer(a, b) || currentComparer(a, b);
    };
}