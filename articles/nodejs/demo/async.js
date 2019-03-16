// setImmediate(function A() {
//     console.log(1);
//     setImmediate(function B() { console.log(2); });
// });
// setTimeout(function timeout() {
//     console.log('TIMEOUT FIRED');
// });

// setImmediate(function() {
//     console.log(3)
// })

// new Promise((resolve, reject) => {
//     console.log(1);
//     resolve('promise');
// }).then(res => {
//     console.log(res);
// })

// process.nextTick(function() {
//     console.log('nextTick1');
// })

setTimeout(function() {
    console.log('setTimeout');
})

setImmediate(function() {
    console.log('setImmediate')
})


/** 
 *  process.nextTick()  属于微任务，优先于宏任务执行
 *  setImmediate()  属于宏任务，和setTimeout() 的执行先后顺序不一定
*/