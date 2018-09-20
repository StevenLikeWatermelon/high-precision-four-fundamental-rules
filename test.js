'use strict'

var test = require('tape')
var arithmetic = require('./')
console.log(arithmetic.add('2', 1), 1111111111)
test(function (t) {
  t.equal(arithmetic.add('2', 1), 3)
  t.equal(arithmetic.add(4, 1), 5)
  t.equal(arithmetic.subtract(4, 1), 3)
  t.end()
})
