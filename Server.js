var tls = require('tls');
var fs = require('fs');

module.exports = function Server(key,cert,clientCert){

  var options = {
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),

    requestCert: true,
    ca: [ fs.readFileSync(clientCert) ]
  };

  var server = tls.createServer(options, function(socket) {
    console.log('server connected',
                socket.authorized ? 'authorized' : 'unauthorized');
    socket.write("welcome!\n");
    socket.setEncoding('utf8');
    socket.pipe(socket);
  });
  server.listen(8000, function() {
    console.log('server bound');
  });

}
