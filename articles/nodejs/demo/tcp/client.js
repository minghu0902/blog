const net = require('net');

const client = net.connect({ port: 8888 }, function() {
    console.log('client connect');
    client.write('hello server');
})

client.on('data', function(data) {
    console.log(data.toString());
    client.end();
})

client.on('end', function() {
    console.log('client disconnected')
})

