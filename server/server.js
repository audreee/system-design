const path = require('path');
const express = require('express');
const routes = require('./routes/routes.js');
const db = require('../db/connection.js');
require('newrelic');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/loaderio-0e47a0b3edf062577cff80d672b4d136', (req, res) => {
  res.send('loaderio-0e47a0b3edf062577cff80d672b4d136');
});

app.use('/', routes.questionsAPI);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
