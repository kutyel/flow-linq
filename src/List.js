/**
 * @flow
 *
 * JavaScript implementation of LinQ with flow annotations!
 *
 * Documentation from LinQ .NET specification
 * (https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)
 *
 * Created by Flavio Corpa (@kutyel)
 * Copyright © 2016 Flavio Corpa. All rights reserved.
 *
 */

import OrderedList from './OrderedList';
import { comparerForKey } from './helpers';

class List<T> {

    _elements: T[];

    /**
     * Defaults the elements of the list
     */
    constructor(elements: T[] = []) {
        this._elements = elements;
    }

    /**
     * Adds an object to the end of the List<T>.
     */
    add(element: T): void {
        this._elements.push(element);
    }

    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    addRange(elements: T[]): void {
        this._elements.push(...elements);
    }

    /**
     * Applies an accumulator function over a sequence.
     */
    aggregate<U>(
        accumulator: (accum: U, value: T, index: number, list: T[]) => U,
        initialValue: U
    ): U {
        return this._elements.reduce(accumulator, initialValue);
    }

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    all(
        predicate: (value: T, index?: number, list?: T[]) => boolean
    ): boolean {
        return this._elements.every(predicate);
    }

    /**
     * Determines whether a sequence contains any elements.
     */
    any(
        predicate: (value: T, index?: number, list?: T[]) => boolean
    ): boolean {
        return this._elements.some(predicate);
    }

    /**
     * Computes the average of a sequence of number values that are obtained by
     * invoking a transform function on each element of the input sequence.
     */
    average(
        transform?: (value: T, index?: number, list?: T[]) => any
    ): number {
        return this.sum(transform) / this.count(transform);
    }

    /**
     * Concatenates two sequences.
     */
    concat(list: List<T>): List<T> {
        return new List(this._elements.concat(list.toArray()));
    }

    /**
     * Determines whether an element is in the List<T>.
     */
    contains(element: T): boolean {
        return this._elements.includes(element);
    }

    /**
     * Returns the number of elements in a sequence.
     */
    count(
        predicate?: (value: T, index?: number, list?: T[]) => boolean
    ): number {
        return predicate ?
            this.where(predicate).count() :
            this._elements.length;
    }

    /**
     * Returns the elements of the specified sequence or the type parameter's
     * default value in a singleton collection if the sequence is empty.
     */
    defaultIfEmpty(defaultValue: T): List<T> {
        return this.count() ? this : new List([defaultValue]);
    }

    /**
     * Returns distinct elements from a sequence by using the default equality
     * comparer to compare values.
     */
    distinct(): List<T> {
        return this.where((value, index, iter) =>
            iter.indexOf(value) === index);
    }

    /**
     * Returns the element at a specified index in a sequence.
     */
    elementAt(index: number): T {
        return this._elements[index];
    }

    /**
     * Returns the element at a specified index in a sequence or a default
     * value if the index is out of range.
     */
    elementAtOrDefault(index: number): T | void {
        return this.elementAt(index) || undefined;
    }

    /**
     * Produces the set difference of two sequences by using the default
     * equality comparer to compare values.
     */
    except(source: List<T>): List<T> {
        return this.where(x => !source.contains(x));
    }

    /**
     * Returns the first element of a sequence.
     */
    first(predicate?: (value: T, index?: number, list?: T[]) => boolean): T {
        return predicate ? this.where(predicate).first() : this._elements[0];
    }

    /**
     * Returns the first element of a sequence, or a default value if
     * the sequence contains no elements.
     */
    firstOrDefault(
        predicate?: (value?: T, index?: number, list?: T[]) => boolean
    ): T | void {
        return this.count() ? this.first(predicate) : undefined;
    }

    /**
     * Performs the specified action on each element of the List<T>.
     */
    forEach(action: (value: T, index: number, list: T[]) => void): void {
        return this._elements.forEach(action);
    }

    /**
     * Groups the elements of a sequence according to a specified key
     * selector function.
     */
    groupBy(grouper: (key: T) => any, mapper: (element: T) => any): any {
        return this.aggregate((ac, v) =>
            ((ac)[grouper(v)] ?
                (ac)[grouper(v)].push(mapper(v)) :
                (ac)[grouper(v)] = [mapper(v)], ac), {});
    }

    /**
     * Correlates the elements of two sequences based on equality of keys and
     * groups the results.
     * The default equality comparer is used to compare keys.
     */
    groupJoin<U>(
        list: List<U>,
        key1: (k: T) => any,
        key2: (k: any) => any,
        result: (first: T, second: List<U>) => any
    ): List<any> {
        return this.select(x =>
            result(x, list.where(z => key1(x) === key2(z))));
    }

    /**
     * Returns the index of the first occurence of an element in the List.
     */
    indexOf(element: T): number {
        return this._elements.indexOf(element);
    }

    /**
     * Inserts an element into the List<T> at the specified index.
     */
    insert(index: number, element: T): void {
        if (index < 0 || index > this.count()) {
            throw new Error('Index is out of range.');
        }

        this._elements.splice(index, 0, element);
    }

    /**
     * Produces the set intersection of two sequences by using the default
     * equality comparer to compare values.
     */
    intersect(source: List<T>): List<T> {
        return this.where(x => source.contains(x));
    }

    /**
     * Correlates the elements of two sequences based on matching keys.
     * The default equality comparer is used to compare keys.
     */
    join<U>(
        list: List<U>,
        key1: (key: T) => any,
        key2: (key: U) => any,
        result: (first: T, second: U) => any
    ): List<any> {
        return this.selectMany(x => list.where(y => key2(y) === key1(x))
            .select(z => result(x, z)));
    }

    /**
     * Returns the last element of a sequence.
     */
    last(predicate?: (value: T, index?: number, list?: T[]) => boolean): T {
        return predicate ?
            this.where(predicate).last() :
            this._elements[this.count() - 1];
    }

    /**
     * Returns the last element of a sequence, or a default value if the
     * sequence contains no elements.
     */
    lastOrDefault(
        predicate?: (value?: T, index?: number, list?: T[]) => boolean
    ): T | void {
        return this.count() ? this.last(predicate) : undefined;
    }

    /**
     * Returns the maximum value in a generic sequence.
     * @param {(value: T) => number} comp Comparator function
     */
    max(comp?: (value: T) => number = x => Number(x)): T {
        return this._elements.reduce((x, y) => comp(x) > comp(y) ? x : y);
    }

    /**
     * Returns the minimum value in a generic sequence.
     * @param {(value: T) => number} comp Comparator function
     */
    min(comp?: (value: T) => number = x => Number(x)): T {
        return this._elements.reduce((x, y) => comp(x) < comp(y) ? x : y);
    }

    /**
     * Sorts the elements of a sequence in ascending order
     * according to a key.
     */
    orderBy(keySelector: (key: T) => any): List<T> {
        return new OrderedList(
            this._elements,
            comparerForKey(keySelector, false)
        );
    }

    /**
     * Sorts the elements of a sequence in descending order according to a key.
     */
    orderByDescending(keySelector: (key: T) => any): List<T> {
        return new OrderedList(
            this._elements,
            comparerForKey(keySelector, true)
        );
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in
     * ascending order according to a key.
     */
    thenBy(keySelector: (key: T) => any): List<T> {
        return this.orderBy(keySelector);
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in
     * descending order, according to a key.
     */
    thenByDescending(keySelector: (key: T) => any): List<T> {
        return this.orderByDescending(keySelector);
    }

    /**
     * Removes the first occurrence of a specific object from the List<T>.
     */
    remove(element: T): boolean {
        return this.indexOf(element) !== -1 ?
            (this.removeAt(this.indexOf(element)), true) : false;
    }

    /**
     * Removes all the elements that match the conditions defined by the
     * specified predicate.
     */
    removeAll(
        predicate: (value: T, index?: number, list?: T[]) => boolean
    ): List<T> {
        return this.where(this._negate(predicate));
    }

    /**
     * Removes the element at the specified index of the List<T>.
     */
    removeAt(index: number): void {
        this._elements.splice(index, 1);
    }

    /**
     * Reverses the order of the elements in the entire List<T>.
     */
    reverse(): List<T> {
        return new List(this._elements.reverse());
    }

    /**
     * Projects each element of a sequence into a new form.
     */
    select(mapper: (value: T, index: number, list?: T[]) => any): List<any> {
        return new List(this._elements.map(mapper));
    }

    /**
     * Projects each element of a sequence to a List<any> and flattens the
     * resulting sequences into one sequence.
     */
    selectMany(
        mapper: (value: T, index?: number, list?: T[]) => any
    ): List<any> {
        return this.aggregate((ac, v, i) =>
            (ac.addRange(this.select(mapper).elementAt(i).toArray()), ac),
            new List());
    }

    /**
     * Determines whether two sequences are equal by comparing the elements by
     * using the default equality comparer for their type.
     */
    sequenceEqual(list: List<T>): boolean {
        return !!this.aggregate((accum, elem, index) =>
            list.elementAt(index) === elem && accum, true);
    }

    /**
     * Returns the only element of a sequence, and throws an exception if there
     *  is not exactly one element in the sequence.
     */
    single(): T | void {
        const ERROR = 'The collection does not contain exactly one element.';
        if (this.count() !== 1) {
            throw new Error(ERROR);
        } else {
            return this.first();
        }
    }

    /**
     * Returns the only element of a sequence, or a default value if the
     * sequence is empty; this method throws an exception if there is more than
     * one element in the sequence.
     */
    singleOrDefault(): T | void {
        return this.count() ? this.single() : undefined;
    }

    /**
     * Bypasses a specified number of elements in a sequence and then returns
     * the remaining elements.
     */
    skip(amount: number): List<T> {
        return new List(this._elements.slice(Math.max(0, amount)));
    }

    /**
     * Bypasses elements in a sequence as long as a specified condition is true
     * and then returns the remaining elements.
     */
    skipWhile(
        predicate: (value: T, index?: number, list?: T[]) => boolean
    ): List<T> {
        return this.skip(this.aggregate(x =>
            predicate(this.elementAt(x)) ? ++x : x, 0));
    }

    /**
     * Computes the sum of the sequence of number values that are obtained by
     * invoking a transform function on each element of the input sequence.
     */
    sum(
        transform?: (value: T, index?: number, list?: T[]) => number
    ): number {
        return transform ? this.select(transform).sum() :
            this.aggregate((ac, v) => ac + Number(v), 0);
    }

    /**
     * Returns a specified number of contiguous elements from the start of a
     * sequence.
     */
    take(amount: number): List<T> {
        return new List(this._elements.slice(0, Math.max(0, amount)));
    }

    /**
     * Returns elements from a sequence as long as a specified condition is
     * true.
     */
    takeWhile(
        predicate: (value?: T, index?: number, list?: T[]) => boolean
    ): List<T> {
        return this.take(this.aggregate((x) =>
            predicate(this.elementAt(x)) ? ++x : x, 0));
    }

    /**
     * Copies the elements of the List<T> to a new array.
     */
    toArray(): T[] {
        return this._elements;
    }

    /**
     * Creates a Dictionary<TKey,TValue> from a List<T> according to a
     * specified key selector function.
     */
    toDictionary<TKey, TValue>(
        key: (key: T) => TKey,
        value?: (value: T) => TValue
    ): any {
        return this.aggregate((o, v, i) =>
            ((o)[this.select(key).elementAt(i)] = value ?
                this.select(value).elementAt(i) : v, o), {});
    }

    /**
     * Creates a List<T> from an Enumerable.List<T>.
     */
    toList(): List<T> {
        return this;
    }

    /**
     * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to
     * specified key selector and element selector functions.
     */
    toLookup(
        keySelector: (key: T) => any,
        elementSelector: (element: T) => any
    ): any {
        return this.groupBy(keySelector, elementSelector);
    }

    /**
     * Produces the set union of two sequences by using the default equality
     * comparer.
     */
    union(list: List<T>): List<T> {
        return this.concat(list).distinct();
    }

    /**
     * Filters a sequence of values based on a predicate.
     */
    where(
        predicate: (value: T, index: number, list: T[]) => boolean
    ): List<T> {
        return new List(this._elements.filter(predicate));
    }

    /**
     * Applies a specified function to the corresponding elements of two
     * sequences, producing a sequence of the results.
     */
    zip<U>(list: List<U>, result: (first: T, second: U) => any): List<any> {
        return list.count() < this.count() ? list.select((x, y) =>
            result(this.elementAt(y), x)) :
            this.select((x, y) => result(x, list.elementAt(y)));
    }

    /**
     * Creates a function that negates the result of the predicate
     */
    _negate(predicate: (value: T, index?: number, list?: T[]) => boolean) {
        return function (): boolean {
            return !predicate.apply(this, arguments);
        };
    }
}

export default List;
