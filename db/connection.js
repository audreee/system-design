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
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
});