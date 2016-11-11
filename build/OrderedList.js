'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _List2 = require('./List');

var _List3 = _interopRequireDefault(_List2);

var _ComparerHelper = require('./ComparerHelper');

var _ComparerHelper2 = _interopRequireDefault(_ComparerHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a sorted sequence. The methods of this class are implemented by using deferred execution.
 * The immediate return value is an object that stores all the information that is required to perform the action.
 * The query represented by this method is not executed until the object is enumerated either by
 * calling its toDictionary, toLookup, toList or toArray methods
 */
var OrderedList = function (_List) {
    _inherits(OrderedList, _List);

    function OrderedList(elements, _comparer) {
        _classCallCheck(this, OrderedList);

        var _this = _possibleConstructorReturn(this, (OrderedList.__proto__ || Object.getPrototypeOf(OrderedList)).call(this, elements));

        _this._elements.sort(_comparer);
        return _this;
    }

    /**
     * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
     *
     * @override
     * @param keySelector
     * @returns {OrderedList}
     */


    _createClass(OrderedList, [{
        key: 'thenBy',
        value: function thenBy(keySelector) {
            return new OrderedList(this._elements, _ComparerHelper2.default.composeComparers(this._comparer, _ComparerHelper2.default.comparerForKey(keySelector, false)));
        }

        /**
         * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
         *
         * @override
         * @param keySelector
         * @returns {OrderedList}
         */

    }, {
        key: 'thenByDescending',
        value: function thenByDescending(keySelector) {
            return new OrderedList(this._elements, _ComparerHelper2.default.composeComparers(this._comparer, _ComparerHelper2.default.comparerForKey(keySelector, true)));
        }
    }]);

    return OrderedList;
}(_List3.default);

exports.default = OrderedList;