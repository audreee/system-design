// eslint-disable-next-line import/no-extraneous-dependencies
const { Pool } = require('pg');

const pool = new Pool({
  user: 'audreesteinberg',
  host: 'ec2-54-219-87-85.us-west-1.compute.amazonaws.com',
  database: 'qa',
  password: '',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
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
