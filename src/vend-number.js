import BigNumber from 'bignumber.js'

export const ROUNDING_MODES = {
  ROUND_UP: BigNumber.ROUND_UP,
  ROUND_DOWN: BigNumber.ROUND_DOWN,
  ROUND_CEIL: BigNumber.ROUND_CEIL,
  ROUND_FLOOR: BigNumber.ROUND_FLOOR,
  ROUND_HALF_UP: BigNumber.ROUND_HALF_UP,
  ROUND_HALF_DOWN: BigNumber.ROUND_HALF_DOWN,
  ROUND_HALF_EVEN: BigNumber.ROUND_HALF_EVEN,
  ROUND_HALF_CEIL: BigNumber.ROUND_HALF_CEIL,
  ROUND_HALF_FLOOR: BigNumber.ROUND_HALF_FLOOR
}

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
 * Available rounding modes.
 *
 * @property ROUNDING_MODES
 * @type {Object}
 * @readOnly
 */
VendNumber.ROUNDING_MODES = ROUNDING_MODES

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
export function vn (value) {
  return new VendNumber(value)
}

VendNumber.vn = vn

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
export function round (value, decimalPoints = 2, roundingMode = ROUNDING_MODES.ROUND_HALF_UP) {
  // Convert to VendNumber if not already.
  value = (value instanceof BigNumber) ? value : new VendNumber(value)

  return value.toFixed(decimalPoints, roundingMode)
}

VendNumber.round = round

/**
 * Adds a list of values.
 *
 * @method add
 * @static
 */
export function add (...values) {
  return _executeOperation('plus', values)
}

VendNumber.add = add

/**
 * Subtracts a list of values.
 *
 * @method subtract
 * @static
 */
export function subtract (...values) {
  return _executeOperation('minus', values)
}

VendNumber.subtract = subtract

/**
 * Multiplies a list of values.
 *
 * @method multiply
 * @static
 */
export function multiply (...values) {
  return _executeOperation('times', values)
}

VendNumber.multiply = multiply

/**
 * Divides a list of values.
 *
 * @method divide
 * @static
 */
export function divide (...values) {
  return _executeOperation('dividedBy', values)
}

VendNumber.divide = divide

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
export function sumBy (collection, property, decimalPoints) {
  let sum = 0
  if (collection && collection instanceof Array) {
    collection.forEach(item => {
      if (item && isFinite(item[property])) {
        sum = add(sum, item[property])
      }
    })
  }
  return round(sum, decimalPoints)
}

VendNumber.sumBy = sumBy

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
  _ifValid(returnValue, () => { returnValue = new VendNumber(returnValue) })

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
  _ifValid(returnValue, () => { operationAnswer = Number(returnValue.toString()) })

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
export function isFinite (value) {
  return SafeBN(value).isFinite()
}

VendNumber.isFinite = isFinite
