const fs = require('fs');


const rs = fs.createReadStream('./pfzl.text');
rs.setEncoding('utf8')
rs.on('data', function(chunk) {
    console.log('----------------')
    console.log(chunk);
})