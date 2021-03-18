const validateQuestions = (line, callback) => {
  const columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  const id = columns[0];
  const product_id = columns[1];
  const body = columns[2];
  const date_written = columns[3];
  const asker_name = columns[4];
  const asker_email = columns[5];
  const reported = columns[6];
  const helpful = columns[7];

  if (Number.isNaN(Number(id))) { return false; }
  if (Number.isNaN(Number(product_id))) { return false; }
  if (typeof body !== 'string' || body.length > 1002) { return false; }
  if (!validateDate(date_written)) { return false; }
  if (typeof asker_name !== 'string' || asker_name.length > 62) { return false; }
  if (typeof asker_email !== 'string' || asker_email.length > 62) { return false; }
  if (asker_email !== 'seller' && !asker_email.includes('@')) { return false; }
  if (reported !== '1' && reported !== '0') { return false; }
  if (Number.isNaN(Number(helpful))) { return false; }

  callback(null, columns);
};

const validateDate = (string) => {
  let datePattern = /\d\d\d\d-\d\d-\d\d/;
  return datePattern.test(string);
};

module.exports = validateQuestions;
