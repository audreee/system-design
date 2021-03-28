const fs = require('fs');
const readline = require('readline');
const path = require('path');

const validateQuestionsAndAnswers = require('./validateQuestionsAndAnswers.js');

const readStream = fs.createReadStream(path.join(__dirname, '../answers.csv'));
const writeStream = fs.createWriteStream(path.join(__dirname, '../../db/clean/clean-answers.csv'), { encoding: 'utf8' });

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

