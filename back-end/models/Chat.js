const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  name: {type: String, required: true},
  users: {type: Array, default: []},
  messages: {type: Array, default: []},
});

module.exports = mongoose.model('Chat', chatSchema);
