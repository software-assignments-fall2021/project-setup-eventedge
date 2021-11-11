const Chat = require('../models/Chat');
let msgs = {};

const joinRoom = (username, chatId, socket) => {
  console.log(username + ' joined');
  socket.join(chatId);
};

const retrieveMsgs = (chatId, io) => {
  Chat.findOne({_id: chatId}, (err, foundChat) => {
    if (err) console.log(err);
    else {
      if (foundChat) {
        io.to(chatId).emit('retrieveMsgs', foundChat.messages);
      } else {
        console.log('chat not found');
      }
    }
  });
};

const sendMsg = (msgObj, chatId, io) => {
  io.to(chatId).emit('sendMsg', msgObj);
  Chat.findOne({_id: chatId}, (err, foundChat) => {
    if (err) console.log(err);
    else {
      if (foundChat) {
        foundChat.messages.push(msgObj);
        foundChat.save();
      }
    }
  });
};

module.exports = {
  joinRoom,
  retrieveMsgs,
  sendMsg,
};
