'use strict';
const path = require('path');
const { zipSync: nativeZipSync } = require('cross-zip');
const { sync: rmSync} = require('rimraf');
const { zipSync } = require('../lib');

const src1 = path.resolve(__dirname, '../examples/src');
const src2 = path.resolve(__dirname, '../examples/src/foo.txt');
const dist1 = path.resolve(__dirname, '../examples/dist/sample.1.zip');
const dist2 = path.resolve(__dirname, '../examples/dist/sample.2.zip');

const archiverLabel = 'ya-zip';
const nativeLabel = 'native (cross-zip)';

clean();
console.log('----- file -----');
calcTime(archiverLabel, () => zipSync(src1, dist1));
calcTime(nativeLabel, () => nativeZipSync(src1, dist2));


clean();
console.log('----- directory -----');
calcTime(archiverLabel, () => zipSync(src2, dist1));
calcTime(nativeLabel, () => nativeZipSync(src2, dist2));

function calcTime(label, fn) {
  console.time(label);
  fn();
  console.timeEnd(label);
}

function clean() {
  rmSync(dist1);
  rmSync(dist2);
}
