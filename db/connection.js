// eslint-disable-next-line import/no-extraneous-dependencies
const { Pool } = require('pg');

const pool = new Pool({
  user: 'audreesteinberg',
  host: 'localhost',
  database: 'qa',
  password: '',
  port: 5432,
});

// eslint-disable-next-line no-unused-vars
pool.connect((err, done) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('postgresSQL is connected');
});

module.exports = pool;
