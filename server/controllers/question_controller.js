const Question = require('../model/question')

module.exports = {
  insertOne : function(req, res){
    Question.create(req.body, (err, record) => {
      err ? res.json({ err }) : res.json(record)
    })
  },

  getAll : function(req, res){
    Question.find({})
      .populate('asked_by votes.voted_by', 'username')
      .exec((err, records) => {
        err ? res.json({ err }) : res.json(records)
      })
  },

  getById : function(req, res){
    Question.findById(req.params.id, (err, record) => {
      err ? res.json({ err }) : res.json(record)
    })
  },

  updateById : function(req, res){
    Question.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true})
        .exec((err, record) => {
          err ? res.json({ err }) : res.json(record)
        })
  },

  deleteById : function(req, res){
    Question.findByIdAndRemove(req.params.id)
        .exec((err, record) => {
          err ? res.json({ err }) : res.json(record)
        })
  },

  voteToQuestion : function(req, res){
    Question.findById(req.params.id)
      .exec((err, record) => {
        if(err)
          res.json({ err })
        else {
          let exists = record.votes.some(val => { return val.voted_by == req.body.voted_by })

          if(exists)
            res.json({ error: true, message: "You have already voted"})
          else {
            record.votes.push(req.body)
            record.save((err, record) => {
              err ? res.json({ err }) : res.json(record)
            })
          }
        }
      })
  },

  answerToQuestion : function(req, res){
    Question.findById(req.params.id)
      .exec((err, record) => {
        if(err)
          res.json({ err })
        else {
          record.answers.push(req.body)
          record.save((err, record) => {
            err ? res.json({ err }) : res.json(record)
          })
        }
      })
  },

  answerToQuestion : function(req, res){
    Question.findById(req.params.id)
      .exec((err, record) => {
        if(err)
          res.json({ err })
        else {
          let exists = record.answers.some(answer => {
            // return val.voted_by == req.body.voted_by
            answer.votes.some(return val.voted_by == req.body.voted_by)
          })

          if(exists)
            res.json({ error: true, message: "You have already voted"})
          else {
            record.votes.push(req.body)
            record.save((err, record) => {
              err ? res.json({ err }) : res.json(record)
            })
          }
        }
      })
  }
}
