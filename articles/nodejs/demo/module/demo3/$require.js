const path = require('path');
const fs = require('fs');

function $require(id) {
    var filename = path.join(__dirname, id);
    var dirname = path.dirname(filename);
    
    var module = {
        id: filename,
        exports: {}
    };
    var exports = module.exports;
    var code = fs.readFileSync(filename);

    $require.cache = $require.cache || {};

    if($require.cache[filename]) {
        return $require.cache[filename].exports;
    }

    eval(`(function($require, module, exports, __dirname, __filename) {

        ${code}

    })($require, module, exports, dirname, filename)`);

    $require.cache[filename] = module;

    return module.exports;
}

