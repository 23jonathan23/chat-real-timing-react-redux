const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/chat', {useNewUrlParser: true, useUnifiedTopology: true})

let chatDataSchema = new mongoose.Schema({  
  message: {type: Object, required: true}
 }, {collection: 'chatmessage'})

let db = mongoose.model('ChatMessage', chatDataSchema);

module.exports = db