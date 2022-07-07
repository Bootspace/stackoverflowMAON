const mongoose = require('mongoose');
const User = require('./User');
const Question = require('./Question');
const ReplySchema = new mongoose.Schema({
  User : {
    type: mongoose.SchemaTypes.ObjectId,
    ref: User
  },

  Question : {
    type: mongoose.SchemaTypes.ObjectId,
    ref: Question
  },

  body: 
    {
      type: String,
      required: true
    }
})

module.exports = mongoose.model('reply', ReplySchema);