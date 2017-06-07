const mongoose = require('mongoose')
const Schema = mongoose.Schema

let voteSchema = new Schema({
  number: {
    type: Number,
    enum: [ 1,-1 ]
  },
  voted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {_id: false})

let answerSchema = new Schema({
  answer_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  votes: [voteSchema],
  created_at: {
    type: Date,
    default: Date.now
  }
})

let questionSchema = new Schema({
  asked_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  description: String,
  votes: [voteSchema],
  answers: [answerSchema],
  created_at: {
    type: Date,
    default: Date.now
  }
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question
