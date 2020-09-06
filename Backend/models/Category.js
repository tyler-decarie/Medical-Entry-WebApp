var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    response: [{
      type: String
    }]
  }],
  entries: [{
    type: Schema.Types.ObjectId
  }]
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;


