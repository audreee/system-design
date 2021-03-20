const validateQuestionsAndAnswers = (line, callback) => {
  const columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  const id = columns[0];
  const product_id = columns[1];
  const body = columns[2];
  const date_written = columns[3];
  const name = columns[4];
  const email = columns[5];
  const reported = columns[6];
  const helpful = columns[7];

  if (!id || Number.isNaN(Number(id))) { return false; }
  if (!product_id || Number.isNaN(Number(product_id))) { return false; }
  if (typeof body !== 'string' || body.length > 1002) { return false; }
  if (!validateDate(date_written)) { return false; }
  if (typeof name !== 'string' || name.length > 62) { return false; }
  if (!validateEmail(email)) { return false; }
  if (email !== 'seller' && !email.includes('@')) { return false; }
  if (reported !== '1' && reported !== '0') { return false; }
  if (Number.isNaN(Number(helpful))) { return false; }

  callback(null, columns);
};

const validateDate = (string) => {
  let datePattern = /\d\d\d\d-\d\d-\d\d/;
  return datePattern.test(string);
};

const validateEmail = (string) => {
  let emailPattern = /^\S+@\S+\.\S+$/;
  return emailPattern.test(string);
};

module.exports = validateQuestionsAndAnswers;
