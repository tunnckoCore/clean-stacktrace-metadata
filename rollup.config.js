'use strict'

var buble = require('rollup-plugin-buble')
var resolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')

module.exports = {
  entry: 'index.js',
  plugins: [
    resolve({ jsnext: true }),
    commonjs(),
    buble()
  ],
  targets: [
    { dest: 'dist/clean-stacktrace-metadata.es.js', format: 'es' },
    { dest: 'dist/clean-stacktrace-metadata.common.js', format: 'cjs' }
  ]
}
