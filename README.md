vend-number
----------

A collection of utility methods for floating point Number operations

`vend-number` is vend-flavoured wrapper for [BigNumber.js](https://github.com/MikeMcl/bignumber.js/).

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

Keep in mind when using the `VendNumber` math functions that when performing multiple calculations you will need to **make
sure the execution order is correct**.

Native JS will execute in order of **BEDMAS** automatically, whereas with these methods, you have to make sure of this manually.

E.g.
```js
4 * 5 + 3; // returns 23

multiply(4, add(5, 3)); // returns 32
```

You need to take into account the order in which the functions will be executed, so in this case it should be:

```js
add(5, multiply(4, 5)); // returns 23
```

#### Rounding and formatting

Round a value to a specified number of decimal points.

```js
VendNumber.round(5.545333, 2) // "5.55"
```


