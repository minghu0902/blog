
const os = require('os');

function format(betes) {
    return (betes / 1024 / 1024).toFixed(2) + 'MB';
}

function showMem() {
    const mem = process.memoryUsage();
    console.log(`process: rss ${format(mem.rss)} heapTotal ${format(mem.heapTotal)} heapUsed ${format(mem.heapUsed)}`);
}

// 查看 node 进程的内存占用情况
// showMem();

// 查看系统内存占用情况
// console.log(format(os.totalmem()))
// console.log(format(os.freemem()));

// demo1
// function useMem() {
//     let arr = [];
//     const size = 20 * 1024 * 1024;
//     for (let i = 0; i < size; i++) {
//         arr.push(0);
//     }
//     return arr;
// }

// const total = [];
// for (let i = 0; i < 15; i++) {
//     showMem();
//     total.push(useMem());
// }


// demo2
// function useMem() {
//     const size = 200 * 1024 * 1024;
//     const buffer = new Buffer(size);
//     for (let i = 0; i < size; i++) {
//         buffer[i] = 0;
//     }
//     return buffer;
// }

// const total = [];
// for (let i = 0; i < 15; i++) {
//     showMem();
//     total.push(useMem());
// }

// demo3
// const arr = [];
// while(true) {
//     showMem();
//     arr.push();
// }