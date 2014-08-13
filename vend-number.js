/**
 * @module vend-number
 */
(function () {
    'use strict';

    var BN = require('bignumber.js'),
        VendNumber;

    VendNumber = {
        /**
         * Enhances the passed value into the BN (BigNumber) equivalent.
         *
         * @constructor VN
         * @param value {Number | String}
         *      The value to make a VN
         */
        VN: function (value) {
            /*
             * Must toString before converting into a BigNumber.
             *
             * @note
             * This is due to the natural loss of precision JS has when dealing with numbers of more than
             * 15 significant digits (s.d.). Therefore BugNumber will throw an error when it is passed
             * numbers of more than 15 s.d.
             * However, the API recommends to avoid this we should either disable error messaging, or toString
             * the value passed. By doing so, it will automatically convert the value to s.d.'s it can happily
             * deal with.
             * https://github.com/MikeMcl/bignumber.js/issues/11
             */
            return BN(value ? value.toString() : 0);
        },

        /**
         * Rounds a value to a specified number of decimal points.
         *
         * @method round
         * @param value {Number|String}
         *      The value to round to the provided number decimal points or two.
         *
         * @param [decimalPoints=2]
         *      The number of decimal points to round the passed value to, or two.
         *
         * @return {String} The rounded value.
         */
        round: function (value, decimalPoints) {
            // Convert to VN if not already.
            value = (value instanceof BN) ? value : new VendNumber.VN(value);

            // 2dp by default.
            decimalPoints = (typeof decimalPoints === 'number') ? decimalPoints : 2;

            return value.toFixed(decimalPoints);
        },

        /**
         * Adds a list of values.
         *
         * @method add
         */
        add: function () {
            var values = Array.prototype.slice.call(arguments, 0);
            return _executeOperation('plus', values);
        },

        /**
         * Subtracts a list of values.
         *
         * @method subtract
         */
        subtract: function () {
            var values = Array.prototype.slice.call(arguments, 0);
            return _executeOperation('minus', values);
        },

        /**
         * Multiplies a list of values.
         *
         * @method multiply
         */
        multiply: function () {
            var values = Array.prototype.slice.call(arguments, 0);
            return _executeOperation('times', values);
        },

        /**
         * Divides a list of values.
         *
         * @method divide
         */
        divide: function () {
            var values = Array.prototype.slice.call(arguments, 0);
            return _executeOperation('dividedBy', values);
        },

        /**
         * Executes VN calculation operation on an array of values.
         *
         * @private
         * @method _executeOperation
         * @param operation {String}
         *      The operation to perform on the VN.
         *
         * @param values {Array}
         *      A list of values to perform the operation on (any length).
         *
         * @return {Number} The final result or 0 if invalid.
         */
        _executeOperation: function (operation, values) {
            var initialValue,
                returnValue,
                _displayValueError,
                _ifValid;

            /*
             * Executes throwing a VendNumber TypeError, when any method has received an invalid value.
             *
             *  @private
             * @method _displayValueError
             */
            _displayValueError = function () {
                throw new TypeError('The VendNumber method must receive a valid String or Number.');
            };

            /*
             * Run passed method if value passed is not NaN, otherwise display value error.
             *
             * @private
             * @method _ifValid
             * @param value {Number}
             *      A value to check is not NaN before running method on.
             *
             * @param method {Function}
             *      A method to run if value is not NaN.
             */
            _ifValid = function (value, method) {
                if (!isNaN(value)) {
                    method();
                } else {
                    _displayValueError();
                }
            };

            // Ensure there's a value to start operations on.
            initialValue    = values[0];
            values          = values.splice(0, 1);

            _ifValid(returnValue, function () {
                // Convert to VN
                returnValue = new VendNumber.VN(returnValue);
            });

            values.forEach(function (value) {
                value = parseFloat(value);

                _ifValid(value, function () {
                    // Convert to VN
                    value = new VendNumber.VN(value);
                    // e.g. 5.plus(2) where 5 and 2 are VN's
                    returnValue = returnValue[operation](value);
                });
            });

            _ifValid(returnValue, function () {
                // Returns the result of the calculation as a standard Number.
                return Number(returnValue.toString());
            });

            // End value was not valid so value errors will be displayed but we return 0 to continue.
            return 0;
        }
    };

    module.exports = VendNumber;

}());