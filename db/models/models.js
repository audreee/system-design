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
    let query = format('SELECT answers.id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful, ARRAY_AGG(photo) as photos FROM answers LEFT JOIN photos ON answers.id = photos.answer_id WHERE reported IS false AND question_id = %L GROUP BY answers.id ORDER BY helpful DESC', questionId);
    db.query(query, callback);
  },

  // 'SELECT answers.id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful, ARRAY_AGG(photo) as photos FROM answers LEFT JOIN photos ON answers.id = photos.answer_id WHERE reported IS false AND answers.id IN (SELECT id FROM answers WHERE question_id = 20012) GROUP BY answers.id ORDER BY helpful DESC'


  // design combo index first on reported and then on question id
  // design one on first reported and then on answer id
  // look at compound indexes on grouping/joining
  // compare hash indexes with non-hash
  // look at postgres statisical something
  // make compound indexes that sort on a common field (why sort this every time?)
  // get it down to 200-ish ms
  // k6 is easier than artillery
  // new relic

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

  updateHelpfulQuestion: (questionId, callback) => {
    let query = format('UPDATE questions SET helpful = helpful + 1 WHERE id = %L', questionId);
    db.query(query, callback);
  },

  updateHelpfulAnswer: (answerId, callback) => {
    let query = format('UPDATE answers SET helpful = helpful + 1 WHERE id = %L', answerId);
    db.query(query, callback);
  },

  updateReportedQuestion: (questionId, callback) => {
    let query = format('UPDATE questions SET reported = true WHERE id = %L', questionId);
    db.query(query, callback);
  },

  updateReportedAnswer: (answerId, callback) => {
    let query = format('UPDATE answers SET reported = true WHERE id = %L', answerId);
    db.query(query, callback);
  },
};

// get photos for answers for a given question
// select photo from photos where answer_id IN (select id from answers WHERE question_id = 1502);

// get all relevant info from photos/answers for all the given answers for a given question


// select * from photos where answer_id in (
// select answer_id from photos
// group by answer_id having count(*) > 1

// explain analyze SELECT answers.id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful, ARRAY_AGG(photo) as photos FROM answers LEFT JOIN photos ON answers.id = photos.answer_id WHERE answers.id IN (SELECT id FROM answers WHERE question_id = 5 AND reported IS false) GROUP BY answers.id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful ORDER BY helpful DESC