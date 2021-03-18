const fs = require('fs');
const readline = require('readline');
const path = require('path')

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'questions.csv')),
  output: fs.createWriteStream(path.join(__dirname, 'clean-questions.csv')),
  console: false
});

rl.on('line', function(line) {
  validate(line);
});

// rl.write(data[, key])

let validate = (line) => {
  var columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  let id = columns[0];
  let product_id = columns[1];
  let body = columns[2];
  let date_written = columns[3];
  let asker_name = columns[4];
  let asker_email = columns[5];
  let reported = columns[6];
  let helpful = columns[7];
}

