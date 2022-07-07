const mongoose = require('mongoose');
const Question = require('./Question');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required:true
  },

  password: {
    type: String,
    required: true
  },

  question :[
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Question"
    },
  ]
})
module.exports = mongoose.model('user', UserSchema);