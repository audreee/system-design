const path = require('path');
const express = require('express');
const routes = require('./routes/routes.js');
const db = require('../db/connection.js');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/', routes.questionsAPI);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
