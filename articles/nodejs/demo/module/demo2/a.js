exports.done = false;
const b = require('./b.js');
console.log(`a.js 中，b.done = ${b.done}`);
exports.done = true;
console.log(`a.js 执行完毕`);