var faye = require("faye");

var client = new faye.Client('http://localhost:8000');

client.subscribe('/messages', function(message){
  console.log('Got a message:' + message.text);
});

client.publish('/message', {
  text: 'publish!'
});
