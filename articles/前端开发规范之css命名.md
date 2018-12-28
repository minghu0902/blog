
### css命名规范（推荐BEM思想，非常好的规范，是由Yandex团队提出的一种前端命名方法论）

BEM由3部分组成：
*  **B** ———  block（块）
*  **E** ———  element（元素）
*  **M** ———  modifier（修饰符）

命名约定的模式如下：

```html
  <div class="block block--modifier">
      <div class="block__element"></div>
  </div>
```
```css
  .block {}
  .block--modifier {}
  .block__element {}
```
这里的 block 就相当于一个模块，可以看作是命名空间，modifier 是 block 的修饰符（使用两个中划线连接），
element 是 block 下面的子元素（使用两个下划线连接）。

例1：下面的代码是定义了一个简单的头部导航，需求如下：
高亮显示当前菜单文字
```html
  <header class="header">
    <nav class="nav">
      <a class="active" href="/" title="首页">首页</a>
      <a href="/product.html" title="产品中心">产品中心</a>
    </nav>
  </header>
```
```
  .header .nav .active {
    color: blue;
  }
```
如果按平时去写，可能会这样定义，这样写就有两点不好：<br>
1. 如果在写后面的代码的时候也用到了 active 这个类，那可能导致样式覆盖或者冲突
2. 在定义样式的时候多层嵌套会额外增加元素查找的性能开销，虽然多层嵌套无法避免，但是能少则少

如果按照 BEM 规范去命名，则是这样：
```html
  <header class="header">
    <nav class="header__nav">
      <a class="header__nav__a--active" href="/" title="首页">首页</a>
      <a href="/product.html" title="产品中心">产品中心</a>
    </nav>
  </header>
```
```
  .header__nav__a--active {
    color: blue;
  }
```
这样一来不仅成功避免了上面的两个问题，另一方面也增加了代码的可读性，让所以元素之间的关系变得更加紧密，如果别人熟悉 BEM 规范，那么就能很轻易的知道这段代码是什么意思，在团队协作中也能提高开发效率。

例2：利用这个规范我们也可以定义自己css公共样式:
```
  // 公共按钮样式
  .btn { ... } 
  .btn--lg { ... }
  .btn--sm { ... }
  .btn--xs { ... }
  .btn--round { ... }
  .btn--disabled { ... }
  .btn--primary { ... }
  .btn--success { ... }
  .btn--warning { ... }
  
  // 如果某个模块下的按钮和上面的通用按钮样式不一样，则可以继续增加样式定义
  // 分享按钮样式
  .share-btn { ... }
  .share-btn--lg { ... }
  .share-btn--sm { ... }
  .share-btn--xs { ... }
  
  // 公共标题样式
  .tit { ... }
  .tit--h1 { ... }  // 一级标题
  .tit--h2 { ... }  // 二级标题
  .tit--h3 { ... }  // 三级标题
  
  // 全局主题样式
  .g-theme--white { ... }
  .g-theme--black { ... }
  .g-theme--christ { ... }
  
  // ...
```
这样的命名方式不仅看起来清爽，而且实用，方便维护。

**当然也并不是所有的样式都适合用这种方式命名**

比如：<br> 
1. 样式重置(reset.css)<br>
2. 全局通用的的样式，比如：
```css
  .center { text-align: center; }
  .right { float: right; }
  .left { float: left; }
  
  // ...
```
这一类样式并不属于某一个模块，也没有需要修饰的地方，就是单纯的面向属性的命名。
所以在项目中还需要结合真实场景，相互结合使用。

BEM 规范可以说一种高效、强大的命名约定，虽然看起来会很长，但是压缩之后的代码的体积会小很多，同时也可以尽量精简css的命名来优化。


