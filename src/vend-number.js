/**
 * @module vend-number
 */
'use strict'

import BigNumber from 'bignumber.js'

export default class VendNumber extends BigNumber {
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
  constructor (value) {
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
    super(value ? value.toString() : 0)
  }
}

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
  return new VendNumber(value)
}

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
 * @return {String} The rounded value.
 */
VendNumber.round = function (value, decimalPoints) {
  // Convert to VendNumber if not already.
  value = (value instanceof BigNumber) ? value : new VendNumber(value)

  // 2dp by default.
  decimalPoints = (typeof decimalPoints === 'number') ? decimalPoints : 2

  return value.toFixed(decimalPoints)
}

/**
 * Adds a list of values.
 *
 * @method add
 * @static
 */
VendNumber.add = function (...values) {
  return _executeOperation('plus', values)
}

/**
 * Subtracts a list of values.
 *
 * @method subtract
 * @static
 */
VendNumber.subtract = function (...values) {
  return _executeOperation('minus', values)
}

/**
 * Multiplies a list of values.
 *
 * @method multiply
 * @static
 */
VendNumber.multiply = function (...values) {
  return _executeOperation('times', values)
}

/**
 * Divides a list of values.
 *
 * @method divide
 * @static
 */
VendNumber.divide = function (...values) {
  return _executeOperation('dividedBy', values)
}

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
function _executeOperation (operation, values) {
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
  function _ifValid (value, method) {
    if (!isNaN(value)) {
      method()
    } else {
      throw new TypeError('The VendNumber method must receive a valid String or Number. ' + value)
    }
  }

  // Ensure there's an initial value to start operations on.
  let returnValue = parseFloat(values[0])

  // Then remove the element at index 0.
  values.splice(0, 1)

  // Convert to VendNumber
  _ifValid(returnValue, () => returnValue = new VendNumber(returnValue))

  values.forEach(value => {
    value = parseFloat(value)

    _ifValid(value, () => {
      // Convert to VendNumber
      value = new VendNumber(value)
      // e.g. 5.plus(2) where 5 and 2 are VendNumber's
      returnValue = returnValue[operation](value)
    })
  })

  let operationAnswer
  // Set the final result of the calculation as a standard Number.
  _ifValid(returnValue, () => operationAnswer = Number(returnValue.toString()))

  if (operationAnswer) {
    return operationAnswer
  }

  // End value was not valid so value errors will be displayed but we return 0 to continue.
  return 0
}

const SafeBN = BigNumber.another({ ERRORS: false })

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
  return SafeBN(value).isFinite()
}
