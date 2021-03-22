const express = require('express');
const controller = require('../controller/controller.js');

const questionsAPI = express.Router();

// questionsAPI.get('/questions/qa', controller.getQuestions);
questionsAPI.get('/qa/questions', controller.getQuestions);
questionsAPI.get('/qa/questions/:question_id/answers', controller.getAnswers);
questionsAPI.post('/qa/questions', controller.addQuestion);

module.exports.questionsAPI = questionsAPI;
