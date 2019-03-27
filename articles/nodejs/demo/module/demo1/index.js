

// test1
// const b = require('./b');
// const a = require('./a');

// // 因为 a.js 在 b.js 中加载的时候已经被缓存起来了，且 value 的值也被改了，
// // 此时引入 a.js 的时候，就会从缓存中获取
// console.log(a); // { value: 2 }

// test2
// 如果在引入 a.js 之前，先清除 a.js 的缓存，那么就会重新加载 a.js
const b = require('./b');
delete require.cache[require.resolve('./a.js')];
const a = require('./a');

console.log(a); // { value: 1 }
