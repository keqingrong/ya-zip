'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const archiver = require('archiver');

const noop = () => {};
const isUndefinedOrNull = (val) => {
  if (val === undefined || val === null) {
    return true;
  }
  return false;
};

/**
 * zip
 * @param {string} source
 * @param {string} destination
 * @param {Object} [options]
 * @param {Function} callback
 *
 * https://archiverjs.com/docs/global.html#ZipOptions
 */
function zip(source, destination, options, callback) {
  if (typeof source !== 'string') {
    throw new TypeError('The source provided as parameter 1 must be a string.');
  }

  if (typeof destination !== 'string') {
    throw new TypeError('The destination provided as parameter 2 must be a string.');
  }

  let _callback = noop;

  if (callback === undefined) {// 2 or 3 arguments
    if (options === undefined) {
      throw new TypeError('Forgot a callback as parameter 3.');
    } else if (typeof options !== 'function') {
      throw new TypeError('The callback provided as parameter 3 must be a function.');
    } else {
      _callback = options;
    }
  } else { // 4 arguments
    if (!isUndefinedOrNull(options) && typeof options !== 'object') {
      throw new TypeError('The options provided as parameter 3 must be an object');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('The callback provided as parameter 4 must be a function.');
    } else {
      _callback = callback;
    }
  }

  if (!fs.existsSync(source)) {
    _callback(new Error(`ENOENT: no such file or directory, open '${source}'`));
    return;
  }

  const output = fs.createWriteStream(destination);
  const archive = archiver('zip', options);

  output.on('close', () => {
    _callback();
  });

  archive.on('warning', (err) => {
    if (err) {
      _callback(err);
    }
  });

  archive.on('error', (err) => {
    if (err) {
      _callback(err);
    }
  });

  archive.pipe(output);

  const stats = fs.statSync(source);
  if (stats.isFile()) {
    const basename = path.basename(source);
    archive.file(source, { name: basename });
  } else if (stats.isDirectory()) {
    archive.directory(source, false);
  } else {
    _callback(new Error('Unsupported source, it must be a file or a directory.'));
  }

  archive.finalize();
}

/**
 * Synchronous zip
 * @param {string} source
 * @param {string} destination
 * @param {Object} [options]
 */
function zipSync(source, destination, options) {
  if (typeof source !== 'string') {
    throw new TypeError('The source provided as parameter 1 must be a string.');
  }

  if (typeof destination !== 'string') {
    throw new TypeError('The destination provided as parameter 2 must be a string.');
  }

  if (!isUndefinedOrNull(options) && typeof options !== 'object') {
    throw new TypeError('The options provided as parameter 3 must be an object');
  }

  if (!fs.existsSync(source)) {
    throw new Error(`ENOENT: no such file or directory, open '${source}'`);
  }

  const output = fs.createWriteStream(destination);
  const archive = archiver('zip', options);

  archive.on('warning', function (err) {
    if (err) {
      throw err;
    }
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  const stats = fs.statSync(source);
  if (stats.isFile()) {
    const basename = path.basename(source);
    archive.file(source, { name: basename });
  } else if (stats.isDirectory()) {
    archive.directory(source, false);
  } else {
    throw new Error('Unsupported source, it must be a file or a directory.');
  }

  archive.finalize();
}

module.exports = {
  zip,
  zipAsync: promisify(zip),
  zipSync
};
