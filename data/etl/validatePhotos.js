const validatePhotos = (line, callback) => {
  const columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  const photoId = columns[0];
  const answerId = columns[1];
  const url = columns[2];

  if (!Number.isNaN(Number(photoId))) { return false; }
  if (!Number.isNaN(Number(answerId))) { return false; }
  if (!validateUrl(url)) { return false; }

  callback(null, columns);
};

const validateUrl = (string) => {
  let pattern = /(https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  console.log(pattern.test(string) === string);
  return pattern.test(string);
};

module.exports = validatePhotos;
