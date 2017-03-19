'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));

var index$10 = function uncPathRegex() {
  return /^[\\\/]{2,}[^\\\/]+[\\\/]+[^\\\/]+/;
};

var index$8 = function isUNC(fp) {
  if (typeof fp !== 'string') { return false; }
  return index$10().test(fp);
};

var index$6 = function isRelative(fp) {
  if (typeof fp !== 'string') {
    throw new TypeError('isRelative expects a string.');
  }
  // Windows UNC paths are always considered to be absolute.
  return !index$8(fp) && !/^([a-z]:)?[\\\/]/i.test(fp);
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$12 = createCommonjsModule(function (module, exports) {
/*! is-windows v0.2.0 | MIT LICENSE (c) 2015 | https://github.com/jonschlinkert/is-windows */
(function (root, factory) {
  if (typeof undefined === 'function' && undefined.amd) {
    // AMD
    undefined(factory);
  } else {
    // Node.js
    module.exports = factory;
  }
}(commonjsGlobal, function () {
  'use strict';

  return (function isWindows() {
    if (typeof process === 'undefined' || !process) {
      return false;
    }
    return process.platform === 'win32';
  }());
}));
});

/**
 * Expose `isAbsolute`
 */

var index$4 = isAbsolute;

/**
 * Returns true if a file path is absolute.
 *
 * @param  {String} `fp`
 * @return {Boolean}
 */

function isAbsolute(fp) {
  if (typeof fp !== 'string') {
    throw new TypeError('isAbsolute expects a string.');
  }
  return index$12() ? isAbsolute.win32(fp) : isAbsolute.posix(fp);
}

/**
 * Test posix paths.
 */

isAbsolute.posix = function posixPath(fp) {
  return fp.charAt(0) === '/';
};

/**
 * Test windows paths.
 */

isAbsolute.win32 = function win32(fp) {
  if (/[a-z]/i.test(fp.charAt(0)) && fp.charAt(1) === ':' && fp.charAt(2) === '\\') {
    return true;
  }
  // Microsoft Azure absolute filepath
  if (fp.slice(0, 2) === '\\\\') {
    return true;
  }
  return !index$6(fp);
};

/*!
 * path-root-regex <https://github.com/jonschlinkert/path-root-regex>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var index$16 = function() {
  // Regex is modified from the split device regex in the node.js path module.
  return /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?/;
};

var index$14 = function(filepath) {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected a string');
  }

  var match = index$16().exec(filepath);
  if (match) {
    return match[0];
  }
};

/*!
 * map-cache <https://github.com/jonschlinkert/map-cache>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Expose `MapCache`
 */

var index$18 = MapCache;

/**
 * Creates a cache object to store key/value pairs.
 *
 * ```js
 * var cache = new MapCache();
 * ```
 *
 * @api public
 */

function MapCache(data) {
  this.__data__ = data || {};
}

/**
 * Adds `value` to `key` on the cache.
 *
 * ```js
 * cache.set('foo', 'bar');
 * ```
 *
 * @param {String} `key` The key of the value to cache.
 * @param {*} `value` The value to cache.
 * @returns {Object} Returns the `Cache` object for chaining.
 * @api public
 */

MapCache.prototype.set = function mapSet(key, value) {
  if (key !== '__proto__') {
    this.__data__[key] = value;
  }
  return this;
};

/**
 * Gets the cached value for `key`.
 *
 * ```js
 * cache.get('foo');
 * //=> 'bar'
 * ```
 *
 * @param {String} `key` The key of the value to get.
 * @returns {*} Returns the cached value.
 * @api public
 */

MapCache.prototype.get = function mapGet(key) {
  return key === '__proto__' ? undefined : this.__data__[key];
};

/**
 * Checks if a cached value for `key` exists.
 *
 * ```js
 * cache.has('foo');
 * //=> true
 * ```
 *
 * @param {String} `key` The key of the entry to check.
 * @returns {Boolean} Returns `true` if an entry for `key` exists, else `false`.
 * @api public
 */

MapCache.prototype.has = function mapHas(key) {
  return key !== '__proto__' && hasOwn.call(this.__data__, key);
};

/**
 * Removes `key` and its value from the cache.
 *
 * ```js
 * cache.del('foo');
 * ```
 * @title .del
 * @param {String} `key` The key of the value to remove.
 * @returns {Boolean} Returns `true` if the entry was removed successfully, else `false`.
 * @api public
 */

MapCache.prototype.del = function mapDelete(key) {
  return this.has(key) && delete this.__data__[key];
};

var cache = new index$18();

var index$2 = function(filepath) {
  if (typeof filepath !== 'string') {
    throw new TypeError('parse-filepath expects a string');
  }

  if (cache.has(filepath)) {
    return cache.get(filepath);
  }

  var obj = {};
  if (typeof path.parse === 'function') {
    obj = path.parse(filepath);
    obj.extname = obj.ext;
    obj.basename = obj.base;
    obj.dirname = obj.dir;
    obj.stem = obj.name;

  } else {
    define(obj, 'root', function() {
      return index$14(this.path);
    });

    define(obj, 'extname', function() {
      return path.extname(filepath);
    });

    define(obj, 'ext', function() {
      return this.extname;
    });

    define(obj, 'name', function() {
      return path.basename(filepath, this.ext);
    });

    define(obj, 'stem', function() {
      return this.name;
    });

    define(obj, 'base', function() {
      return this.name + this.ext;
    });

    define(obj, 'basename', function() {
      return this.base;
    });

    define(obj, 'dir', function() {
      return path.dirname(filepath);
    });

    define(obj, 'dirname', function() {
      return this.dir;
    });
  }

  obj.path = filepath;

  define(obj, 'absolute', function() {
    return path.resolve(this.path);
  });

  define(obj, 'isAbsolute', function() {
    return index$4(this.path);
  });

  cache.set(filepath, obj);
  return obj;
};

function define(obj, prop, fn) {
  var cached;
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    set: function(val) {
      cached = val;
    },
    get: function() {
      return cached || (cached = fn.call(obj));
    }
  });
}

/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License
 */

var index$20 = function normalizePath(str, stripTrailing) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  str = str.replace(/[\\\/]+/g, '/');
  if (stripTrailing !== false) {
    str = str.replace(/\/$/, '');
  }
  return str;
};

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

var index = function cleanStacktraceMetadata (plugin) {
  if (typeof plugin !== 'function') {
    throw new TypeError('expect `plugin` to be a function')
  }

  return function onEachLine (line, index) {
    if (!/at/.test(line)) {
      return line
    }

    var tmp = line.replace(/at\s+/, '');
    var idx = tmp.indexOf(' ');
    var place = '';
    var filepath = '';

    if (idx > 0) {
      place = tmp.slice(0, idx);
      filepath = tmp.slice(idx + 1);
    } else {
      filepath = tmp;
    }

    filepath = filepath
      .replace(/^\(/, '')
      .replace(/\)$/, '');

    var parsed = index$2(index$20(filepath));
    var dirname = index$20(parsed.dirname);
    var parts = index$20(parsed.basename).split(':');
    var filename = index$20(path.join(dirname, parts[0]));

    var info = {
      line: +parts[1] || 0,
      column: +parts[2] || 0,
      filename: filename,
      place: place
    };

    return plugin(line, info, index) || line
  }
};

module.exports = index;
