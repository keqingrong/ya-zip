# ya-zip

[![npm version](https://img.shields.io/npm/v/ya-zip.svg)](https://www.npmjs.com/package/ya-zip)

> Yet another zip utility for packaging and compressing a file or a directory

## Installation

```sh
$ npm install ya-zip
```

## Usage

```js
const { zip, zipAsync, zipSync } = require('ya-zip');

const src = path.resolve(__dirname, 'foo');
const dest = path.resolve(__dirname, 'foo.zip');

zipSync(src, dest);

zip(src, dest, (err) => {
  if (err) throw err;
  console.log('Done!');
});

(async () => {
  await zipAsync(src, dest);
  console.log('Done!');
})();
```

## API

### zip(source, destination[, options], callback)

Zip a file or a directory.

- `source` `<string>` Sets the path of a file or a directory to zip.
- `destination` `<string>` Sets the path of the destination file.
- `options` `<Object>` See [node-archive ZipOptions](https://archiverjs.com/docs/global.html#ZipOptions)
  - `comment` `<string>` Sets the zip archive comment.
  - `forceLocalTime` `<boolean>` Forces the archive to contain local file times
    instead of UTC.
  - `forceZip64` `<boolean>` Forces the archive to contain ZIP64 headers.
  - `store` `<boolean>` Sets the compression method to STORE.
  - `zlib` `<Object>` Passed to
    [zlib](https://nodejs.org/api/zlib.html#zlib_class_options) to control
    compression.
- `callback` `<Function>`

### zipAsync(source, destination[, options])

Promisified `zip`.

### zipSync(source, destination[, options])

Synchronous `zip`.

## License

MIT

## Why not `cross-zip`?

[cross-zip-cli](https://github.com/jprichardson/cross-zip-cli) (based on [cross-zip](https://github.com/feross/cross-zip)) has inconsistent behaviors on different platforms.

```sh
$ cross-zip ./src src.zip
```

This will create a zip file contains a `src` folder on macOS/Linux (which based on Info-ZIP's `zip` utility).

```bat
> cross-zip .\src src.zip
```

But this command will create a zip file without a `src` folder on Windows (which based on .Net API).

**Note**: `ya-zip` will not create the redundant folder.

## See also

- [zip(1) - Linux man page](https://linux.die.net/man/1/zip)
- [unzip(1) - Linux man page](https://linux.die.net/man/1/unzip)
- [node-archiver](https://github.com/archiverjs/node-archiver)
