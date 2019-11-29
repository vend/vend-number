/**
 * @module vend-number
 */
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BigNumber = require('bignumber.js');

var ROUNDING_MODES = {
  ROUND_UP: BigNumber.ROUND_UP,
  ROUND_DOWN: BigNumber.ROUND_DOWN,
  ROUND_CEIL: BigNumber.ROUND_CEIL,
  ROUND_FLOOR: BigNumber.ROUND_FLOOR,
  ROUND_HALF_UP: BigNumber.ROUND_HALF_UP,
  ROUND_HALF_DOWN: BigNumber.ROUND_HALF_DOWN,
  ROUND_HALF_EVEN: BigNumber.ROUND_HALF_EVEN,
  ROUND_HALF_CEIL: BigNumber.ROUND_HALF_CEIL,
  ROUND_HALF_FLOOR: BigNumber.ROUND_HALF_FLOOR
};

var VendNumber =
/*#__PURE__*/
function (_BigNumber) {
  _inherits(VendNumber, _BigNumber);

  /**
   * Vend extension of BigNumber.
   *
   * @class VendNumber
   * @extends BigNumber
   * @constructor
   *
   * @param value {Number | String}
   *        The value to make a VendNumber
   */
  function VendNumber(value) {
    _classCallCheck(this, VendNumber);

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
    return _possibleConstructorReturn(this, _getPrototypeOf(VendNumber).call(this, value ? value.toString() : 0));
  }

  return VendNumber;
}(BigNumber);

module.exports = VendNumber;
/**
 * Available rounding modes.
 *
 * @property ROUNDING_MODES
 * @type {Object}
 * @readOnly
 */

module.exports.ROUNDING_MODES = ROUNDING_MODES;
/**
 * Quick convenience function for creating VendNumber instances. E.g. `vn(123)` is the same as `new VendNumber(123)`.
 *
 * @method vn
 * @static
 *
 * @param value {Number | String}
 *        The value to make a VendNumber
 *
 * @return {VendNumber} A VendNumber instance for the given value
 */

module.exports.vn = function (value) {
  return new VendNumber(value);
};
/**
 * Rounds a value to a specified number of decimal points.
 *
 * @method round
 * @static
 *
 * @param value {Number|String}
 *        The value to round to the provided number decimal points or two.
 *
 * @param [decimalPoints=2]
 *        The number of decimal points to round the passed value to, or two.
 *
 * @param [roundingMode=BigNumber.ROUND_HALF_UP]
 *        The required rounding mode. Defaults to ROUND_HALF_UP (4).
 *        See https://mikemcl.github.io/bignumber.js/#round-up for other rounding modes
 *
 * @return {String} The rounded value.
 */


module.exports.round = function (value) {
  var decimalPoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var roundingMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ROUNDING_MODES.ROUND_HALF_UP;
  // Convert to VendNumber if not already.
  value = value instanceof BigNumber ? value : new VendNumber(value);
  return value.toFixed(decimalPoints, roundingMode);
};
/**
 * Adds a list of values.
 *
 * @method add
 * @static
 */


module.exports.add = function () {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return _executeOperation('plus', values);
};
/**
 * Subtracts a list of values.
 *
 * @method subtract
 * @static
 */


module.exports.subtract = function () {
  for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    values[_key2] = arguments[_key2];
  }

  return _executeOperation('minus', values);
};
/**
 * Multiplies a list of values.
 *
 * @method multiply
 * @static
 */


module.exports.multiply = function () {
  for (var _len3 = arguments.length, values = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    values[_key3] = arguments[_key3];
  }

  return _executeOperation('times', values);
};
/**
 * Divides a list of values.
 *
 * @method divide
 * @static
 */


module.exports.divide = function () {
  for (var _len4 = arguments.length, values = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    values[_key4] = arguments[_key4];
  }

  return _executeOperation('dividedBy', values);
};
/**
 * Returns the sum of all items in the collection based on property.
 *
 * @method sumBy
 *
 * @param {Array} collection
 *        A collection of items to loop through.
 *
 * @param {String} property
 *        A property name to use for calculating the sum.
 *
 * @param {Number} [decimalPoints]
 *        The number of decimal points to round the value to (defaults to 2 decimal points).
 *
 * @return {Number} the total of all items in the collection based on property.
 */


module.exports.sumBy = function (collection, property, decimalPoints) {
  var sum = 0;

  if (collection && collection instanceof Array) {
    collection.forEach(function (item) {
      if (item && VendNumber.isFinite(item[property])) {
        sum = VendNumber.add(sum, item[property]);
      }
    });
  }

  return VendNumber.round(sum, decimalPoints);
};
/**
 * Executes VendNumber calculation operation on an array of values.
 *
 * @private
 * @method _executeOperation
 *
 * @param operation {String}
 *        The operation to perform on the VendNumber.
 *
 * @param values {Array}
 *        A list of values to perform the operation on (any length).
 *
 * @return {Number} The final result or 0 if invalid.
 */


function _executeOperation(operation, values) {
  /**
   * Run passed method if value passed is not NaN, otherwise throw a TypeError.
   *
   * @private
   * @method _ifValid
   *
   * @param value {Number}
   *        A value to check is not NaN before running method on.
   *
   * @param method {Function}
   *        A method to run if value is not NaN.
   */
  function _ifValid(value, method) {
    if (!isNaN(value)) {
      method();
    } else {
      throw new TypeError('The VendNumber method must receive a valid String or Number. ' + value);
    }
  } // Ensure there's an initial value to start operations on.


  var returnValue = parseFloat(values[0]); // Then remove the element at index 0.

  values.splice(0, 1); // Convert to VendNumber

  _ifValid(returnValue, function () {
    return returnValue = new VendNumber(returnValue);
  });

  values.forEach(function (value) {
    value = parseFloat(value);

    _ifValid(value, function () {
      // Convert to VendNumber
      value = new VendNumber(value); // e.g. 5.plus(2) where 5 and 2 are VendNumber's

      returnValue = returnValue[operation](value);
    });
  });
  var operationAnswer; // Set the final result of the calculation as a standard Number.

  _ifValid(returnValue, function () {
    return operationAnswer = Number(returnValue.toString());
  });

  if (operationAnswer) {
    return operationAnswer;
  } // End value was not valid so value errors will be displayed but we return 0 to continue.


  return 0;
}

var SafeBN = BigNumber.another({
  ERRORS: false
});
/**
 * Determines whether the given value is a finite numeric value.
 *
 * @method isFinite
 * @static
 *
 * @param  {Any} value
 *         The value to test as a finite Number
 *
 * @return {Boolean} true if the value is a finite numeric value (can be Number, String, BigNumber) or false if it is
 *         non-numeric or non-finite
 */

module.exports.isFinite = function (value) {
  return SafeBN(value).isFinite();
};