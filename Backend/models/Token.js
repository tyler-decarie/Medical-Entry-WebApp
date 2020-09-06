var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TokenSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1200
    //expires after 20min
    //have to change setting in cosmosdb to set time-to-live
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

const Token = mongoose.model('Token', TokenSchema);
module.exports = Token;
