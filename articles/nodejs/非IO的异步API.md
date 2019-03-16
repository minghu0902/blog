### process.nextTick()
> 属于微任务，优先级最高
> idle 观察者
> 回调函数保存在一个数组中，每轮事件循环中会将数组中的回调函数全部执行完

```js
    new Promise((resolve, reject) => {
        console.log(1);
        resolve('promise');
    })

    process.nextTick(function() {
        console.log('nextTick1');
        process.nextTick(function() {
            console.log('nextTick2');
        })
    })

    // 1
    // nextTick1
    // nextTick2
    // promise
```

### setImmediate()
> 属于宏任务，与setTimeout的优先级不一定
> check 观察者
> 回掉函数保存在链表中，每轮事件循环中执行链表中的一个回调函数

```js

    setImmediate(function() {
        console.log('setImmediate')
    })

    setTimeout(function() {
        console.log('setTimeout');
    })

    // setImmediate
    // setTimeout

```

```js

    setTimeout(function() {
        console.log('setTimeout');
    })

    setImmediate(function() {
        console.log('setImmediate')
    })

    // setTimeout
    // setImmediate

```
