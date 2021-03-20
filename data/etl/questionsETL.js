const fs = require('fs');
const readline = require('readline');
const path = require('path');

const validateQuestionsAndAnswers = require('./validateQuestionsAndAnswers.js');

const readStream = fs.createReadStream(path.join(__dirname, '../questions.csv'));
const writeStream = fs.createWriteStream(path.join(__dirname, '../clean/clean-questions.csv'), { encoding: 'utf8' });

const rl = readline.createInterface({
  input: readStream,
  output: writeStream,
  console: false,
});

rl.on('line', (line) => {
  validateQuestionsAndAnswers(line, (err, result) => {
    writeStream.write(result + '\n');
  });
});
