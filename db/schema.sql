CREATE TABLE questions (
  id INTEGER,
  product_id INTEGER PRIMARY KEY,
  body VARCHAR(1000) NOT NULL,
  date_written DATE NOT NULL DEFAULT current_date,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE answers (
  id INTEGER PRIMARY KEY,
  question_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written DATE NOT NULL DEFAULT current_date,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE photos (
  id INTEGER UNIQUE,
  answer_id INTEGER NOT NULL,
  photo VARCHAR(200)
);
