"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComparerHelper = function () {
    function ComparerHelper() {
        _classCallCheck(this, ComparerHelper);
    }

    _createClass(ComparerHelper, null, [{
        key: "comparerForKey",


        /**
         *
         * @param _keySelector
         * @param descending
         * @returns {function(T=, T=): number}
         */
        value: function comparerForKey(_keySelector, descending) {
            var _this = this;

            return function (a, b) {
                return _this.compare(a, b, _keySelector, descending);
            };
        }

        /**
         *
         * @param a
         * @param b
         * @param _keySelector
         * @param descending
         * @returns {number}
         */

    }, {
        key: "compare",
        value: function compare(a, b, _keySelector, descending) {
            return _keySelector(a) > _keySelector(b) ? !descending ? 1 : -1 : _keySelector(a) < _keySelector(b) ? !descending ? -1 : 1 : 0;
        }

        /**
         *
         * @param previousComparer
         * @param currentComparer
         * @returns {function(T=, T=): *}
         */

    }, {
        key: "composeComparers",
        value: function composeComparers(previousComparer, currentComparer) {
            return function (a, b) {
                return previousComparer(a, b) || currentComparer(a, b);
            };
        }
    }]);

    return ComparerHelper;
}();

exports.default = ComparerHelper;