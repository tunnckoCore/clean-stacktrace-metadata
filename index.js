/*!
 * clean-stacktrace-metadata <https://github.com/tunnckoCore/clean-stacktrace-metadata>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

module.exports = function cleanStacktraceMetadata (plugin) {
  if (typeof plugin !== 'function') {
    throw new TypeError('expect `plugin` to be a function')
  }

  return function onEachLine (line) {
    if (!/at/.test(line)) return line

    var m = line.match(/at (.+) \(?([^:\s]+):(\d+):?(\d+)?\)?$/)

    /* istanbul ignore next */
    if (!m) return line

    var info = {
      line: Number(m[3]),
      column: Number(m[4]),
      filename: String(m[2]),
      place: String(m[1])
    }

    return plugin(line, info)
  }
}
