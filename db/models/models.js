const db = require('../connection.js');
const format = require('pg-format');

// this file handles database queries

module.exports = {
  getQuestionsByHelpfulness: (productId, callback) => {
    let query = format('SELECT * FROM questions WHERE product_id = %L AND reported IS false ORDER BY helpful DESC', productId);
    db.query(query, callback);
  },

  getQuestionsByNewest: (productId, callback) => {
    let query = format('SELECT * FROM questions WHERE product_id = %L AND reported IS false ORDER BY date_written', productId);
    db.query(query, callback);
  },

  getAnswersByHelpfulness: (questionId, callback) => {
    let query = format('SELECT answers.id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful, ARRAY_AGG(photo) as photos FROM answers LEFT JOIN photos ON answers.id = photos.answer_id WHERE answers.id IN (SELECT id FROM answers WHERE question_id = %L AND reported IS false) GROUP BY answers.id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful ORDER BY helpful DESC', questionId);
    db.query(query, callback);
  },

  getAnswersByNewest: (questionId, callback) => {
    let query = format('SELECT answers.id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful, ARRAY_AGG(photo) as photos FROM answers LEFT JOIN photos ON answers.id = photos.answer_id WHERE answers.id IN (SELECT id FROM answers WHERE question_id = %L AND reported IS false) GROUP BY answers.id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful ORDER BY date_written', questionId);
    db.query(query, callback);
  },

  addQuestion: (params, callback) => {
    let query = format('INSERT INTO questions (body, asker_name, asker_email, product_id) VALUES (%L, %L, %L, %L)', params[0], params[1], params[2], params[3]);
    db.query(query, callback);
  },

  addAnswer: (answerInfo, questionId, callback) => {
    let photoLinks = answerInfo[3];
    let query = format('INSERT INTO answers(body, answerer_name, answerer_email, question_id) VALUES (%L, %L, %L, %L) RETURNING id', answerInfo[0], answerInfo[1], answerInfo[2], questionId);
    db.query(query, (err, result) => {
      if (err) {
        callback(err, null);
      } else if (photoLinks.length === 0) {
        callback(null, result);
      } else if (photoLinks.length > 0) {
        console.log('generated answerId ', result.rows[0].id);
        let answerId = result.rows[0].id;
        console.log("photolinks ", photoLinks.length)
        Promise.all(photoLinks.map((photo) => {
          console.log("photo ", photo)
          let insertPhotosQuery = format('INSERT INTO photos (answer_id, photo) VALUES (%L, %L)', answerId, photo);
          return db.query(insertPhotosQuery);
        }))
          .then((results) => {
            callback(null, results);
          })
          .catch((err) => {
            callback(err, null);
          });
      }
    });
  },
};

// get photos for answers for a given question
// select photo from photos where answer_id IN (select id from answers WHERE question_id = 1502);

// get all relevant info from photos/answers for all the given answers for a given question


// select * from photos where answer_id in (
// select answer_id from photos
// group by answer_id having count(*) > 1