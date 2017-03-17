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

test('should work for windows paths', function (done) {
  cleanStacktraceMetadata(function plugin (line, info) {
    test.strictEqual(info.place, 'Test.fn')
    test.strictEqual(info.filename, 'C:/projects/stacktrace-metadata/test.js')
    test.strictEqual(info.line, 53)
    test.strictEqual(info.column, 15)
  })('at Test.fn (C:\\projects\\stacktrace-metadata\\test.js:53:15)')
  done()
})

test('should work when not defined line and column', function (done) {
  function plugin (line, info) {
    test.strictEqual(info.line, 0)
    test.strictEqual(info.column, 0)
    test.strictEqual(info.place, 'quxie')
    test.strictEqual(info.filename, '/home/projects/stacktrace-metadata/test.js')
  }
  var line = 'at quxie /home/projects/stacktrace-metadata/test.js'
  cleanStacktraceMetadata(plugin)(line)
  done()
})
test('should work when not place defined', function (done) {
  function plugin (line, info) {
    test.strictEqual(info.line, 33)
    test.strictEqual(info.column, 2)
    test.strictEqual(info.place, '')
    test.strictEqual(info.filename, '/home/foo/test.js')
  }
  cleanStacktraceMetadata(plugin)('at /home/foo/test.js:33:2')
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
