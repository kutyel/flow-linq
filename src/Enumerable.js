// @flow

import List from './List';

class Enumerable {

    /**
     * Generates a sequence of integer numbers within a specified range.
     *
     * @param {number} start Number to start from.
     * @param {number} count Number of elements to be generated.
     * @returns {List.<number>} Sequence of integers within the specified range.
     */
    static range(start: number, count: number): List<number> {
        let result: List<number> = new List();
        while (count--) result.add(start++); return result;
    }

    /**
     * Generates a sequence that contains one repeated value.
     *
     * @param {T} element Element to be repeated.
     * @param {number} count Number of times to repeat the given element.
     * @returns {List.<T>} Sequence containing repeated value.
     */
    static repeat<T>(element: T, count: number): List<T> {
        let result: List<T> = new List();
        while (count--) result.add(element); return result;
    }
}

export default Enumerable;
