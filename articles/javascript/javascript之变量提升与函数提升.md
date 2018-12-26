## 前言
从概念的字面意义上说，"变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，但这么说并不准确。实际上变量和函数声明在代码里的位置是不会动的，而是在编译阶段被放入内存中。

<br>
不多说，直接撸代码吧 ~~~///(^v^)\\\~~~

## 正文
### 什么是变量提升？
> **javascript在被解析的时候，会有一个预解析阶段，这个时候解析器会将当前上下文环境中的所有变量（不包括es6中的let和const声明）和函数声明提升到最前面。**

先来看下面的代码：

```
    'use strict';
    
    console.log(a); // undefined
    var a = 1；
    console.log(a); // 1
```

那么在代码被解析的时候，就是这样：

```
    'use strict';
    
    var a;
    
    console.log(a); // undefined
    
    a = 1;
    
    console.log(a); // 1
```
那么这个过程就很好理解了。<br>
<br>
但是如果有多个同名变量呢？

### 同名变量声明
> **同一作用域下，对于同名变量声明，采用的是忽略原则，后声明的会被忽略，变量的赋值，会采取覆盖原则。**

* **同一作用域下同名变量声明**

看如下代码：

```
    'use strict';
    
    console.log(a); // undefined
    
    var a = 1;
    
    console.log(a); // 1
    
    var a = 2;
    
    console.log(a); // 2
```
解析后的代码如下：

```
    'use strict';
    
    var a;
    
    console.log(a); //undefined
    
    a = 1;
    
    console.log(a); // 1
    
    a = 2;
    
    console.log(a); // 2
```

* **不同作用域下同名变量声明**

代码如下：

```
    'use strict';
    
    console.log(a); // undefined
    
    var a = 1;
    
    function b() {
    
        console.log(a); // undefined
        
        var a = 2;
        
        console.log(a); // 2
    };
    
    b();
```
解析后的代码如下(此处涉及到的执行上下文环境和作用域会另有文章详细说明)：<br>

&emsp;&emsp;1. 首先进入全局上下文环境，此时代码解析如下:
    
```
    'use strict';
    
    function b() {
        console.log(a);
        var a = 2;
        console.log(a);
    };
    
    var a;
    
    console.log(a); // undefined
    
    a = 1;
    
    b();
```
&emsp;&emsp;2. 当执行到调用b函数的时候，进入b函数的上下文环境，b函数的代码被解析时，如下:
    
```
    var a;
    
    console.log(a); // undefined
    
    a = 2;
    
    console.log(a); 2
```

> **在不同作用域中，就近原则，如果在当前作用域中找到，则不再向上一级作用域查找，如果没找到，则会找上一级作用域，一直找到全局作用域。**

所以下面只讨论同一作用域下的情况。
    
### 同名函数声明
> **同一作用域下，对于同名函数声明，采用的是覆盖原则，先声明的会被覆盖。**


代码如下：
```
    'use strict';
        
    console.log(a); // function a() { console.log(2) }
    
    function a() {
        console.log(1);
    };
    
    function a() {
        console.log(2);
    };
    
    console.log(a); // function a() { console.log(2) }
```
解析后的代码如下：

```
    'use strict';
    
    function a() {
        console.log(2);
    };
    
    console.log(a); // function a() { console.log(2) }
    
    console.log(a); // function a() { console.log(2) }
```

### 同一作用域下，同名的函数声明和变量声明
> **对于同名的函数声明和变量声明，采用的是忽略原则，函数声明会提升到变量声明之前，变量声明会被忽略，函数声明有效。**

代码如下：
```
    'use strict';
    
    console.log(a); // function a() {}
    
    var a;
    
    function a() {};
```
解析后的代码如下：

```
    'use strict';
    
    function a() {};
    
    console.log(a); // function a() {}
```

如果存在赋值操作，就会采取覆盖原则。<br>
看如下代码：

```
    'use strict';
    
    console.log(a); // function a() {}
    
    var a = 1;
    
    function a() {};
    
    console.log(a); // 1
```
解析后的代码如下：

```
    'use strict';
    
    function a() {};
    
    console.log(a); // function a() {}
    
    a = 1;
    
    console.log(a); // 1
```

## 总结

* **同一作用域下，对于同名变量声明，采用的是忽略原则，后声明的会被忽略，变量的赋值，会采取覆盖原则。**
* **同一作用域下，对于同名函数声明，采用的是覆盖原则，先声明的会被覆盖。**
* **同一作用域下，对于同名的函数声明和变量声明，采用的是忽略原则，函数声明会提升到变量声明之前，变量声明会被忽略，函数声明有效。**



