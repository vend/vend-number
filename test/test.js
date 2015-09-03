/*global require, describe, it */
;(function () {
  'use strict'

  var VendNumber = require('../')
  var BigNumber = require('bignumber.js')
  var expect = require('chai').expect

  describe('VendNumber', function () {
    var testVendNumberValue = VendNumber.VendNumber(10)
    var testNumberValue = 2

    describe('#VendNumber', function () {
      it('should enhance the passed value into a BigNumber', function () {
        expect(VendNumber.VendNumber(1.005)).to.be.an.instanceof(BigNumber)
        expect(VendNumber.VendNumber(-1.005)).to.be.an.instanceof(BigNumber)
      })

      it('should return 0 for all falsy values', function () {
        expect(VendNumber.VendNumber(null).valueOf()).to.equal('0')
        expect(VendNumber.VendNumber(undefined).valueOf()).to.equal('0')
        expect(VendNumber.VendNumber(NaN).valueOf()).to.equal('0')
        expect(VendNumber.VendNumber(false).valueOf()).to.equal('0')
        expect(VendNumber.VendNumber('').valueOf()).to.equal('0')
      })
    })

    describe('#round', function () {
      var round = VendNumber.round

      /*
       * Our round function uses the 'Round Half Away From Zero' tie-breaking rule.
       *
       * For example (When rounding to 1 decimal place):
       *
       *      1.05    ->    1.1
       *
       *     -1.05    ->   -1.1
       */
      describe('positive numbers', function () {
        it('should round away from zero when the least significant digit is equal to 5', function () {
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

        it('should round away from zero when the least significant digit is greater than 5', function () {
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

        it('should round towards zero when the least significant digit is less than 5', function () {
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

        it('should add padding equal to the number of decimal places specified', function () {
          expect(round(1, 0)).to.equal('1')
          expect(round(1, 1)).to.equal('1.0')
          expect(round(1, 2)).to.equal('1.00')
          expect(round(1, 3)).to.equal('1.000')
          expect(round(1, 4)).to.equal('1.0000')
          expect(round(1, 5)).to.equal('1.00000')
        })
      })

      describe('negative numbers', function () {
        it('should round away from zero when the least significant digit is equal to 5', function () {
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

        it('should round away from zero when the least significant digit is greater than 5', function () {
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

        it('should round towards zero when the least significant digit is less than 5', function () {
          expect(round(-4.444444, 0)).to.equal('-4')
          expect(round(-4.444444, 1)).to.equal('-4.4')
          expect(round(-4.444444, 2)).to.equal('-4.44')
          expect(round(-4.444444, 3)).to.equal('-4.444')
          expect(round(-4.444444, 4)).to.equal('-4.4444')
          expect(round(-4.444444, 5)).to.equal('-4.44444')
        })

        it('should add padding equal to the number of decimal places specified', function () {
          expect(round(-1, 0)).to.equal('-1')
          expect(round(-1, 1)).to.equal('-1.0')
          expect(round(-1, 2)).to.equal('-1.00')
          expect(round(-1, 3)).to.equal('-1.000')
          expect(round(-1, 4)).to.equal('-1.0000')
          expect(round(-1, 5)).to.equal('-1.00000')
        })
      })
    })

    describe('#add', function () {
      var add = VendNumber.add

      it('should add numbers correctly', function () {
        expect(add(0.1, 0.2)).to.equal(0.3)
        expect(add(0.01, 0.02)).to.equal(0.03)
        expect(add(2.05652, 0.30848)).to.equal(2.365)
        expect(add(-1, 6)).to.equal(5)
        expect(add(-1, -6)).to.equal(-7)
        expect(add(-1234, -1234)).to.equal(-2468)
      })

      it('should throw an error if a falsy is passed as an argument', function () {
        expect(function () { add(null) }).to.throw(Error)
        expect(function () { add(null, 1) }).to.throw(Error)
        expect(function () { add(undefined, 2) }).to.throw(Error)
        expect(function () { add(NaN, 3) }).to.throw(Error)
        expect(function () { add(false, 4) }).to.throw(Error)
        expect(function () { add('', 5) }).to.throw(Error)
        expect(function () { add(1, null) }).to.throw(Error)
        expect(function () { add(2, undefined) }).to.throw(Error)
        expect(function () { add(3, NaN) }).to.throw(Error)
        expect(function () { add(4, false) }).to.throw(Error)
        expect(function () { add(5, '') }).to.throw(Error)
      })

      it('should handle unlimited arguments', function () {
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

      it('should accept strings or numbers', function () {
        expect(add('10', '5')).to.equal(15)
        expect(add('-10', '5')).to.equal(-5)
        expect(add(10, 5)).to.equal(15)
        expect(add(-10, 5)).to.equal(-5)
      })

      it('should accept VendNumber as a parameter', function () {
        expect(add(VendNumber.VendNumber(10), VendNumber.VendNumber(5))).to.equal(15)
        expect(add(VendNumber.VendNumber(-10), 5)).to.equal(-5)
        expect(add(-10, VendNumber.VendNumber(5))).to.equal(-5)
      })

      it("shouldn't change the type of the parameters", function () {
        add(testVendNumberValue, testNumberValue)
        expect(testVendNumberValue).to.be.an.instanceof(BigNumber)
        expect(testNumberValue).to.be.a('number')
      })
    })

    describe('#subtract', function () {
      var subtract = VendNumber.subtract

      it('should subtract numbers correctly', function () {
        expect(subtract(0.1, 0.2)).to.equal(-0.1)
        expect(subtract(0.01, 0.02)).to.equal(-0.01)
        expect(subtract(2.05652, 0.30848)).to.equal(1.74804)
        expect(subtract(-1, 6)).to.equal(-7)
        expect(subtract(-1, -6)).to.equal(5)
        expect(subtract(-1234, -1234)).to.equal(0)
      })

      it('should throw an error if a falsy is passed as an argument', function () {
        expect(function () { subtract(null) }).to.throw(Error)
        expect(function () { subtract(null, 1) }).to.throw(Error)
        expect(function () { subtract(undefined, 2) }).to.throw(Error)
        expect(function () { subtract(NaN, 3) }).to.throw(Error)
        expect(function () { subtract(false, 4) }).to.throw(Error)
        expect(function () { subtract('', 5) }).to.throw(Error)
        expect(function () { subtract(1, null) }).to.throw(Error)
        expect(function () { subtract(2, undefined) }).to.throw(Error)
        expect(function () { subtract(3, NaN) }).to.throw(Error)
        expect(function () { subtract(4, false) }).to.throw(Error)
        expect(function () { subtract(5, '') }).to.throw(Error)
      })

      it('should handle unlimited arguments', function () {
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

      it('should accept strings or numbers', function () {
        expect(subtract('10', '5')).to.equal(5)
        expect(subtract('-10', '5')).to.equal(-15)
        expect(subtract(10, 5)).to.equal(5)
        expect(subtract(-10, 5)).to.equal(-15)
      })

      it('should accept VendNumber as a parameter', function () {
        expect(subtract(VendNumber.VendNumber(10), VendNumber.VendNumber(5))).to.equal(5)
        expect(subtract(VendNumber.VendNumber(-10), 5)).to.equal(-15)
        expect(subtract(-10, VendNumber.VendNumber(5))).to.equal(-15)
      })

      it("shouldn't change the type of the parameters", function () {
        subtract(testVendNumberValue, testNumberValue)
        expect(testVendNumberValue).to.be.an.instanceof(BigNumber)
        expect(testNumberValue).to.be.a('number')
      })
    })

    describe('#multiply', function () {
      var multiply = VendNumber.multiply

      it('should multiply numbers correctly', function () {
        expect(multiply(0.1, 0.2)).to.equal(0.02)
        expect(multiply(0.01, 0.02)).to.equal(0.0002)
        expect(multiply(2.05652, 0.30848)).to.equal(0.6343952896)
        expect(multiply(-1, 6)).to.equal(-6)
        expect(multiply(-1, -6)).to.equal(6)
        expect(multiply(-1234, -1234)).to.equal(1522756)
      })

      it('should throw an error if a falsy is passed as an argument', function () {
        expect(function () { multiply(null) }).to.throw(Error)
        expect(function () { multiply(null, 1) }).to.throw(Error)
        expect(function () { multiply(undefined, 2) }).to.throw(Error)
        expect(function () { multiply(NaN, 3) }).to.throw(Error)
        expect(function () { multiply(false, 4) }).to.throw(Error)
        expect(function () { multiply('', 5) }).to.throw(Error)
        expect(function () { multiply(1, null) }).to.throw(Error)
        expect(function () { multiply(2, undefined) }).to.throw(Error)
        expect(function () { multiply(3, NaN) }).to.throw(Error)
        expect(function () { multiply(4, false) }).to.throw(Error)
        expect(function () { multiply(5, '') }).to.throw(Error)
      })

      it('should handle unlimited arguments', function () {
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

      it('should accept strings or numbers', function () {
        expect(multiply('10', '5')).to.equal(50)
        expect(multiply('-10', '5')).to.equal(-50)
        expect(multiply(10, 5)).to.equal(50)
        expect(multiply(-10, 5)).to.equal(-50)
      })

      it('should accept VendNumber as a parameter', function () {
        expect(multiply(VendNumber.VendNumber(10), VendNumber.VendNumber(5))).to.equal(50)
        expect(multiply(VendNumber.VendNumber(-10), 5)).to.equal(-50)
        expect(multiply(-10, VendNumber.VendNumber(5))).to.equal(-50)
      })

      it("shouldn't change the type of the parameters", function () {
        multiply(testVendNumberValue, testNumberValue)
        expect(testVendNumberValue).to.be.an.instanceof(BigNumber)
        expect(testNumberValue).to.be.a('number')
      })
    })

    describe('#divide', function () {
      var divide = VendNumber.divide

      it('should divide numbers correctly', function () {
        expect(divide(0.1, 0.2)).to.equal(0.5)
        expect(divide(0.01, 0.02)).to.equal(0.5)
        expect(divide(-1234, -1234)).to.equal(1)
      })

      it('should throw an error if a falsy is passed as an argument', function () {
        expect(function () { divide(undefined, 2) }).to.throw(Error)
        expect(function () { divide(null) }).to.throw(Error)
        expect(function () { divide(null, 1) }).to.throw(Error)
        expect(function () { divide(NaN, 3) }).to.throw(Error)
        expect(function () { divide(false, 4) }).to.throw(Error)
        expect(function () { divide('', 5) }).to.throw(Error)
        expect(function () { divide(1, null) }).to.throw(Error)
        expect(function () { divide(2, undefined) }).to.throw(Error)
        expect(function () { divide(3, NaN) }).to.throw(Error)
        expect(function () { divide(4, false) }).to.throw(Error)
        expect(function () { divide(5, '') }).to.throw(Error)
      })

      it('should handle unlimited arguments', function () {
        expect(divide(1, 2)).to.equal(0.5)
        expect(divide(3, 2, 1)).to.equal(1.5)
      })

      it('should accept strings or numbers', function () {
        expect(divide('10', '5')).to.equal(2)
        expect(divide('-10', '5')).to.equal(-2)
        expect(divide(10, 5)).to.equal(2)
        expect(divide(-10, 5)).to.equal(-2)
      })

      it('should accept VendNumber as a parameter', function () {
        expect(divide(VendNumber.VendNumber(10), VendNumber.VendNumber(5))).to.equal(2)
        expect(divide(VendNumber.VendNumber(-10), 5)).to.equal(-2)
        expect(divide(-10, VendNumber.VendNumber(5))).to.equal(-2)
      })

      it("shouldn't change the type of the parameters", function () {
        divide(testVendNumberValue, testNumberValue)
        expect(testVendNumberValue).to.be.an.instanceof(BigNumber)
        expect(testNumberValue).to.be.a('number')
      })
    })
  })
}())
