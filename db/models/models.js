const db = require('../connection.js');

// this file handles database queries

module.exports = {
  getQuestionsByHelpfulness: (productId, callback) => {
    db.query(`SELECT * FROM questions WHERE product_id = ${productId} AND reported IS false ORDER BY helpful DESC`, callback);
  },

  getQuestionsByNewest: (productId, callback) => {
    db.query('SELECT * FROM questions WHERE product_id = (?) AND reported IS false ORDER BY date_written', productId, callback);
  },

  getAnswersByHelpfulness: (questionId, callback) => {
    db.query('SELECT answers.id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful, photos.id, photo  FROM answers LEFT JOIN photos ON answers.id = photos.answer_id WHERE answers.id IN (SELECT id FROM answers WHERE question_id = 1 AND reported IS false) ORDER BY helpful DESC', questionId, callback);
  },

  getAnswersByNewest: (questionId, callback) => {
    db.query('SELECT answers.id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful, photos.id, photo  FROM answers LEFT JOIN photos ON answers.id = photos.answer_id WHERE answers.id IN (SELECT id FROM answers WHERE question_id = 1 AND reported IS false) ORDER BY date_written', questionId, callback);
  },
};

// get photos for answers for a given question
// select photo from photos where answer_id IN (select id from answers WHERE question_id = 1502);

// get all relevant info from photos/answers for all the given answers for a given question

