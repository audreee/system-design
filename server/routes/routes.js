const express = require('express');
const controller = require('../controller/controller.js');

const questionsAPI = express.Router();

questionsAPI.get('/qa/questions', controller.getQuestions);
questionsAPI.get('/qa/questions/:question_id/answers', controller.getAnswers);
questionsAPI.post('/qa/questions', controller.addQuestion);
questionsAPI.post('/qa/questions/:question_id/answers', controller.addAnswer);
questionsAPI.put('/qa/questions/:question_id/helpful', controller.markQuestionHelpful);
questionsAPI.put('/qa/answers/:answer_id/helpful', controller.markAnswerHelpful);
questionsAPI.put('/qa/questions/:question_id/report', controller.reportQuestion);
questionsAPI.put('/qa/answers/:answer_id/report', controller.reportAnswer);

module.exports.questionsAPI = questionsAPI;
