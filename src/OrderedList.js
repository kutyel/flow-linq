// @flow

import List from './List';
import { comparerForKey, composeComparers } from './helpers';

/**
 * Represents a sorted sequence. The methods of this class are implemented by
 * using deferred execution. The immediate return value is an object that
 * stores all the information that is required to perform the action.
 * The query represented by this method is not executed until the object is
 * enumerated either by calling its toDictionary, toLookup, toList or
 * toArray methods
 */
class OrderedList<T> extends List<T> {

    _comparer: (a: T, b: T) => number;

    constructor(elements: T[], comparer: (a: T, b: T) => number) {
        super(elements);
        this._comparer = comparer;
        this._elements.sort(this._comparer);
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in
     * ascending order according to a key.
     *
     * @override
     * @param keySelector
     * @returns {OrderedList}
     */
    thenBy(keySelector: (key: T) => any): List<T> {
        return new OrderedList(
            this._elements, composeComparers(
                this._comparer,
                comparerForKey(keySelector, false)
            )
        );
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in
     * descending order, according to a key.
     *
     * @override
     * @param keySelector
     * @returns {OrderedList}
     */
    thenByDescending(keySelector: (key: T) => any): List<T> {
        return new OrderedList(
            this._elements,
            composeComparers(this._comparer,
                comparerForKey(keySelector, true)
            )
        );
    }
}

export default OrderedList;
