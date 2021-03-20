const fs = require('fs');
const readline = require('readline');
const path = require('path');

const validatePhotos = require('./validatePhotos.js');

const readStream = fs.createReadStream(path.join(__dirname, '../answers_photos.csv'));
const writeStream = fs.createWriteStream(path.join(__dirname, '../clean/clean-photos.csv'), { encoding: 'utf8' });

const rl = readline.createInterface({
  input: readStream,
  output: writeStream,
  console: false,
});

rl.on('line', (line) => {
  validatePhotos(line, (err, result) => {
    writeStream.write(result + '\n');
  });
});
