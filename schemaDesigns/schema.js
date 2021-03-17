{
  "product_id": Number,
  "questions": [
    {
      "question_id": Number,
      "question_body": String,
      "question_date": Date,
      "asker_name": String,
      "asker_email": String,
      "reported": Boolean,
      "helpfulness": Number,
      "answers": []
    }
  ]
}

{
  "answers": [
    {
      "answer_id": Number,
      "question_id": Number,
      "answer_body": String,
      "answer_date": Date,
      "answerer_name": String,
      "answerer_email": String,
      "reported": Boolean,
      "helpfulness": Number,
      "photos": []
    }
  ]
}

// you stop nesting when you want to interact with things independently
