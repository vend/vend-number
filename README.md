vend-number
----------

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![js-standard-style][standard-style-image]][standard-style-url]

[travis-image]: https://img.shields.io/travis/vend/vend-number.svg?style=flat
[travis-url]: https://travis-ci.org/vend/vend-number
[npm-image]: https://img.shields.io/npm/v/vend-number.svg?style=flat
[npm-url]: https://npmjs.org/package/vend-number
[standard-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-style-url]: https://github.com/feross/standard

> A collection of utility methods for floating point Number operations

![numbers](https://media.giphy.com/media/kJgJEc8TOiLra/giphy.gif)

`vend-number` is a vend-flavoured wrapper for [BigNumber.js](https://github.com/MikeMcl/bignumber.js/).

Instead of constructing `BigNumber` objects from your numbers and performing operations on them within your app, this module provides a set of simplified math utilities that take simple `Number` or `String` types, and use `BigNumber` operations for accuracy behind the scenes.

## API

`VendNumber` is an extension of the `BigNumber` class.

```js
import VendNumber from 'vend-number'

const num = new VendNumber('123.456')
num.round(2) // '123.46'
num instanceof BigNumber // true
```

There is a shortcut method of construction in `VendNumber.vn`:

```js
import VendNumber, { vn } from 'vend-number'

const num = vn(123.456)
num.round(2) // '123.46'
num instanceof VendNumber // true
```

### Math operations

The following static methods can take any number of values and perform the operation on each of them in the specified order.

Add a list of values

```js
VendNumber.add(1, 2, 3) // 1 + 2 + 3 = 6
```

Subtract a list of values

```js
VendNumber.subtract(2, 1) // 2 - 1 = 1
```

Multiply a list of values

```js
VendNumber.multiply(2, 2) // 2 * 2 = 4
```

Divide a list of values

```js
VendNumber.divide(10, 2) // 10 / 2 = 5
```

Keep in mind when using the `VendNumber` math functions that when performing multiple calculations you will need to **make
sure the execution order is correct**.

Native JS will execute in order of **BEDMAS** automatically, whereas with these methods, you have to make sure of this manually.

E.g.
```js
4 * 5 + 3 // returns 23

multiply(4, add(5, 3)) // returns 32
```

You need to take into account the order in which the functions will be executed, so in this case it should be:

```js
add(3, multiply(4, 5)) // returns 23
```

### Rounding and formatting

Round a value to a specified number of decimal points. The default rounding mode is `ROUND_HALF_UP`, the 'Round Half
Away From Zero' tie-breaking rule.

```js
VendNumber.round(5.545333, 2) // "5.55"
```

#### Rounding modes

You can specify any of the [Big Number rounding modes](http://mikemcl.github.io/bignumber.js/#round-up) to the `round`
function. These are available via `VendNumber.ROUNDING_METHODS`.

```js
import VendNumber, { ROUNDING_METHODS } from 'vend-number'

VendNumber.round(5.545333, 2, ROUNDING_METHODS.ROUND_DOWN) // "5.54"
```

### isFinite

A static equivalent to `BigNumber.isFinite` that reports `false` for non-numeric values.

```js
VendNumber.isFinite(null) // false
VendNumber.isFinite('') // false
VendNumber.isFinite(Infinity) // false

VendNumber.isFinite(0) // true
VendNumber.isFinite(Number.MAX_VALUE) // true
VendNumber.isFinite('-123.456') // true
```

### sumBy

Calculates the sum of all items in a collection based on a property name.

Accepts the following parameters:

  - `Array` an array of items to loop through.
  - `String` a property name to sum by.
  - `Number` an optional decimal points number to round the sum value to (defaults to 2 d.p.).

**Example**:

```js
VendNumber.sumBy([], '') // 0.00
VendNumber.sumBy([{ a: 1 }, { a: 2 }], 'a') // 3.00
VendNumber.sumBy([{ a: 1.4222 }, { a: 2.1115 }], 'a', 3) // 3.534
```

## Contributing

### Build

```js
npm run build
```

### Test

```js
npm test
```

### Watch

To watch for changes, build them and run the tests:

```js
npm run watch
```

## License

MIT © [Vend](github.com/vend)
