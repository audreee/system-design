CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written DATE NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER NOT NULL
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written DATE NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER NOT NULL
);

CREATE TABLE answers_photos (
  photo_id SERIAL PRIMARY KEY,
  answer_id INTEGER NOT NULL,
  photo VARCHAR(200)
);

-- ALTER TABLE answers
-- ADD CONSTRAINT question_id
-- FOREIGN KEY (question_id)
-- REFERENCES questions (question_id)
-- ON DELETE CASCADE;

-- ALTER TABLE answers_photos
-- ADD CONSTRAINT answer_id
-- FOREIGN KEY (answer_id)
-- REFERENCES answers (answer_id)
-- ON DELETE CASCADE;

-- note: look up text vectoring and searching in postgres
-- note: look up array functionality in postgres