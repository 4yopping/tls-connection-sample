var tls = require('tls');
var fs = require('fs');

module.exports = function Client(key,cert,serverCert){

  var options = {
    host:'127.0.0.1',
    //port: 8000,
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
    ca: [ fs.readFileSync(serverCert) ],
    checkServerIdentity: function (host, cert) {
      //This hack is to avoid the server name mathc verification
      //Comment it if you're in production and the pems were created in the server
      return;
    }
  };

  var socket = tls.connect(8000, options, function() {
    console.log('client connected',
                socket.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(socket);
    process.stdin.resume();
  });
  socket.setEncoding('utf8');
  socket.on('data', function(data) {
    console.log(data);
  });
  socket.on('end', function() {
    server.close();
  });
}
