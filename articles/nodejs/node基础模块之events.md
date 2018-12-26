```
  const EventEmitter = require('events');
  
  // 一般使用的时候会重新声明一个类来继承 EventEmitter
  class MyEmitter extends EventEmitter {}
  
  const myEmitter = new MyEmitter();
```

### EventEmitter.defaultMaxListeners
> 默认情况下，每个事件可以注册最多10个监听器。
> 设置 EventEmitter.defaultMaxListeners 会改变所有 EventEmitter 实例的注册监听器的默认值，需谨慎。
> 因而，优先使用 emitter.setMaxListeners(n) 而不是 EventEmitter.defaultMaxListeners。

```
  console.log(MyEmitter.defaultMaxListeners); // 10
  MyEmitter.defaultMaxListeners = 20;
  console.log(MyEmitter.defaultMaxListeners); // 20;
```

### emitter.setMaxListeners(n)
> 为 EventEmitter 的实例 emitter 设置注册监听器数量的最大值。
> 值设为 Infinity（或 0）表示不限制监听器的数量。

### emitter.on(eventName, listener)
> 添加 listener 函数到名为 eventName 的事件的监听器数组的末尾。 不会检查 listener 是否已被添加。 
> 多次调用并传入相同的 eventName 与 listener 会导致 listener 会被添加多次。
> 同 emitter.addEventListener(eventName, listener)，是 on 的别名

1. 同步
```
  myEmitter.on('event1', () => {
    console.log('触发了 event1 事件1');
  });
  myEmitter.on('event1', () => {
    console.log('触发了 event1 事件2');
  });

  // myEmitter.emit('event1'); 
  // 触发了 event 事件1
  // 触发了 event 事件2
```
2. 异步
```
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

```

