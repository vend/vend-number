import VendNumber, { vn, round, add, subtract, multiply, divide, isFinite, sumBy, ROUNDING_MODES } from '../src/vend-number.js'
import BigNumber from '../src/bignumber.js'
import { describe, expect, it } from 'vitest'

describe('VendNumber', () => {
  const testVendNumberValue = vn(10)
  const testNumberValue = 2

  it('should be a constructor function', () => {
    expect(VendNumber).to.be.a('function')
    expect(new VendNumber(0)).to.be.an.instanceof(VendNumber)
  })

  it('should enhance the passed value into a BigNumber', () => {
    expect(new VendNumber(1.005)).to.be.an.instanceof(BigNumber)
    expect(new VendNumber(-1.005)).to.be.an.instanceof(BigNumber)
  })

  it('should return 0 for all falsy values', () => {
    expect(new VendNumber(null).valueOf()).to.equal('0')
    expect(new VendNumber(undefined).valueOf()).to.equal('0')
    expect(new VendNumber(NaN).valueOf()).to.equal('0')
    expect(new VendNumber(false).valueOf()).to.equal('0')
    expect(new VendNumber('').valueOf()).to.equal('0')
  })

  describe('#vn', () => {
    it('should enhance the passed value into a VendNumber', () => {
      expect(vn(1.005)).to.be.an.instanceof(VendNumber)
      expect(vn(-1.005)).to.be.an.instanceof(VendNumber)
    })

    it('should enhance the passed value into a BigNumber', () => {
      expect(vn(1.005)).to.be.an.instanceof(BigNumber)
      expect(vn(-1.005)).to.be.an.instanceof(BigNumber)
    })

    it('should return 0 for all falsy values', () => {
      expect(vn(null).valueOf()).to.equal('0')
      expect(vn(undefined).valueOf()).to.equal('0')
      expect(vn(NaN).valueOf()).to.equal('0')
      expect(vn(false).valueOf()).to.equal('0')
      expect(vn('').valueOf()).to.equal('0')
    })
  })

  describe('#round', () => {
    /*
     * Our default round function uses ROUND_HALF_UP the 'Round Half Away From Zero' tie-breaking rule.
     *
     * For example (When rounding to 1 decimal place):
     *
     *      1.05    ->    1.1
     *
     *     -1.05    ->   -1.1
     */
    describe('positive numbers', () => {
      it('should round away from zero when the least significant digit is equal to 5', () => {
        expect(round(5.5, 0)).to.equal('6')
        expect(round(5.55, 1)).to.equal('5.6')
        expect(round(5.555, 2)).to.equal('5.56')
        expect(round(5.5555, 3)).to.equal('5.556')
        expect(round(5.55555, 4)).to.equal('5.5556')
        expect(round(5.555555, 5)).to.equal('5.55556')

        // Known inconsistent cases.
        expect(round(1.005, 2)).to.equal('1.01')
        expect(round(0.615, 2)).to.equal('0.62')
      })

      it('should round away from zero when the least significant digit is greater than 5', () => {
        expect(round(6.666666, 0)).to.equal('7')
        expect(round(6.666666, 1)).to.equal('6.7')
        expect(round(6.666666, 2)).to.equal('6.67')
        expect(round(6.666666, 3)).to.equal('6.667')
        expect(round(6.666666, 4)).to.equal('6.6667')
        expect(round(6.666666, 5)).to.equal('6.66667')

        expect(round(9.999999, 0)).to.equal('10')
        expect(round(9.999999, 1)).to.equal('10.0')
        expect(round(9.999999, 2)).to.equal('10.00')
        expect(round(9.999999, 3)).to.equal('10.000')
        expect(round(9.999999, 4)).to.equal('10.0000')
        expect(round(9.999999, 5)).to.equal('10.00000')
      })

      it('should round towards zero when the least significant digit is less than 5', () => {
        expect(round(4.444444, 0)).to.equal('4')
        expect(round(4.444444, 1)).to.equal('4.4')
        expect(round(4.444444, 2)).to.equal('4.44')
        expect(round(4.444444, 3)).to.equal('4.444')
        expect(round(4.444444, 4)).to.equal('4.4444')
        expect(round(4.444444, 5)).to.equal('4.44444')

        expect(round(0.000000, 0)).to.equal('0')
        expect(round(0.000000, 1)).to.equal('0.0')
        expect(round(0.000000, 2)).to.equal('0.00')
        expect(round(0.000000, 3)).to.equal('0.000')
        expect(round(0.000000, 4)).to.equal('0.0000')
        expect(round(0.000000, 5)).to.equal('0.00000')
      })

      it('should add padding equal to the number of decimal places specified', () => {
        expect(round(1, 0)).to.equal('1')
        expect(round(1, 1)).to.equal('1.0')
        expect(round(1, 2)).to.equal('1.00')
        expect(round(1, 3)).to.equal('1.000')
        expect(round(1, 4)).to.equal('1.0000')
        expect(round(1, 5)).to.equal('1.00000')
      })
    })

    describe('negative numbers', () => {
      it('should round away from zero when the least significant digit is equal to 5', () => {
        expect(round(-5.5, 0)).to.equal('-6')
        expect(round(-5.55, 1)).to.equal('-5.6')
        expect(round(-5.555, 2)).to.equal('-5.56')
        expect(round(-5.5555, 3)).to.equal('-5.556')
        expect(round(-5.55555, 4)).to.equal('-5.5556')
        expect(round(-5.555555, 5)).to.equal('-5.55556')

        // Known inconsistent cases.
        expect(round(-1.005, 2)).to.equal('-1.01')
        expect(round(-0.615, 2)).to.equal('-0.62')
      })

      it('should round away from zero when the least significant digit is greater than 5', () => {
        expect(round(-6.666666, 0)).to.equal('-7')
        expect(round(-6.666666, 1)).to.equal('-6.7')
        expect(round(-6.666666, 2)).to.equal('-6.67')
        expect(round(-6.666666, 3)).to.equal('-6.667')
        expect(round(-6.666666, 4)).to.equal('-6.6667')
        expect(round(-6.666666, 5)).to.equal('-6.66667')

        expect(round(-9.999999, 0)).to.equal('-10')
        expect(round(-9.999999, 1)).to.equal('-10.0')
        expect(round(-9.999999, 2)).to.equal('-10.00')
        expect(round(-9.999999, 3)).to.equal('-10.000')
        expect(round(-9.999999, 4)).to.equal('-10.0000')
        expect(round(-9.999999, 5)).to.equal('-10.00000')
      })

      it('should round towards zero when the least significant digit is less than 5', () => {
        expect(round(-4.444444, 0)).to.equal('-4')
        expect(round(-4.444444, 1)).to.equal('-4.4')
        expect(round(-4.444444, 2)).to.equal('-4.44')
        expect(round(-4.444444, 3)).to.equal('-4.444')
        expect(round(-4.444444, 4)).to.equal('-4.4444')
        expect(round(-4.444444, 5)).to.equal('-4.44444')
      })

      it('should add padding equal to the number of decimal places specified', () => {
        expect(round(-1, 0)).to.equal('-1')
        expect(round(-1, 1)).to.equal('-1.0')
        expect(round(-1, 2)).to.equal('-1.00')
        expect(round(-1, 3)).to.equal('-1.000')
        expect(round(-1, 4)).to.equal('-1.0000')
        expect(round(-1, 5)).to.equal('-1.00000')
      })
    })

    describe('rounding modes', () => {
      describe('ROUND_UP', () => {
        it('should round away from zero', () => {
          expect(round(0.9, 0, ROUNDING_MODES.ROUND_UP)).to.equal('1')
          expect(round(-0.9, 0, ROUNDING_MODES.ROUND_UP)).to.equal('-1')
          expect(round(0.03169086, 3, ROUNDING_MODES.ROUND_UP)).to.equal('0.032')
        })
      })

      describe('ROUND_DOWN', () => {
        it('should round towards zero', () => {
          expect(round(0.9, 0, ROUNDING_MODES.ROUND_DOWN)).to.equal('0')
          expect(round(-0.9, 0, ROUNDING_MODES.ROUND_DOWN)).to.equal('-0')
          expect(round(0.03169086, 3, ROUNDING_MODES.ROUND_DOWN)).to.equal('0.031')
        })
      })

      describe('ROUND_CEIL', () => {
        it('should round towards Infinity', () => {
          expect(round(0.9028782, 4, ROUNDING_MODES.ROUND_CEIL)).to.equal('0.9029')
          expect(round(-0.9028782, 4, ROUNDING_MODES.ROUND_CEIL)).to.equal('-0.9028')
        })
      })

      describe('ROUND_FLOOR', () => {
        it('should round towards -Infinity', () => {
          expect(round(0.9028782, 4, ROUNDING_MODES.ROUND_FLOOR)).to.equal('0.9028')
          expect(round(-0.9028782, 4, ROUNDING_MODES.ROUND_FLOOR)).to.equal('-0.9029')
        })
      })

      describe('ROUND_HALF_UP', () => {
        it('should round towards nearest neighbour and if equidistant, round away from zero', () => {
          expect(round(5.5, 0, ROUNDING_MODES.ROUND_HALF_UP)).to.equal('6')
          expect(round(5.55, 1, ROUNDING_MODES.ROUND_HALF_UP)).to.equal('5.6')
          expect(round(-5.5, 0, ROUNDING_MODES.ROUND_HALF_UP)).to.equal('-6')
        })
      })

      describe('ROUND_HALF_DOWN', () => {
        it('should round towards nearest neighbour and if equidistant, round towards zero', () => {
          expect(round(5.5, 0, ROUNDING_MODES.ROUND_HALF_DOWN)).to.equal('5')
          expect(round(5.55, 1, ROUNDING_MODES.ROUND_HALF_DOWN)).to.equal('5.5')
          expect(round(-5.5, 0, ROUNDING_MODES.ROUND_HALF_DOWN)).to.equal('-5')
        })
      })

      describe('ROUND_HALF_EVEN', () => {
        it('should round towards nearest neighbour and if equidistant, round towards nearest even neighbour', () => {
          expect(round(-2.426346, 4, ROUNDING_MODES.ROUND_HALF_EVEN)).to.equal('-2.4263')
          expect(round(0.3564473, 3, ROUNDING_MODES.ROUND_HALF_EVEN)).to.equal('0.356')
        })
      })

      describe('ROUND_HALF_CEIL', () => {
        it('should round towards nearest neighbour and if equidistant, round towards nearest Infinity', () => {
          expect(round(76700.5, 0, ROUNDING_MODES.ROUND_HALF_CEIL)).to.equal('76701')
        })
      })

      describe('ROUND_HALF_FLOOR', () => {
        it('should round towards nearest neighbour and if equidistant, round towards nearest -Infinity', () => {
          expect(round(76700.5, 0, ROUNDING_MODES.ROUND_HALF_FLOOR)).to.equal('76700')
        })
      })
    })
  })

  describe('#add', () => {
    it('should add numbers correctly', () => {
      expect(add(0.1, 0.2)).to.equal(0.3)
      expect(add(0.01, 0.02)).to.equal(0.03)
      expect(add(2.05652, 0.30848)).to.equal(2.365)
      expect(add(-1, 6)).to.equal(5)
      expect(add(-1, -6)).to.equal(-7)
      expect(add(-1234, -1234)).to.equal(-2468)
    })

    it('should add zero correctly', () => {
      expect(add(2.57, 0)).to.equal(2.57)
      expect(add(0, 2.57)).to.equal(2.57)
    })

    it('should throw an error if a falsy is passed as an argument', () => {
      expect(() => add(null)).to.throw(Error)
      expect(() => add(null, 1)).to.throw(Error)
      expect(() => add(undefined, 2)).to.throw(Error)
      expect(() => add(NaN, 3)).to.throw(Error)
      expect(() => add(false, 4)).to.throw(Error)
      expect(() => add('', 5)).to.throw(Error)
      expect(() => add(1, null)).to.throw(Error)
      expect(() => add(2, undefined)).to.throw(Error)
      expect(() => add(3, NaN)).to.throw(Error)
      expect(() => add(4, false)).to.throw(Error)
      expect(() => add(5, '')).to.throw(Error)
    })

    it('should handle unlimited arguments', () => {
      expect(add(1, 2)).to.equal(3)
      expect(add(1, 2, 3)).to.equal(6)
      expect(add(1, 2, 3, 4)).to.equal(10)
      expect(add(1, 2, 3, 4, 5)).to.equal(15)
      expect(add(1, 2, 3, 4, 5, 6)).to.equal(21)
      expect(add(1, 2, 3, 4, 5, 6, 7)).to.equal(28)
      expect(add(1, 2, 3, 4, 5, 6, 7, 8)).to.equal(36)
      expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).to.equal(45)
      expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).to.equal(55)
    })

    it('should accept strings or numbers', () => {
      expect(add('10', '5')).to.equal(15)
      expect(add('-10', '5')).to.equal(-5)
      expect(add(10, 5)).to.equal(15)
      expect(add(-10, 5)).to.equal(-5)
    })

    it('should accept VendNumber as a parameter', () => {
      expect(add(vn(10), vn(5))).to.equal(15)
      expect(add(vn(-10), 5)).to.equal(-5)
      expect(add(-10, vn(5))).to.equal(-5)
    })

    it("shouldn't change the type of the parameters", () => {
      add(testVendNumberValue, testNumberValue)
      expect(testVendNumberValue).to.be.an.instanceof(BigNumber)
      expect(testNumberValue).to.be.a('number')
    })
  })

  describe('#subtract', () => {
    it('should subtract numbers correctly', () => {
      expect(subtract(0.1, 0.2)).to.equal(-0.1)
      expect(subtract(0.01, 0.02)).to.equal(-0.01)
      expect(subtract(2.05652, 0.30848)).to.equal(1.74804)
      expect(subtract(-1, 6)).to.equal(-7)
      expect(subtract(-1, -6)).to.equal(5)
      expect(subtract(-1234, -1234)).to.equal(0)
    })

    it('should subtract zero correctly', () => {
      expect(subtract(2.57, 0)).to.equal(2.57)
      expect(subtract(0, 2.57)).to.equal(-2.57)
    })

    it('should throw an error if a falsy is passed as an argument', () => {
      expect(() => subtract(null)).to.throw(Error)
      expect(() => subtract(null, 1)).to.throw(Error)
      expect(() => subtract(undefined, 2)).to.throw(Error)
      expect(() => subtract(NaN, 3)).to.throw(Error)
      expect(() => subtract(false, 4)).to.throw(Error)
      expect(() => subtract('', 5)).to.throw(Error)
      expect(() => subtract(1, null)).to.throw(Error)
      expect(() => subtract(2, undefined)).to.throw(Error)
      expect(() => subtract(3, NaN)).to.throw(Error)
      expect(() => subtract(4, false)).to.throw(Error)
      expect(() => subtract(5, '')).to.throw(Error)
    })

    it('should handle unlimited arguments', () => {
      expect(subtract(1, 2)).to.equal(-1)
      expect(subtract(1, 2, 3)).to.equal(-4)
      expect(subtract(1, 2, 3, 4)).to.equal(-8)
      expect(subtract(1, 2, 3, 4, 5)).to.equal(-13)
      expect(subtract(1, 2, 3, 4, 5, 6)).to.equal(-19)
      expect(subtract(1, 2, 3, 4, 5, 6, 7)).to.equal(-26)
      expect(subtract(1, 2, 3, 4, 5, 6, 7, 8)).to.equal(-34)
      expect(subtract(1, 2, 3, 4, 5, 6, 7, 8, 9)).to.equal(-43)
      expect(subtract(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).to.equal(-53)
    })

    it('should accept strings or numbers', () => {
      expect(subtract('10', '5')).to.equal(5)
      expect(subtract('-10', '5')).to.equal(-15)
      expect(subtract(10, 5)).to.equal(5)
      expect(subtract(-10, 5)).to.equal(-15)
    })

    it('should accept VendNumber as a parameter', () => {
      expect(subtract(vn(10), vn(5))).to.equal(5)
      expect(subtract(vn(-10), 5)).to.equal(-15)
      expect(subtract(-10, vn(5))).to.equal(-15)
    })

    it("shouldn't change the type of the parameters", () => {
      subtract(testVendNumberValue, testNumberValue)
      expect(testVendNumberValue).to.be.an.instanceof(BigNumber)
      expect(testNumberValue).to.be.a('number')
    })
  })

  describe('#multiply', () => {
    it('should multiply numbers correctly', () => {
      expect(multiply(0.1, 0.2)).to.equal(0.02)
      expect(multiply(0.01, 0.02)).to.equal(0.0002)
      expect(multiply(2.05652, 0.30848)).to.equal(0.6343952896)
      expect(multiply(-1, 6)).to.equal(-6)
      expect(multiply(-1, -6)).to.equal(6)
      expect(multiply(-1234, -1234)).to.equal(1522756)
    })

    it('should multiply zero correctly', () => {
      expect(multiply(2.57, 0)).to.equal(0)
      expect(multiply(0, 2.57)).to.equal(0)
    })

    it('should throw an error if a falsy is passed as an argument', () => {
      expect(() => multiply(null)).to.throw(Error)
      expect(() => multiply(null, 1)).to.throw(Error)
      expect(() => multiply(undefined, 2)).to.throw(Error)
      expect(() => multiply(NaN, 3)).to.throw(Error)
      expect(() => multiply(false, 4)).to.throw(Error)
      expect(() => multiply('', 5)).to.throw(Error)
      expect(() => multiply(1, null)).to.throw(Error)
      expect(() => multiply(2, undefined)).to.throw(Error)
      expect(() => multiply(3, NaN)).to.throw(Error)
      expect(() => multiply(4, false)).to.throw(Error)
      expect(() => multiply(5, '')).to.throw(Error)
    })

    it('should handle unlimited arguments', () => {
      expect(multiply(1, 2)).to.equal(2)
      expect(multiply(1, 2, 3)).to.equal(6)
      expect(multiply(1, 2, 3, 4)).to.equal(24)
      expect(multiply(1, 2, 3, 4, 5)).to.equal(120)
      expect(multiply(1, 2, 3, 4, 5, 6)).to.equal(720)
      expect(multiply(1, 2, 3, 4, 5, 6, 7)).to.equal(5040)
      expect(multiply(1, 2, 3, 4, 5, 6, 7, 8)).to.equal(40320)
      expect(multiply(1, 2, 3, 4, 5, 6, 7, 8, 9)).to.equal(362880)
      expect(multiply(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).to.equal(3628800)
    })

    it('should accept strings or numbers', () => {
      expect(multiply('10', '5')).to.equal(50)
      expect(multiply('-10', '5')).to.equal(-50)
      expect(multiply(10, 5)).to.equal(50)
      expect(multiply(-10, 5)).to.equal(-50)
    })

    it('should accept VendNumber as a parameter', () => {
      expect(multiply(vn(10), vn(5))).to.equal(50)
      expect(multiply(vn(-10), 5)).to.equal(-50)
      expect(multiply(-10, vn(5))).to.equal(-50)
    })

    it("shouldn't change the type of the parameters", () => {
      multiply(testVendNumberValue, testNumberValue)
      expect(testVendNumberValue).to.be.an.instanceof(BigNumber)
      expect(testNumberValue).to.be.a('number')
    })
  })

  describe('#divide', () => {
    it('should divide numbers correctly', () => {
      expect(divide(0.1, 0.2)).to.equal(0.5)
      expect(divide(0.01, 0.02)).to.equal(0.5)
      expect(divide(-1234, -1234)).to.equal(1)
    })

    it('should divide zero correctly', () => {
      expect(divide(2.57, 0)).to.equal(Infinity)
      expect(divide(0, 2.57)).to.equal(0)
    })

    it('should throw an error if a falsy is passed as an argument', () => {
      expect(() => divide(undefined, 2)).to.throw(Error)
      expect(() => divide(null)).to.throw(Error)
      expect(() => divide(null, 1)).to.throw(Error)
      expect(() => divide(NaN, 3)).to.throw(Error)
      expect(() => divide(false, 4)).to.throw(Error)
      expect(() => divide('', 5)).to.throw(Error)
      expect(() => divide(1, null)).to.throw(Error)
      expect(() => divide(2, undefined)).to.throw(Error)
      expect(() => divide(3, NaN)).to.throw(Error)
      expect(() => divide(4, false)).to.throw(Error)
      expect(() => divide(5, '')).to.throw(Error)
    })

    it('should handle unlimited arguments', () => {
      expect(divide(1, 2)).to.equal(0.5)
      expect(divide(3, 2, 1)).to.equal(1.5)
    })

    it('should accept strings or numbers', () => {
      expect(divide('10', '5')).to.equal(2)
      expect(divide('-10', '5')).to.equal(-2)
      expect(divide(10, 5)).to.equal(2)
      expect(divide(-10, 5)).to.equal(-2)
    })

    it('should accept VendNumber as a parameter', () => {
      expect(divide(vn(10), vn(5))).to.equal(2)
      expect(divide(vn(-10), 5)).to.equal(-2)
      expect(divide(-10, vn(5))).to.equal(-2)
    })

    it("shouldn't change the type of the parameters", () => {
      divide(testVendNumberValue, testNumberValue)
      expect(testVendNumberValue).to.be.an.instanceof(BigNumber)
      expect(testNumberValue).to.be.a('number')
    })
  })

  describe('#sumBy', () => {
    it('should return 0.00 for non-numeric values', () => {
      expect(sumBy(['word'], 'a')).to.equal('0.00')
      expect(sumBy([], 'a')).to.equal('0.00')
      expect(sumBy(undefined, 'a')).to.equal('0.00')
      expect(sumBy(null, 'a')).to.equal('0.00')
      expect(sumBy([true], 'a')).to.equal('0.00')
      expect(sumBy([null], 'a')).to.equal('0.00')
      expect(sumBy([{}], 'a')).to.equal('0.00')
    })

    it('should return 0.00 for invalid property values', () => {
      expect(sumBy([{ num: 1 }, { num: 2 }], 'X', 2)).to.equal('0.00')
    })

    it('should return the sum rounded to x decimal points for numeric values', () => {
      expect(sumBy([{ num: 1 }, { num: 2 }], 'num', 5)).to.equal('3.00000')
      expect(sumBy([{ num: 10 }, { num: 2.156 }], 'num', 2)).to.equal('12.16')
      expect(sumBy([{ num: 1.1111 }, { num: 1.1443 }], 'num', 3)).to.equal('2.255')
    })
  })

  describe('#isFinite', () => {
    it('should return false for non-numeric values', () => {
      expect(isFinite(undefined)).toBe(false)
      expect(isFinite(null)).toBe(false)
      expect(isFinite(NaN)).toBe(false)
      expect(isFinite(false)).toBe(false)
      expect(isFinite('')).toBe(false)
      expect(isFinite('not a number')).toBe(false)
    })

    it('should return true for finite numbers represented as strings', () => {
      expect(isFinite('0')).toBe(true)
      expect(isFinite('123.45')).toBe(true)
      expect(isFinite('-123.45')).toBe(true)
      expect(isFinite(Number.MAX_VALUE.toString())).toBe(true)
      expect(isFinite(Number.MIN_VALUE.toString())).toBe(true)
    })

    it('should return true for finite number values', () => {
      expect(isFinite(0)).toBe(true)
      expect(isFinite(123.45)).toBe(true)
      expect(isFinite(-123.45)).toBe(true)
      expect(isFinite(Number.MAX_VALUE)).toBe(true)
      expect(isFinite(Number.MIN_VALUE)).toBe(true)
    })

    it('should return true for finite VendNumber values', () => {
      expect(isFinite(vn(0))).toBe(true)
      expect(isFinite(vn(123.45))).toBe(true)
      expect(isFinite(vn(-123.45))).toBe(true)
      expect(isFinite(vn(Number.MAX_VALUE))).toBe(true)
      expect(isFinite(vn(Number.MIN_VALUE))).toBe(true)
    })

    it('should return false for Infinity or -Infinity', () => {
      expect(isFinite(Infinity)).toBe(false)
      expect(isFinite(Number.POSITIVE_INFINITY)).toBe(false)
      expect(isFinite(-Infinity)).toBe(false)
      expect(isFinite(Number.NEGATIVE_INFINITY)).toBe(false)
    })
  })
})
