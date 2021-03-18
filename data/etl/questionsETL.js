const fs = require('fs');
const readline = require('readline');
const path = require('path');

const validateQuestions = require('./validateQuestions.js');

const readStream = fs.createReadStream(path.join(__dirname, '../somequestions.csv'));
const writeStream = fs.createWriteStream(path.join(__dirname, './clean-questions.csv'), { encoding: 'utf8' });

const rl = readline.createInterface({
  input: readStream,
  output: writeStream,
  console: false,
});

rl.on('line', (line) => {
  validateQuestions(line, (err, result) => {
    writeStream.write(result + '\n');
  });
});

// function isValidDate(dateString) {

//   // Date format: YYYY-MM-DD
//   var datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

//   // Check if the date string format is a match
//   var matchArray = dateString.match(datePattern);
//   if (matchArray == null) {
//       return false;
//   }
