CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  question_body VARCHAR NOT NULL,
  question_date TIMESTAMP NOT NULL,
  asker_name VARCHAR NOT NULL,
  asker_email VARCHAR NOT NULL,
  FOREIGN KEY (question_id) references products_questions (question_id)
);

CREATE TABLE question metadata (
  question_id INTEGER PRIMARY KEY,
  reported BOOLEAN NOT NULL,
  helpfulness INTEGER NOT NULL,
  FOREIGN KEY (question_id) references products_questions (question_id)
);

CREATE TABLE answers (
  answer_id SERIAL PRIMARY KEY,
  answer_body VARCHAR NOT NULL,
  answer_date TIMESTAMP NOT NULL,
  answerer_name VARCHAR NOT NULL,
  answerer_email VARCHAR NOT NULL,
  question_id INTEGER NOT NULL,
  FOREIGN KEY question_id references products_questions (question_id)
);

CREATE TABLE answers_photos (
  answer_id INTEGER PRIMARY KEY,
  photo VARCHAR(100),
  FOREIGN KEY (answer_id) references answers (answer_id)
);

CREATE TABLE answers metadata (
  answer_id INTEGER PRIMARY KEY,
  reported BOOLEAN DEFAULT FALSE,
  helpfulness INTEGER NOT NULL,
  FOREIGN KEY (answer_id) references answers (answer_id)
);


CREATE TABLE products_questions (
  product_id INTEGER PRIMARY KEY NOT NULL,
  question_id INTEGER NOT NULL UNIQUE
);

-- No quotos for questions...?
-- CREATE TABLE questions_photos (
--   question_id INTEGER NOT NULL
--   photo VARCHAR(100),
--   PRIMARY KEY (question_id) references questions (question_id)
-- );


-- ALTER TABLE `questions` ADD FOREIGN KEY (question_id) REFERENCES `question metadata` (`question_id`);
-- ALTER TABLE `questions` ADD FOREIGN KEY (question_id) REFERENCES `questions_photos` (`question_id`);
-- ALTER TABLE `questions` ADD FOREIGN KEY (question_id) REFERENCES `answers` (`question_id`);
-- ALTER TABLE `answers` ADD FOREIGN KEY (answer_id) REFERENCES `answers_photos` (`answer_id`);
-- ALTER TABLE `answers` ADD FOREIGN KEY (answer_id) REFERENCES `answers metadata` (`answer_id`);
-- ALTER TABLE `products_questions` ADD FOREIGN KEY (question_id) REFERENCES `questions` (`question_id`);