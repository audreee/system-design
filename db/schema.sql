CREATE TABLE questions (
  id INTEGER,
  product_id INTEGER UNIQUE NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written DATE NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER NOT NULL
);

CREATE TABLE answers (
  id INTEGER UNIQUE NOT NULL,
  question_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written DATE NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER NOT NULL
);

CREATE TABLE photos (
  id INTEGER UNIQUE,
  answer_id INTEGER NOT NULL,
  photo VARCHAR(200)
);
