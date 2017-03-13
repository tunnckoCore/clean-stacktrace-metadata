/*!
 * clean-stacktrace-metadata <https://github.com/tunnckoCore/clean-stacktrace-metadata>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

var path = require('path')
var parseFilepath = require('parse-filepath')
var pathNormalize = require('normalize-path')

/**
 * > Parses each line in stack and pass `info` object
 * to the given `plugin` function.
 * That `plugin` function is passed with `(line, info, index)` signature,
 * where `line` is string representing the stacktrace line,
 * and `info` is an object with `.line`, `.column` and `.filename` properties.
 * That's useful, you can attach them to some error object.
 *
 * _Meant to be used inside `mapper` of the [clean-stacktrace][],
 * another useful mapper is [clean-stacktrace-relative-paths][] to show
 * relative paths inside stacktrace, instead of absolute paths._
 *
 * **Example**
 *
 * ```js
 * const metadata = require('clean-stacktrace-metadata')
 * const cleanStack = require('clean-stacktrace')
 *
 * const err = new Error('Missing unicorn')
 * console.log(error.stack)
 * // =>
 * // Error: Missing unicorn
 * //     at quxie (/home/charlike/apps/alwa.js:8:10)
 * //     at module.exports (/home/charlike/apps/foo.js:6:3)
 * //     at Object.<anonymous> (/home/charlike/apps/dush.js:45:3)
 * //     at Module._compile (module.js:409:26)
 * //     at Object.Module._extensions..js (module.js:416:10)
 * //     at Module.load (module.js:343:32)
 * //     at Function.Module._load (module.js:300:12)
 * //     at Function.Module.runMain (module.js:441:10)
 * //     at startup (node.js:139:18)
 *
 * const mapper = metadata((line, info, index) => {
 *   if (index === 1) {
 *     err.line = info.line
 *     err.column = info.column
 *     err.filename = info.filename
 *     err.place = info.place
 *   }
 *
 *   return line
 * })
 *
 * const stack = cleanStack(error.stack, mapper)
 * console.log(stack)
 * // =>
 * // Error: Missing unicorn
 * //     at quxie (/home/charlike/apps/alwa.js:8:10)
 * //     at module.exports (/home/charlike/apps/foo.js:6:3)
 * //     at Object.<anonymous> (/home/charlike/apps/dush.js:45:3)
 *
 * console.log(err.place) // => 'quxie'
 * console.log(err.line) // => 8
 * console.log(err.column) // => 10
 * console.log(err.filename) // => '/home/charlike/apps/alwa.js'
 * ```
 *
 * @name   cleanStacktraceMetadata
 * @param  {Function} `plugin` A function passed with `(line, info, index)` signature.
 * @return {Function} `mapper` Function that can be passed to [clean-stacktrace][]
 * @throws {TypeError} If `plugin` is not a function.
 * @api public
 */

module.exports = function cleanStacktraceMetadata (plugin) {
  if (typeof plugin !== 'function') {
    throw new TypeError('expect `plugin` to be a function')
  }

  return function onEachLine (line, index) {
    if (!/at/.test(line)) {
      return line
    }

    var m = line.match(/at (.+) \(?(.+)\)?$/)

    /* istanbul ignore next */
    if (!m) {
      return line
    }

    var filepath = m[2].slice(-1) === ')' ? m[2].slice(0, -1) : m[2]
    var parsed = parseFilepath(pathNormalize(filepath))
    var dirname = parsed.dirname
    var parts = parsed.basename.split(':')
    var filename = path.join(dirname, parts[0])

    var info = {
      line: Number(parts[1] || 0),
      column: Number(parts[2] || 0),
      filename: String(filename),
      place: String(m[1])
    }

    return plugin(line, info, index) || line
  }
}
