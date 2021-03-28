const path = require('path');
const express = require('express');
const routes = require('./routes/routes.js');
const db = require('../db/connection.js');
require('newrelic');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/loaderio-41303630d5649716465650ce7756990e', (req, res) => {
  res.send('loaderio-41303630d5649716465650ce7756990e');
});

app.use('/', routes.questionsAPI);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
