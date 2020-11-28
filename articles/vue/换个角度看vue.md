
### 一、函数式组件

#### 特点
  * 无状态(没有响应式数据)
  * 无实例(没有this上下文)


### 二、插槽与函数式组件

* 渲染一个vnode
```js
export default {
  name: 'VNodes',
  functional: true,
  render: (h, ctx) => ctx.props.vnodes
}
```
```html
<template>
  <div>
    <VNodes :vnodes="getItem(slotProps)" />
  </div>
</template>
```

* 零时变量

优化前
```html
<Com v-for="(item, index) of list" :key="index" :value="item">
  {{ result(list.length) }}
</Com>
```

优化后
```js
export default {
  name: 'tempVar',
  functional: true,
  render: (h, ctx) => {
    return ctx.scopedSlots.default && ctx.scopedSlots.default(ctx.props || {})
  }
}
```
```html
<temp-var :res="result(list.length)">
  <template v-slot="{ res }">
    <Com v-for="(item, index) of list" :key="index" :value="item">
      {{ res }}
    </Com>
  </template>
</temp-var>
```

### 三、指令的另一种用途

* v-ref
* v-decorator

