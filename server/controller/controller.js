const db = require('../../db/models/models.js');

module.exports = {
  getQuestions: (req, res) => {
    db.getQuestionsByHelpfulness(req.query.product_id, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        res.status(200).send(data.rows);
      }
    });
  },
  getAnswers: (req, res) => {
    db.getAnswersByHelpfulness(req.params.question_id, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        res.status(200).send(data.rows);
      }
    });
  },
  addQuestion: (req, res) => {
    // console.log(req.body);
    let params = [req.body.body, req.body.name, req.body.email, req.body.product_id];
    db.addQuestion(params, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        console.log(data);
        res.sendStatus(201);
      }
    });
  },
  addAnswer: (req, res) => {
    // console.log(req.body);
    let params = [req.body.body, req.body.name, req.body.email,
      req.params.question_id, req.body.photos];
    db.addQuestion(params, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        console.log(data);
        res.sendStatus(201);
      }
    });
  },
};
