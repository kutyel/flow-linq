// @flow

import List from './List';
import Helper from './ComparerHelper';

/**
 * Represents a sorted sequence. The methods of this class are implemented by using deferred execution.
 * The immediate return value is an object that stores all the information that is required to perform the action.
 * The query represented by this method is not executed until the object is enumerated either by
 * calling its toDictionary, toLookup, toList or toArray methods
 */
class OrderedList<T> extends List<T> {

    constructor(elements: T[], _comparer: (a: T, b: T) => number) {
        super(elements);
        this._elements.sort(_comparer);
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     *
     * @override
     * @param keySelector
     * @returns {OrderedList}
     */
    thenBy(keySelector: (key: T) => any): List<T> {
        return new OrderedList(
            this._elements,
            Helper.composeComparers(this._comparer, Helper.comparerForKey(keySelector, false))
        );
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
     *
     * @override
     * @param keySelector
     * @returns {OrderedList}
     */
    thenByDescending(keySelector: (key: T) => any): List<T> {
        return new OrderedList(
            this._elements,
            Helper.composeComparers(this._comparer, Helper.comparerForKey(keySelector, true))
        );
    }
}

export default OrderedList;
