const express = require('express');

let questionsAPI = express.Router();

questionsAPI.get('/questions/qa', controller.getQuestions);

module.exports.questionsAPI = questionsAPI;
