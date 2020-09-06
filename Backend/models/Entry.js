var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EntrySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  dateOfEntry: {
    type: Date,
    required: false
  },
  timeOfEntry: {
    type: String,
    required: false
  },
  contents: {
    type: String,
    required: false
  },
  patient: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'PatientSchema'
  },
  // category: {
  //   type: Schema.Types.ObjectId,
  //   required: false,
  //   ref: 'CategorySchema'
  // },
  category: [{
    categoryName: {
      type: String
    },
    categoryQuestions: [{
      type: Array
    }],
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Entry = mongoose.model('Entry', EntrySchema);
module.exports = Entry;


