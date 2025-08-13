-- Create survey responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  question_1 INTEGER NOT NULL CHECK (question_1 >= 1 AND question_1 <= 5),
  question_2 INTEGER NOT NULL CHECK (question_2 >= 1 AND question_2 <= 5),
  question_3 INTEGER NOT NULL CHECK (question_3 >= 1 AND question_3 <= 5),
  question_4 INTEGER NOT NULL CHECK (question_4 >= 1 AND question_4 <= 5),
  question_5 INTEGER NOT NULL CHECK (question_5 >= 1 AND question_5 <= 5),
  question_6 INTEGER NOT NULL CHECK (question_6 >= 1 AND question_6 <= 5),
  question_7 INTEGER NOT NULL CHECK (question_7 >= 1 AND question_7 <= 5),
  question_8 INTEGER NOT NULL CHECK (question_8 >= 1 AND question_8 <= 5),
  question_9 INTEGER NOT NULL CHECK (question_9 >= 1 AND question_9 <= 5),
  participant_age INTEGER,
  participant_gender VARCHAR(10),
  additional_comments TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at);
