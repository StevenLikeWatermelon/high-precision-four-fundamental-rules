# high-precision-four-fundamental-rules
[![Build Status](https://travis-ci.org/StevenLikeWatermelon/high-precision-four-fundamental-rules.svg?branch=master)](https://travis-ci.org/StevenLikeWatermelon/high-precision-four-fundamental-rules)   [![Code Climate](https://codeclimate.com/github/StevenLikeWatermelon/high-precision-four-fundamental-rules/badges/gpa.svg)](https://codeclimate.com/github/StevenLikeWatermelon/high-precision-four-fundamental-rules)   [![npm version](https://badge.fury.io/js/high-precision-four-fundamental-rules.svg)](https://badge.fury.io/js/high-precision-four-fundamental-rules)   [![Downloads](http://img.shields.io/npm/dm/high-precision-four-fundamental-rules.svg)](https://www.npmjs.com/package/high-precision-four-fundamental-rules)

a npm packge of high-precision-four-fundamental-rules, which can make up for the defect of accuracy of native JS.
（高精度的基本四则运算npm包，用来弥补原生JS计算精度缺失的缺陷）
## Install
``
$ npm install high-precision-four-fundamental-rules --save
``

## Usage
```js
// type 1
import precisionArithmetic from 'high-precision-four-fundamental-rules';
precisionArithmetic.add(1, 2, 4); // '3.0000'
precisionArithmetic.subtract(1, 2, 3); // '-1.000';
precisionArithmetic.multiply(1, 2, 2); // '2.00';
precisionArithmetic.divide(1, 3, 7); // '0.3333333';

// type 2
import {add, subtract, multiply, divide} from 'high-precision-four-fundamental-rules';
add(1, 2, 4); // '3.0000'
subtract(1, 2, 3); // '-1.000';
multiply(1, 2, 2); // '2.00';
divide(1, 3, 7); // '0.3333333';
```

## API
### add（加法）
```js
precisionArithmetic.add(num1, num2, fixedLength); 
```

##### num, num2
Require: `true`
Type: `number or string`

##### fixedLength
Require: `false`
Type: `number`

### subtract（减法）
```js
precisionArithmetic.subtract(num1, num2, fixedLength); 
```

##### num, num2
Require: `true`
Type: `number or string`

##### fixedLength
Require: `false`
Type: `number`

### multiply（乘法）
```js
precisionArithmetic.multiply(num1, num2, fixedLength); 
```

##### num, num2
Require: `true`
Type: `number or string`

##### fixedLength
Require: `false`
Type: `number`

### divide（除法）
```js
precisionArithmetic.divide(num1, num2, fixedLength); 
```

##### num, num2
Require: `true`
Type: `number or string`

##### fixedLength
Require: `false`
Type: `number`

## Warning

**In consideration of `toFixed` function in JavaScript not applicable to most high precision scenes like invoice amount or banking business, I rewrite it by rounding way. You can see the source code in `index.js`.**

**（考虑到原生JS中`toFixed`方法并不适用于银行或发票业务等高精度场景，作者用四舍五入算法重写了改方法，你可以在`index.js`看到源码。**
