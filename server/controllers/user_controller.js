const User = require('../model/user')

module.exports = {
  insertOne : function(req, res){
    User.create(req.body, (err, record) => {
      err ? res.json({ err }) : res.json(record)
    })
  },

  getAll : function(req, res){
    User.find({}, (err, records) => {
      err ? res.json({ err }) : res.json(records)
    })
  },

  getById : function(req, res){
    User.findById(req.params.id, (err, record) => {
      err ? res.json({ err }) : res.json(record)
    })
  },

  updateById : function(req, res){
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true})
        .exec((err, record) => {
          err ? res.json({ err }) : res.json(record)
        })
  },

  deleteById : function(req, res){
    User.findByIdAndRemove(req.params.id)
        .exec((err, record) => {
          err ? res.json({ err }) : res.json(record)
        })
  }
}
