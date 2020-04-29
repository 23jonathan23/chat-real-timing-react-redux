const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/chat', {useNewUrlParser: true, useUnifiedTopology: true})

let chatDataSchema = new mongoose.Schema({ 
  username: {type: String, require: true},
  message: {type: Object, required: true},
  date: {type: String, required: true},
  createdAt: { type: Date, default: Date.now }
 }, {collection: 'chatmessage'})

let db = mongoose.model('ChatMessage', chatDataSchema);

module.exports = db