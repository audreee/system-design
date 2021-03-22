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
    let answerInfo = [req.body.body, req.body.name, req.body.email, req.body.photos];
    db.addAnswer(answerInfo, req.params.question_id, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        console.log(data);
        res.sendStatus(201);
      }
    });
  },

  markQuestionHelpful: (req, res) => {
    let questionId = req.params.question_id;
    db.updateHelpfulQuestion(questionId, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(401);
      } else {
        res.sendStatus(204);
      }
    });
  },

  markAnswerHelpful: (req, res) => {
    let answerId = req.params.answer_id;
    db.updateHelpfulAnswer(answerId, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(401);
      } else {
        res.sendStatus(204);
      }
    });
  },

  reportQuestion: (req, res) => {
    let questionId = req.params.question_id;
    db.updateReportedQuestion(questionId, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(401);
      } else {
        res.sendStatus(204);
      }
    });
  },

  reportAnswer: (req, res) => {
    let answerId = req.params.answer_id;
    db.updateReportedAnswer(answerId, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(401);
      } else {
        res.sendStatus(204);
      }
    });
  },
};
