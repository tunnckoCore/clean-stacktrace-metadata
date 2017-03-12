/*!
 * clean-stacktrace-metadata <https://github.com/tunnckoCore/clean-stacktrace-metadata>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('mukla')
var cleanStacktraceMetadata = require('./index')

test('clean-stacktrace-metadata', function (done) {
  var expected = 'at quxie (/home/charlike/apps/alwa.js:8:10)'
  cleanStacktraceMetadata(function plugin (line, info) {
    test.strictEqual(line, expected)
    test.strictEqual(typeof info, 'object')
    test.strictEqual(info.place, 'quxie')
    test.strictEqual(info.filename, '/home/charlike/apps/alwa.js')
    test.strictEqual(info.line, 8)
    test.strictEqual(info.column, 10)
  })(expected)
  done()
})

test('should throw TypeError if `plugin` is not a function', function (done) {
  function fixture () {
    cleanStacktraceMetadata()
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `plugin` to be a function/)
  done()
})

test('should not call the `plugin` if line dont have `at`', function (done) {
  var line = 'foo bar'
  var called = 0
  cleanStacktraceMetadata(function plugin (line, info) {
    called++
  })(line)
  test.strictEqual(called, 0)
  done()
})
