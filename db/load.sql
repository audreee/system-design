COPY questions
FROM '/Users/audreesteinberg/hr/capstone/sdc/questions/data/clean/clean-questions.csv'
with (FORMAT csv);

COPY answers
FROM '/Users/audreesteinberg/hr/capstone/sdc/questions/data/clean/clean-answers.csv'
with (FORMAT csv);

COPY photos
FROM '/Users/audreesteinberg/hr/capstone/sdc/questions/data/clean/clean-photos.csv'
with (FORMAT csv);

-- ALTER TABLE questions ADD CONSTRAINT id UNIQUE (id);

ALTER TABLE answers
ADD FOREIGN KEY (question_id)
REFERENCES questions (id)
ON DELETE CASCADE;

-- ALTER TABLE answers ADD CONSTRAINT id UNIQUE (id);

DELETE FROM photos
WHERE  NOT EXISTS (
SELECT FROM answers
WHERE  answers.id = photos.answer_id
);

ALTER TABLE photos
ADD FOREIGN KEY (answer_id)
REFERENCES answers (id)
ON DELETE CASCADE;

CREATE INDEX product_name ON questions (product_id);


-- TEST FOR DUPLICATES
-- SELECT csv_import_id, COUNT( csv_import_id ) FROM questions GROUP BY csv_import_id order BY count DESC;

-- REMOVE DUPLICATE ENTRIES FROM QUESTIONS
-- DELETE FROM questions
-- WHERE id IN
--     (SELECT id
--     FROM
--         (SELECT id,
--          ROW_NUMBER() OVER( PARTITION BY id
--         ORDER BY  id ) AS row_num
--         FROM questions ) t
--         WHERE t.row_num > 1 )