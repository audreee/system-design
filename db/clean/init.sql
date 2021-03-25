CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL,
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
  id INTEGER PRIMARY KEY,
  answer_id INTEGER NOT NULL,
  photo VARCHAR(200)
);

-- Load data:
COPY questions
FROM '/data/clean-questions.csv'
with (FORMAT csv);

COPY answers
FROM '/data/clean-answers.csv'
with (FORMAT csv);

COPY photos
FROM '/data/clean-photos.csv'
with (FORMAT csv);

-- Delete photos that are not tied to existing answers:
DELETE FROM photos
WHERE  NOT EXISTS (
SELECT FROM answers
WHERE  answers.id = photos.answer_id
);

-- Add foreign keys to answers and photos tables:
ALTER TABLE answers
ADD FOREIGN KEY (question_id)
REFERENCES questions (id)
ON DELETE CASCADE;

ALTER TABLE photos
ADD FOREIGN KEY (answer_id)
REFERENCES answers (id)
ON DELETE CASCADE;

-- Create indexes to optimize query execution times:
CREATE INDEX product_id ON questions (product_id);
CREATE INDEX idx_q_reported ON questions (reported, id);

CREATE INDEX q_id ON answers(question_id);
CREATE INDEX idx_reported_id ON answers (reported, id);

CREATE INDEX p_answer_id ON photos (answer_id);
CREATE INDEX p_links ON photos (photo);

-- Create sequences to set serial default values for any new, user-added questions and answers
CREATE SEQUENCE q_seq;
select setval('q_seq', (select max(id)+1 from questions), false);
ALTER TABLE questions ALTER COLUMN id SET DEFAULT nextval('q_seq');

CREATE SEQUENCE a_seq;
select setval('a_seq', (select max(id)+1 from answers), false);
ALTER TABLE answers ALTER COLUMN id SET DEFAULT nextval('a_seq');

CREATE SEQUENCE p_seq;
select setval('p_seq', (select max(id)+1 from photos), false);
ALTER TABLE photos ALTER COLUMN id SET DEFAULT nextval('p_seq');


-- TEST FOR DUPLICATES:
-- SELECT csv_import_id, COUNT( csv_import_id ) FROM questions GROUP BY csv_import_id order BY count DESC;

-- REMOVE DUPLICATE ENTRIES FROM QUESTIONS:
-- DELETE FROM questions
-- WHERE id IN
--     (SELECT id
--     FROM
--         (SELECT id,
--          ROW_NUMBER() OVER( PARTITION BY id
--         ORDER BY  id ) AS row_num
--         FROM questions ) t
--         WHERE t.row_num > 1 )

-- ALTER TABLE questions
-- ALTER COLUMN date_written
-- SET DEFAULT current_date;

-- ALTER TABLE answers
-- ALTER COLUMN date_written
-- SET DEFAULT current_date;

-- ALTER TABLE questions
-- ALTER COLUMN helpful
-- SET DEFAULT 0;

-- ALTER TABLE answers
-- ALTER COLUMN helpful
-- SET DEFAULT 0;