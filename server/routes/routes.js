const express = require('express');
const controller = require('../controller/controller.js');

let questionsAPI = express.Router();

// questionsAPI.get('/questions/qa', controller.getQuestions);

module.exports.questionsAPI = questionsAPI;
