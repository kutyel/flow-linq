'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Enumerable = function () {
    function Enumerable() {
        _classCallCheck(this, Enumerable);
    }

    _createClass(Enumerable, null, [{
        key: 'range',


        /**
         * Generates a sequence of integer numbers within a specified range.
         *
         * @param {number} start Number to start from.
         * @param {number} count Number of elements to be generated.
         * @returns {List.<number>} Sequence of integers within the specified range.
         */
        value: function range(start, count) {
            var result = new _List2.default();while (count--) {
                result.add(start++);
            }return result;
        }

        /**
         * Generates a sequence that contains one repeated value.
         *
         * @param {T} element Element to be repeated.
         * @param {number} count Number of times to repeat the given element.
         * @returns {List.<T>} Sequence containing repeated value.
         */

    }, {
        key: 'repeat',
        value: function repeat(element, count) {
            var result = new _List2.default();while (count--) {
                result.add(element);
            }return result;
        }
    }]);

    return Enumerable;
}();

exports.default = Enumerable;