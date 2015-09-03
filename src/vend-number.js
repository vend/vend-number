/*global require, module*/
/**
 * @module vend-number
 */
'use strict'

import BigNumber from 'bignumber.js'

const VendNumber = {
  /**
   * Enhances the passed value into the BigNumber equivalent.
   *
   * @constructor VendNumber
   * @param value {Number | String}
   *      The value to make a VendNumber
   */
  VendNumber: function (value) {
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
    return BigNumber(value ? value.toString() : 0)
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
    // Convert to VendNumber if not already.
    value = (value instanceof BigNumber) ? value : new VendNumber.VendNumber(value)

    // 2dp by default.
    decimalPoints = (typeof decimalPoints === 'number') ? decimalPoints : 2

    return value.toFixed(decimalPoints)
  },

  /**
   * Adds a list of values.
   *
   * @method add
   */
  add: function () {
    var values = Array.prototype.slice.call(arguments, 0)
    return VendNumber._executeOperation('plus', values)
  },

  /**
   * Subtracts a list of values.
   *
   * @method subtract
   */
  subtract: function () {
    var values = Array.prototype.slice.call(arguments, 0)
    return VendNumber._executeOperation('minus', values)
  },

  /**
   * Multiplies a list of values.
   *
   * @method multiply
   */
  multiply: function () {
    var values = Array.prototype.slice.call(arguments, 0)
    return VendNumber._executeOperation('times', values)
  },

  /**
   * Divides a list of values.
   *
   * @method divide
   */
  divide: function () {
    var values = Array.prototype.slice.call(arguments, 0)
    return VendNumber._executeOperation('dividedBy', values)
  },

  /**
   * Executes VendNumber calculation operation on an array of values.
   *
   * @private
   * @method _executeOperation
   * @param operation {String}
   *      The operation to perform on the VendNumber.
   *
   * @param values {Array}
   *      A list of values to perform the operation on (any length).
   *
   * @return {Number} The final result or 0 if invalid.
   */
  _executeOperation: function (operation, values) {
    var returnValue,
      _displayValueError,
      _ifValid,
      operationAnswer

    /*
     * Executes throwing a VendNumber TypeError, when any method has received an invalid value.
     *
     *  @private
     * @method _displayValueError
     */
    _displayValueError = function (value) {
      throw new TypeError('The VendNumber method must receive a valid String or Number. ' + value)
    }

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
        method()
      } else {
        _displayValueError(value)
      }
    }

    // Ensure there's an initial value to start operations on.
    returnValue = parseFloat(values[0])

    // Then remove the element at index 0.
    values.splice(0, 1)

    _ifValid(returnValue, function () {
      // Convert to VendNumber
      returnValue = new VendNumber.VendNumber(returnValue)
    })

    values.forEach(function (value) {
      value = parseFloat(value)

      _ifValid(value, function () {
        // Convert to VendNumber
        value = new VendNumber.VendNumber(value)
        // e.g. 5.plus(2) where 5 and 2 are VendNumber's
        returnValue = returnValue[operation](value)
      })
    })

    _ifValid(returnValue, function () {
      // Set the final result of the calculation as a standard Number.
      operationAnswer = Number(returnValue.toString())
    })

    if (operationAnswer) {
      return operationAnswer
    }

    // End value was not valid so value errors will be displayed but we return 0 to continue.
    return 0
  }
}

export default VendNumber
