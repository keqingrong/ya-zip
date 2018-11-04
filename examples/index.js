'use strict';
const path = require('path');
const { zip, zipAsync, zipSync } = require('../lib');

const src = path.resolve(__dirname, '../examples/src');
const dist1 = path.resolve(__dirname, '../examples/dist/sample-01.zip');
const dist2 = path.resolve(__dirname, '../examples/dist/sample-02.zip');
const dist3 = path.resolve(__dirname, '../examples/dist/sample-03.zip');
const dist4 = path.resolve(__dirname, '../examples/dist/sample-04.zip');

zip(src, dist1, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Done!');
});

zipAsync(src, dist2)
  .then(() => {
    console.log('Done!')
  })
  .catch(err => {
    console.error(err);
  });

(async () => {
  try {
    await zipAsync(src, dist3);
    console.log('Done!');
  } catch (err) {
    console.error(err);
  }
})();

try {
  zipSync(src, dist4);
  console.log('Done!');
} catch (err) {
  console.error(err);
}
