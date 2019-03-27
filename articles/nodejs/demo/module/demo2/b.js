exports.done = false;
const a = require('./a.js');
console.log(`b.js 中，a.done = ${a.done}`);
exports.done = true;
console.log(`b.js 执行完毕`);