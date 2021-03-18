const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'audreesteinberg',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: 5432,
})

pool.connect(function (err, client, done) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('postgresSQL is connected');
});

module.exports = pool;