'use strict'

var test = require('tape')
var arithmetic = require('./')

test(function (t) {
  t.equal(arithmetic.add('2', 1), 3)
  t.equal(arithmetic.add(4, 1), 5)
  t.equal(arithmetic.subtract(4, 1), 3)
  t.equal(arithmetic.subtract(4, 1, 3), '3.000')
  t.equal(arithmetic.multiply(4, 1, 1), '4.0')
  t.equal(arithmetic.divide(4, 1), 4)
  t.equal(arithmetic.divide(1, 3, 6), '0.333333')
  t.equal(arithmetic.divide(1, 3, 3), '0.333')
  t.end()
})
