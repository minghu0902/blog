
* 标签全部小写
```
  // 不推荐
  <DIV>这是一个块级元素</DIV>
   
  // 推荐
  <div>这是一个块级元素</div>
```
* 使用2个空格作为缩进，不能混用空格和缩进，在 jade 中混用会出错

* html5 属性可以不用引号，推荐使用双引号
```html
  // 不推荐
  <div class=container></div>

  // 推荐
  <div class="container"></div>
```

* 属性等号两边可以使用空格，推荐不用空格
```html
  // 不推荐
  <div class = "container"></div>
  
  // 推荐
  <div class="container"></div>
```
* 推荐属性的顺序依次为 id class 其他属性，保持代码风格统一
```html
  // 推荐
  <input id="login" class="btn" type="button" value="登录">
```

* img 必须加上 alt 属性，在图片不能显示的时能代替图片显示。同时从 seo的角度考虑，搜索引擎的爬虫来爬取网页内容的时候，alt 属性可以告诉其图片的内容
```html
  <img src="./logo.png" alt="文案提示">
```

* button 必须加上 type 属性
```html
  // 不推荐
  <button id="login" class="btn">登录</button>
  
  // 推荐
  <button id="login" class="btn" type="button">登录</button>
```

* 推荐使用语义化标签，同时需考虑兼容性
```html
  // 不推荐
  <div class="header">
    <ul class="nav">
      <li><a href="/" title="首页">首页</a></li>
      <li><a href="/news.html" title="新闻列表">新闻列表</a></li>
    </ul>
  </div>
  <div class="container">
    <div class="article">...</div>
    <div class="article">...</div>
  </div>
  <div class="aside"></div>
  <div class="footer"></div>

  // 推荐
  <header>
    <nav>
      <a href="/" title="首页">首页</a>
      <a href="/news.html" title="新闻列表">新闻列表</a>
    </nav>
  </header>
  <section class="container">
    <article>...</article>
    <article>...</article>
  </section>
  <aside></aside>
  <footer></footer>
```

* 推荐结构和样式分离，不推荐使用行内式
```html
  // 不推荐
  <div style="margin-top: 10px;"></div>
```

* 布尔属性不需要指明属性的值
```html
  // 不推荐
  <input type="text" disabled="disabled">
  
  // 推荐
  <input type="text" disabled>
```
* 使用 data-* 创建自定义属性
```html
  // 不推荐
  <button type="button" code="1">查看详情</button>
  
  // 推荐
  <button type="button" data-code="1">查看详情</button>
```

* 不在自闭合标签的结尾使用 /
```html
  // 不推荐
  <br/>
  
  // 推荐
  <br>
```
* type属性
> 省略样式表与脚本上的 type 属性。鉴于 HTML5 中以上两者默认的 type 值就是 text/css 和 text/javascript，所以 type 属性一般是可以忽略掉的。甚至在老旧版本的浏览器中这么做也是安全可靠的。
```html
  // 不推荐
  <link rel="stylesheet" href="main.css" type="text/css">
  <script src="main.js" type="text/javascript"></script>
  
  // 推荐
  <link rel="stylesheet" href="main.css">
  <script src="main.js"></script>
```

* 不推荐引入资源所带的协议
```html
  // 不推荐
  <script src="http://cdn.com/example.js"></script>
  <script src="https://cdn.com/example.js"></script>

  // 推荐
  <script src="//cdn.com/example.js"></script>
```

* 对于重要元素或者特殊功能模块需要添加注释说明

