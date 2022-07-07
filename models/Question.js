const mongoose = require('mongoose');
const User = require('./User');
const mongoosastic = require('mongoosastic');
const QuestionSchema = new mongoose.Schema({
  user : {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },

  title: {
    type: String,
    // es_indexed: true,
    required: true
  },

  body: {
    type: String,
    // es_indexed: true,
    required: true
  },

  tags: {
    type: String,
    // es_indexed: true,
    enum: ['python', 'javascript', 'Go']
  },
});

// QuestionSchema.plugin(mongoosastic, {
//   esClient: client
// });

module.exports = mongoose.model('question', QuestionSchema);