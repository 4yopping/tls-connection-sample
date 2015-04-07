var cluster = require('cluster'),
    Server = require('./Server'),
    Client = require('./Client'),
    os = require('os'),
    count = os.cpus().length,
    workers = {},
    serverKey = 'sample-key.pem',
    serverCert = 'sample-cert.pem',
    clientKey = 'client-key.pem',
    clientCert = 'client-cert.pem';

function spawn(){
    console.log('Spawning a new Client');
    var worker = cluster.fork();
    workers[worker.pid] = worker;
    return worker;
}

if(cluster.isMaster) {
    var server = new Server(serverKey,serverCert,clientCert);
    for(var i = 0; i < count; i++){
        spawn();
        break;
    }
    cluster.on('death',function(worker){
        var wid = worker.process.env['wid'];
        delete workers[worker.pid];
        spawn(wid);
    });
} else {
    var c = new Client(clientKey,clientCert,serverCert);
}
