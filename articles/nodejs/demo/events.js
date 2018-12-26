const EventEmitter = require('events');

// class EventEmitter {
    
//     constructor() {
//         this.domain = undefined
//         this._events = undefined
//         this.__maxListeners = undefined
//     }

//     setMaxListeners() {}
//     getMaxListeners() {}
//     addListener() {}
//     prependListener() {}
//     removeListener() {}
//     removeAllListeners() {}
//     listeners() {}
//     listenerCount() {}
//     eventNames() {}
//     emit() {}
//     on() {}
//     once() {}

//     static EventEmitter() {}
//     static usingDomains() {}
//     static defaultMaxListeners = 10;
//     static init() {}
//     static listenerCount() {}
// }

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();


// 一、事件触发器
// 按照监听器注册的顺序依次调用
// 1. 同步
myEmitter.on('event1', () => {
    console.log('触发了 event1 事件1');
})
myEmitter.on('event1', () => {
    console.log('触发了 event1 事件2');
})

// myEmitter.emit('event1'); 
// 触发了 event 事件1
// 触发了 event 事件2

// 2. 异步
myEmitter.on('event2', () => {
    process.nextTick(() => {
        console.log('触发了 event2 事件1');
    })
})
myEmitter.on('event2', () => {
    console.log('触发了 event2 事件2');
})

// myEmitter.emit('event2');
// 触发了 event2 事件2
// 触发了 event2 事件1


/**
 *  二、事件只处理一次
 *  使用 eventEmitter.once() 可以注册最多可调用一次的监听器。 当事件被触发时，监听器会被注销，然后再调用。
 */
let count = 0;
myEmitter.once('event3', () => {
    console.log(++count);
})

// myEmitter.emit('event3'); // 1;
// myEmitter.emit('event3'); // 不触发

/**
 *  三、error 事件
 *  当 EventEmitter 实例出错，会触发 error 事件
 *  如果没有为 error 事件注册监听器，则当 error 事件触发时，会抛出错误、打印堆栈跟踪、并退出 Node.js 进程。
 *  应该始终为 error 事件添加监听器
 */

 myEmitter.on('error', (err) => {
     console.log(err);
 })

//  myEmitter.emit('error', new Error('错误信息'));
 // 打印错误信息

 /**
  *  四、newListener 事件
  *  回调中有两个参数：
  *     eventName <string> | <symbol> 事件的名称
  *     listener <Function> 事件的句柄函数
  *  EventEmitter 实例在新的监听器被添加到其内部监听器数组之前，会触发自身的 'newListener' 事件
  *  在添加监听器之前触发 'newListener' 事件有一个副作用： 如果在回调中注册同名事件的监听器，则该监听器会被插入到正被添加的监听器前面
  *     
  */

  // 只处理一次，避免无限循环。
myEmitter.once('newListener', (event, listener) => {
    console.log(event);
    myEmitter.on('event4', () => {
        console.log('触发了 event4 事件2');
    })
})

myEmitter.on('event4', () => {
    console.log('触发了 event4 事件1');
})

//   myEmitter.emit('event4');
// events
// 触发了 event4 事件2
// 触发了 event4 事件1

/**
 *  五、removeListener 事件
 *  在listener 被移除后触发，其他特性同 newListener 事件
 */

/**
 *  六、EventEmitter.defaultMaxListeners
 *  默认情况下，每个事件可以注册最多10个监听器
 *  可以使用 emitter.setMaxListeners(n) 方法改变单个 EventEmitter 实例的限制。 
 *  可以使用 EventEmitter.defaultMaxListeners 属性改变所有 EventEmitter 实例的默认值。
 *  设置 EventEmitter.defaultMaxListeners 要谨慎，因为会影响所有 EventEmitter 实例，包括之前创建的。 
 *  因而，优先使用 emitter.setMaxListeners(n) 而不是 EventEmitter.defaultMaxListeners。
 */

// EventEmitter.defaultMaxListeners = 12;

//  myEmitter.on('event5', () => { console.log(++count) });
//  myEmitter.on('event5', () => { console.log(++count) });
//  myEmitter.on('event5', () => { console.log(++count) });
//  myEmitter.on('event5', () => { console.log(++count) });
//  myEmitter.on('event5', () => { console.log(++count) });
//  myEmitter.on('event5', () => { console.log(++count) });
//  myEmitter.on('event5', () => { console.log(++count) });
//  myEmitter.on('event5', () => { console.log(++count) });
//  myEmitter.on('event5', () => { console.log(++count) });
//  myEmitter.on('event5', () => { console.log(++count) });
//  myEmitter.on('event5', () => { console.log(++count) });
//  myEmitter.on('event5', () => { console.log(++count) });

//  myEmitter.emit('event5');


/**
 * 七、emitter.addListener(eventName, listener)
 *  同 emitter.on(eventName, listener), 是 on 的别名
 */

 /**
  *  八、emitter.eventNames()
  *  返回已注册监听器的事件名数组。 数组中的值为字符串或 `Symbol
  */
// console.log(myEmitter.eventNames());

/**
 *  九、emitter.getMaxListeners()
 *  返回 EventEmitter 当前的监听器最大限制数的值，该值可以使用 emitter.setMaxListeners(n) 设置或默认为 EventEmitter.defaultMaxListeners
 */
//  console.log(myEmitter.getMaxListeners());

/**
 *  十、emitter.listenerCount(eventName)
 *  返回正在监听的名为 eventName 的事件的监听器的数量。
 */
// console.log(myEmitter.listenerCount('event4'));

/**
 *  十一、emitter.listeners(eventName)
 *  返回名为 eventName 的事件的监听器数组的副本。
 */
// console.log(myEmitter.listeners('event4'));

/**
 *  十二、emitter.off(eventName, listener)
 *  emitter.removeListener() 的别名
 */

 /**
  *  十二、emitter.on(eventName, listener)
  *  添加 listener 函数到名为 eventName 的事件的监听器数组的末尾。 不会检查 listener 是否已被添加。 
  *  多次调用并传入相同的 eventName 与 listener 会导致 listener 会被添加多次。
  */

/**
 *  十三、emitter.prependListener(eventName, listener)
 *  将事件 listener 监听器添加到 eventName 事件的监听器数组的开头
 */

myEmitter.on('event6', () => {
    console.log('触发 event6 事件1');
})

myEmitter.prependListener('event6', () => {
    console.log('触发 event6 事件2')
})

// myEmitter.emit('event6');
// 触发 event6 事件2
// 触发 event6 事件1

/**
 *  十四、emitter.prependOnceListener(eventName, listener)
 *  将单次事件监听器 listener 添加到 eventName 事件的监听器数组的开头
 */

/**
 *  十五、emitter.removeAllListeners([eventName])
 *  移除全部监听器或指定的 eventName 事件的监听器。
 */

/** 
 *  十六、emitter.removeListener(eventName, listener)
 *  从名为 eventName 的事件的监听器数组中移除指定的 listener。
*/

/**
 *  十七、emitter.setMaxListeners(n)
 *  默认情况下，如果为特定事件添加了超过 10 个监听器，则 EventEmitter 会打印一个警告。 这有助于发现内存泄露。 
 *  但是，并不是所有的事件都要限制 10 个监听器。 emitter.setMaxListeners() 方法可以为指定的 EventEmitter 实例修改限制。 
 *  值设为 Infinity（或 0）表示不限制监听器的数量。
 */
