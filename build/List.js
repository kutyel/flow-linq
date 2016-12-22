'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
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

var _helpers = require('./helpers');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function () {

    /**
     * Defaults the elements of the list
     */
    function List() {
        var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, List);

        this._elements = elements;
    }

    /**
     * Adds an object to the end of the List<T>.
     */


    _createClass(List, [{
        key: 'add',
        value: function add(element) {
            this._elements.push(element);
        }

        /**
         * Adds the elements of the specified collection to the end of the List<T>.
         */

    }, {
        key: 'addRange',
        value: function addRange(elements) {
            var _elements;

            (_elements = this._elements).push.apply(_elements, _toConsumableArray(elements));
        }

        /**
         * Applies an accumulator function over a sequence.
         */

    }, {
        key: 'aggregate',
        value: function aggregate(accumulator, initialValue) {
            return this._elements.reduce(accumulator, initialValue);
        }

        /**
         * Determines whether all elements of a sequence satisfy a condition.
         */

    }, {
        key: 'all',
        value: function all(predicate) {
            return this._elements.every(predicate);
        }

        /**
         * Determines whether a sequence contains any elements.
         */

    }, {
        key: 'any',
        value: function any(predicate) {
            return this._elements.some(predicate);
        }

        /**
         * Computes the average of a sequence of number values that are obtained by
         * invoking a transform function on each element of the input sequence.
         */

    }, {
        key: 'average',
        value: function average(transform) {
            return this.sum(transform) / this.count(transform);
        }

        /**
         * Concatenates two sequences.
         */

    }, {
        key: 'concat',
        value: function concat(list) {
            return new List(this._elements.concat(list.toArray()));
        }

        /**
         * Determines whether an element is in the List<T>.
         */

    }, {
        key: 'contains',
        value: function contains(element) {
            return this._elements.includes(element);
        }

        /**
         * Returns the number of elements in a sequence.
         */

    }, {
        key: 'count',
        value: function count(predicate) {
            return predicate ? this.where(predicate).count() : this._elements.length;
        }

        /**
         * Returns the elements of the specified sequence or the type parameter's
         * default value in a singleton collection if the sequence is empty.
         */

    }, {
        key: 'defaultIfEmpty',
        value: function defaultIfEmpty(defaultValue) {
            return this.count() ? this : new List([defaultValue]);
        }

        /**
         * Returns distinct elements from a sequence by using the default equality
         * comparer to compare values.
         */

    }, {
        key: 'distinct',
        value: function distinct() {
            return this.where(function (value, index, iter) {
                return iter.indexOf(value) === index;
            });
        }

        /**
         * Returns the element at a specified index in a sequence.
         */

    }, {
        key: 'elementAt',
        value: function elementAt(index) {
            return this._elements[index];
        }

        /**
         * Returns the element at a specified index in a sequence or a default
         * value if the index is out of range.
         */

    }, {
        key: 'elementAtOrDefault',
        value: function elementAtOrDefault(index) {
            return this.elementAt(index) || undefined;
        }

        /**
         * Produces the set difference of two sequences by using the default
         * equality comparer to compare values.
         */

    }, {
        key: 'except',
        value: function except(source) {
            return this.where(function (x) {
                return !source.contains(x);
            });
        }

        /**
         * Returns the first element of a sequence.
         */

    }, {
        key: 'first',
        value: function first(predicate) {
            return predicate ? this.where(predicate).first() : this._elements[0];
        }

        /**
         * Returns the first element of a sequence, or a default value if
         * the sequence contains no elements.
         */

    }, {
        key: 'firstOrDefault',
        value: function firstOrDefault(predicate) {
            return this.count() ? this.first(predicate) : undefined;
        }

        /**
         * Performs the specified action on each element of the List<T>.
         */

    }, {
        key: 'forEach',
        value: function forEach(action) {
            return this._elements.forEach(action);
        }

        /**
         * Groups the elements of a sequence according to a specified key
         * selector function.
         */

    }, {
        key: 'groupBy',
        value: function groupBy(grouper, mapper) {
            return this.aggregate(function (ac, v) {
                return ac[grouper(v)] ? ac[grouper(v)].push(mapper(v)) : ac[grouper(v)] = [mapper(v)], ac;
            }, {});
        }

        /**
         * Correlates the elements of two sequences based on equality of keys and
         * groups the results.
         * The default equality comparer is used to compare keys.
         */

    }, {
        key: 'groupJoin',
        value: function groupJoin(list, key1, key2, result) {
            return this.select(function (x) {
                return result(x, list.where(function (z) {
                    return key1(x) === key2(z);
                }));
            });
        }

        /**
         * Returns the index of the first occurence of an element in the List.
         */

    }, {
        key: 'indexOf',
        value: function indexOf(element) {
            return this._elements.indexOf(element);
        }

        /**
         * Inserts an element into the List<T> at the specified index.
         */

    }, {
        key: 'insert',
        value: function insert(index, element) {
            if (index < 0 || index > this.count()) {
                throw new Error('Index is out of range.');
            }

            this._elements.splice(index, 0, element);
        }

        /**
         * Produces the set intersection of two sequences by using the default
         * equality comparer to compare values.
         */

    }, {
        key: 'intersect',
        value: function intersect(source) {
            return this.where(function (x) {
                return source.contains(x);
            });
        }

        /**
         * Correlates the elements of two sequences based on matching keys.
         * The default equality comparer is used to compare keys.
         */

    }, {
        key: 'join',
        value: function join(list, key1, key2, result) {
            return this.selectMany(function (x) {
                return list.where(function (y) {
                    return key2(y) === key1(x);
                }).select(function (z) {
                    return result(x, z);
                });
            });
        }

        /**
         * Returns the last element of a sequence.
         */

    }, {
        key: 'last',
        value: function last(predicate) {
            return predicate ? this.where(predicate).last() : this._elements[this.count() - 1];
        }

        /**
         * Returns the last element of a sequence, or a default value if the
         * sequence contains no elements.
         */

    }, {
        key: 'lastOrDefault',
        value: function lastOrDefault(predicate) {
            return this.count() ? this.last(predicate) : undefined;
        }

        /**
         * Returns the maximum value in a generic sequence.
         * @param {(value: T) => number} comp Comparator function
         */

    }, {
        key: 'max',
        value: function max() {
            var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
                return Number(x);
            };

            return this._elements.reduce(function (x, y) {
                return comp(x) > comp(y) ? x : y;
            });
        }

        /**
         * Returns the minimum value in a generic sequence.
         * @param {(value: T) => number} comp Comparator function
         */

    }, {
        key: 'min',
        value: function min() {
            var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
                return Number(x);
            };

            return this._elements.reduce(function (x, y) {
                return comp(x) < comp(y) ? x : y;
            });
        }

        /**
         * Sorts the elements of a sequence in ascending order
         * according to a key.
         */

    }, {
        key: 'orderBy',
        value: function orderBy(keySelector) {
            return new OrderedList(this._elements, (0, _helpers.comparerForKey)(keySelector, false));
        }

        /**
         * Sorts the elements of a sequence in descending order according to a key.
         */

    }, {
        key: 'orderByDescending',
        value: function orderByDescending(keySelector) {
            return new OrderedList(this._elements, (0, _helpers.comparerForKey)(keySelector, true));
        }

        /**
         * Performs a subsequent ordering of the elements in a sequence in
         * ascending order according to a key.
         */

    }, {
        key: 'thenBy',
        value: function thenBy(keySelector) {
            return this.orderBy(keySelector);
        }

        /**
         * Performs a subsequent ordering of the elements in a sequence in
         * descending order, according to a key.
         */

    }, {
        key: 'thenByDescending',
        value: function thenByDescending(keySelector) {
            return this.orderByDescending(keySelector);
        }

        /**
         * Removes the first occurrence of a specific object from the List<T>.
         */

    }, {
        key: 'remove',
        value: function remove(element) {
            return this.indexOf(element) !== -1 ? (this.removeAt(this.indexOf(element)), true) : false;
        }

        /**
         * Removes all the elements that match the conditions defined by the
         * specified predicate.
         */

    }, {
        key: 'removeAll',
        value: function removeAll(predicate) {
            return this.where(this._negate(predicate));
        }

        /**
         * Removes the element at the specified index of the List<T>.
         */

    }, {
        key: 'removeAt',
        value: function removeAt(index) {
            this._elements.splice(index, 1);
        }

        /**
         * Reverses the order of the elements in the entire List<T>.
         */

    }, {
        key: 'reverse',
        value: function reverse() {
            return new List(this._elements.reverse());
        }

        /**
         * Projects each element of a sequence into a new form.
         */

    }, {
        key: 'select',
        value: function select(mapper) {
            return new List(this._elements.map(mapper));
        }

        /**
         * Projects each element of a sequence to a List<any> and flattens the
         * resulting sequences into one sequence.
         */

    }, {
        key: 'selectMany',
        value: function selectMany(mapper) {
            var _this = this;

            return this.aggregate(function (ac, v, i) {
                return ac.addRange(_this.select(mapper).elementAt(i).toArray()), ac;
            }, new List());
        }

        /**
         * Determines whether two sequences are equal by comparing the elements by
         * using the default equality comparer for their type.
         */

    }, {
        key: 'sequenceEqual',
        value: function sequenceEqual(list) {
            return !!this.aggregate(function (accum, elem, index) {
                return list.elementAt(index) === elem && accum;
            }, true);
        }

        /**
         * Returns the only element of a sequence, and throws an exception if there
         *  is not exactly one element in the sequence.
         */

    }, {
        key: 'single',
        value: function single() {
            var ERROR = 'The collection does not contain exactly one element.';
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

    }, {
        key: 'singleOrDefault',
        value: function singleOrDefault() {
            return this.count() ? this.single() : undefined;
        }

        /**
         * Bypasses a specified number of elements in a sequence and then returns
         * the remaining elements.
         */

    }, {
        key: 'skip',
        value: function skip(amount) {
            return new List(this._elements.slice(Math.max(0, amount)));
        }

        /**
         * Bypasses elements in a sequence as long as a specified condition is true
         * and then returns the remaining elements.
         */

    }, {
        key: 'skipWhile',
        value: function skipWhile(predicate) {
            var _this2 = this;

            return this.skip(this.aggregate(function (x) {
                return predicate(_this2.elementAt(x)) ? ++x : x;
            }, 0));
        }

        /**
         * Computes the sum of the sequence of number values that are obtained by
         * invoking a transform function on each element of the input sequence.
         */

    }, {
        key: 'sum',
        value: function sum(transform) {
            return transform ? this.select(transform).sum() : this.aggregate(function (ac, v) {
                return ac + Number(v);
            }, 0);
        }

        /**
         * Returns a specified number of contiguous elements from the start of a
         * sequence.
         */

    }, {
        key: 'take',
        value: function take(amount) {
            return new List(this._elements.slice(0, Math.max(0, amount)));
        }

        /**
         * Returns elements from a sequence as long as a specified condition is
         * true.
         */

    }, {
        key: 'takeWhile',
        value: function takeWhile(predicate) {
            var _this3 = this;

            return this.take(this.aggregate(function (x) {
                return predicate(_this3.elementAt(x)) ? ++x : x;
            }, 0));
        }

        /**
         * Copies the elements of the List<T> to a new array.
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return this._elements;
        }

        /**
         * Creates a Dictionary<TKey,TValue> from a List<T> according to a
         * specified key selector function.
         */

    }, {
        key: 'toDictionary',
        value: function toDictionary(key, value) {
            var _this4 = this;

            return this.aggregate(function (o, v, i) {
                return o[_this4.select(key).elementAt(i)] = value ? _this4.select(value).elementAt(i) : v, o;
            }, {});
        }

        /**
         * Creates a List<T> from an Enumerable.List<T>.
         */

    }, {
        key: 'toList',
        value: function toList() {
            return this;
        }

        /**
         * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to
         * specified key selector and element selector functions.
         */

    }, {
        key: 'toLookup',
        value: function toLookup(keySelector, elementSelector) {
            return this.groupBy(keySelector, elementSelector);
        }

        /**
         * Produces the set union of two sequences by using the default equality
         * comparer.
         */

    }, {
        key: 'union',
        value: function union(list) {
            return this.concat(list).distinct();
        }

        /**
         * Filters a sequence of values based on a predicate.
         */

    }, {
        key: 'where',
        value: function where(predicate) {
            return new List(this._elements.filter(predicate));
        }

        /**
         * Applies a specified function to the corresponding elements of two
         * sequences, producing a sequence of the results.
         */

    }, {
        key: 'zip',
        value: function zip(list, result) {
            var _this5 = this;

            return list.count() < this.count() ? list.select(function (x, y) {
                return result(_this5.elementAt(y), x);
            }) : this.select(function (x, y) {
                return result(x, list.elementAt(y));
            });
        }

        /**
         * Creates a function that negates the result of the predicate
         */

    }, {
        key: '_negate',
        value: function _negate(predicate) {
            return function () {
                return !predicate.apply(this, arguments);
            };
        }
    }]);

    return List;
}();

/**
 * Represents a sorted sequence. The methods of this class are implemented by
 * using deferred execution. The immediate return value is an object that
 * stores all the information that is required to perform the action.
 * The query represented by this method is not executed until the object is
 * enumerated either by calling its toDictionary, toLookup, toList or
 * toArray methods
 */


var OrderedList = function (_List) {
    _inherits(OrderedList, _List);

    function OrderedList(elements, comparer) {
        _classCallCheck(this, OrderedList);

        var _this6 = _possibleConstructorReturn(this, (OrderedList.__proto__ || Object.getPrototypeOf(OrderedList)).call(this, elements));

        _this6._comparer = comparer;
        _this6._elements.sort(_this6._comparer);
        return _this6;
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in
     * ascending order according to a key.
     *
     * @override
     * @param keySelector
     * @returns {OrderedList}
     */


    _createClass(OrderedList, [{
        key: 'thenBy',
        value: function thenBy(keySelector) {
            return new OrderedList(this._elements, (0, _helpers.composeComparers)(this._comparer, (0, _helpers.comparerForKey)(keySelector, false)));
        }

        /**
         * Performs a subsequent ordering of the elements in a sequence in
         * descending order, according to a key.
         *
         * @override
         * @param keySelector
         * @returns {OrderedList}
         */

    }, {
        key: 'thenByDescending',
        value: function thenByDescending(keySelector) {
            return new OrderedList(this._elements, (0, _helpers.composeComparers)(this._comparer, (0, _helpers.comparerForKey)(keySelector, true)));
        }
    }]);

    return OrderedList;
}(List);

exports.default = List;