const express = require('express');
const controller = require('../controller/controller.js');

let questionsAPI = express.Router();

// questionsAPI.get('/questions/qa', controller.getQuestions);
questionsAPI.get('/qa/questions', controller.getQuestions);

module.exports.questionsAPI = questionsAPI;
