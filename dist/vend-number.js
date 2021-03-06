/**
 * @module vend-number
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _bignumberJs = require('bignumber.js');

var _bignumberJs2 = _interopRequireDefault(_bignumberJs);

var ROUNDING_MODES = {
  ROUND_UP: _bignumberJs2['default'].ROUND_UP,
  ROUND_DOWN: _bignumberJs2['default'].ROUND_DOWN,
  ROUND_CEIL: _bignumberJs2['default'].ROUND_CEIL,
  ROUND_FLOOR: _bignumberJs2['default'].ROUND_FLOOR,
  ROUND_HALF_UP: _bignumberJs2['default'].ROUND_HALF_UP,
  ROUND_HALF_DOWN: _bignumberJs2['default'].ROUND_HALF_DOWN,
  ROUND_HALF_EVEN: _bignumberJs2['default'].ROUND_HALF_EVEN,
  ROUND_HALF_CEIL: _bignumberJs2['default'].ROUND_HALF_CEIL,
  ROUND_HALF_FLOOR: _bignumberJs2['default'].ROUND_HALF_FLOOR
};

var VendNumber = (function (_BigNumber) {
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
    _get(Object.getPrototypeOf(VendNumber.prototype), 'constructor', this).call(this, value ? value.toString() : 0);
  }

  /**
   * Available rounding modes.
   *
   * @property ROUNDING_MODES
   * @type {Object}
   * @readOnly
   */
  return VendNumber;
})(_bignumberJs2['default']);

exports['default'] = VendNumber;
VendNumber.ROUNDING_MODES = ROUNDING_MODES;

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
VendNumber.vn = function (value) {
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
VendNumber.round = function (value) {
  var decimalPoints = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
  var roundingMode = arguments.length <= 2 || arguments[2] === undefined ? ROUNDING_MODES.ROUND_HALF_UP : arguments[2];

  // Convert to VendNumber if not already.
  value = value instanceof _bignumberJs2['default'] ? value : new VendNumber(value);

  return value.toFixed(decimalPoints, roundingMode);
};

/**
 * Adds a list of values.
 *
 * @method add
 * @static
 */
VendNumber.add = function () {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
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
VendNumber.subtract = function () {
  for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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
VendNumber.multiply = function () {
  for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
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
VendNumber.divide = function () {
  for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
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
VendNumber.sumBy = function (collection, property, decimalPoints) {
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
  }

  // Ensure there's an initial value to start operations on.
  var returnValue = parseFloat(values[0]);

  // Then remove the element at index 0.
  values.splice(0, 1);

  // Convert to VendNumber
  _ifValid(returnValue, function () {
    return returnValue = new VendNumber(returnValue);
  });

  values.forEach(function (value) {
    value = parseFloat(value);

    _ifValid(value, function () {
      // Convert to VendNumber
      value = new VendNumber(value);
      // e.g. 5.plus(2) where 5 and 2 are VendNumber's
      returnValue = returnValue[operation](value);
    });
  });

  var operationAnswer = undefined;
  // Set the final result of the calculation as a standard Number.
  _ifValid(returnValue, function () {
    return operationAnswer = Number(returnValue.toString());
  });

  if (operationAnswer) {
    return operationAnswer;
  }

  // End value was not valid so value errors will be displayed but we return 0 to continue.
  return 0;
}

var SafeBN = _bignumberJs2['default'].another({ ERRORS: false });

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
VendNumber.isFinite = function (value) {
  return SafeBN(value).isFinite();
};
module.exports = exports['default'];