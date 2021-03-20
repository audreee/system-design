const db = require('../../db/models/models.js');

module.exports = {
  getQuestions: (req, res) => {
    db.getQuestionsByHelpfulness(req.query.product_id, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        res.send(data.rows);
      }
    });
  },
};