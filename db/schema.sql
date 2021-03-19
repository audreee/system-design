CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  csv_import_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written DATE NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER NOT NULL
);

COPY questions(csv_import_id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/audreesteinberg/hr/capstone/sdc/questions/data/clean/clean-questions.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  csv_import_id INTEGER NOT NULL,
  question_import_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written DATE NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER NOT NULL
);

COPY questions(csv_import_id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/audreesteinberg/hr/capstone/sdc/questions/data/clean/clean-answers.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_import_id INTEGER NOT NULL,
  photo VARCHAR(200)
);

ALTER TABLE answers
ADD CONSTRAINT question_import_id
FOREIGN KEY (question_import_id)
REFERENCES questions (csv_import_id)
ON DELETE CASCADE;

ALTER TABLE answers_photos
ADD CONSTRAINT answer_import_id
FOREIGN KEY (answer_import_id)
REFERENCES answers (csv_import_id)
ON DELETE CASCADE;


-- note: look up text vectoring and searching in postgres
-- note: look up array functionality in postgres