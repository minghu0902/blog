const net = require('net');

const server = net.createServer(function(socket) {
    socket.on('data', function (data) {
        console.log(data.toString());
        socket.write('hello client');
    })
    socket.on('end', function() {
        console.log('断开连接');
    })
    socket.write('你好');
})

server.listen(8888, function() {
    console.log('server is listening on 8888')
})