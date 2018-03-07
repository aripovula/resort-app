//const {generateMessage} = require('./utils/message');
var socket = io();

       
socket.on('connect', function() {
  console.log('Connected to server');

  // to emit to a specific user
  // socket.emit('createMessage', {
  //   to:'abc@s.com',
  //   text:'Test hey'
  // });
});

       socket.on('disconnect', function() {
  console.log('Disconnected to server');
});

socket.on('newMessage',function(message){
  console.log('new message',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}:${message.text}`);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from:'from ula', 
//   text:'from home.js !' 
// }, function(data){
//   console.log('Got it', data);
// });


window.addEventListener('submit', function(evt) {
  evt.preventDefault();
  // Do somethin g else
  socket.emit('createMessage', 
  {
    from:'USER', 
    text:jQuery('[name=message]').val()
  }, 
  function(data){
    console.log('Got it', data);
  });
});