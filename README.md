# high-precision-four-fundamental-rules
[![Build Status](https://travis-ci.org/StevenLikeWatermelon/high-precision-four-fundamental-rules.svg?branch=master)](https://travis-ci.org/StevenLikeWatermelon/high-precision-four-fundamental-rules)   [![Code Climate](https://codeclimate.com/github/StevenLikeWatermelon/high-precision-four-fundamental-rules/badges/gpa.svg)](https://codeclimate.com/github/StevenLikeWatermelon/high-precision-four-fundamental-rules)   [![npm version](https://badge.fury.io/js/high-precision-four-fundamental-rules.svg)](https://badge.fury.io/js/high-precision-four-fundamental-rules)   [![Downloads](http://img.shields.io/npm/dm/high-precision-four-fundamental-rules.svg)](https://www.npmjs.com/package/high-precision-four-fundamental-rules)

a npm packge of high-precision-four-fundamental-rules, which can make up for the defect of accuracy of native JS.

## Install
``
$ npm install high-precision-four-fundamental-rules --save
``

## Usage
```js
import precisionArithmetic from 'high-precision-four-fundamental-rules';
precisionArithmetic.add(1, 2, 4); // '3.0000'
```

## API
### add
```js
precisionArithmetic.add(num1, num2, fixedLength); 
```

##### num, num2
Require: `true`
Type: `number or string`

##### fixedLength
Require: `false`
Type: `number`

### subtract
```js
precisionArithmetic.subtract(num1, num2, fixedLength); 
```

##### num, num2
Require: `true`
Type: `number or string`

##### fixedLength
Require: `false`
Type: `number`

### multiply
```js
precisionArithmetic.multiply(num1, num2, fixedLength); 
```

##### num, num2
Require: `true`
Type: `number or string`

##### fixedLength
Require: `false`
Type: `number`

### divide
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

**In consideration of `toFixed` function in JavaScript not applicable to most scenes, I rewrite it by rounding way. You can see the source code in `index.js`. If you do not want to use it, this npm package is not suitable for you**
