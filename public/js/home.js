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

});