vend-number
----------

A Vend-flavoured wrapper for [BigNumber.js](https://github.com/MikeMcl/bignumber.js/) as a node module.

Instead of constructing `BigNumber` objects from your numbers and performing operations on them within your app, this module provides a set of simplified math utilities that take simple `Number` or `String` types, and use `BigNumber` operations for accuracy behind the scenes.

### API

`VendNumber` is an object of number utilities.

#### Math operations

The following methods can take any number of values and perform the operation on each of them in the specified order.

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

#### Rounding and formatting

```js
VendNumber.round(5.545333, 2) // "5.55"
```

Round a value to a specified number of decimal points.

