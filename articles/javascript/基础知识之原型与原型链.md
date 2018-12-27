## 前言
&emsp;&emsp;了解JavaScript的原型与原型链有助于我们更深层次的理解这门语言，看过很多相关的文章，写的都很好，下面是根据自己的理解，一步步解析原型与原型链
    
<br>
    
## 正文

 ### 一、数据类型
 &emsp;&emsp;在JavaScript中有6种数据类型: String, Number, Boolean, Undefined, Null, Object。（Symbol暂时不讨论），其中String, Number, Boolean, Undefined, Null属于值类型，Object属于引用类型。<br>
### 二、typeof操作符
先来看看使用typeof操作符能返回那些数据类型：

```
    typeof undefined; // 'undefined'
    typeof 100; // 'number'
    typeof '123'; //'string'
    typeof true; //'boolean'
    typeof null; // 'object'
    typeof {}; // 'object'
    typeof []; // 'object'
    typeof function() {}; // 'function'
    typeof /\w/g; 'object'
    typeof new String(); // 'object'
    typeof new Number(); // 'object'
    typeof new Date(); // 'object'
    // ...
```
除了string, number, undefined, boolean基本类型外，函数，对象，正则，null, new String(), new Number(), new Date()都是属于对象，上面可以看出typeof无法检测出引用类型的数据类型。<br>所以typeof一般用来检测基本类型，引用类型的具体数据类型一般都用instanceof操作符，但是要弄清楚其中的原理, 首先需要知道什么是对象？

### 三、什么是对象
> **简单的说，一切引用类型都是对象，对象是属性的集合**

### 四、对象与函数的关系
我们平时开发中大多数情况下会这样写：

```
    var obj = {id: 0, name: 'abc'};
    var arr = [1, 2, 3];
```
上面的写法是一种语法糖，其本质是这样：

```
    var obj = new Object();
    obj.id = 0;
    obj.name = 'abc';
    
    var arr = new Array(1, 2, 3);
```
可以看出，obj和arr都是由函数用过new操作符创建，在这个过程中，经历了4个阶段：
1. 创建一个新对象;
2. 将函数的作用域赋给新对象;
3. 执行函数中的代码;
4. 返回新对象。<br>

在JavaScript的内置对象中，String, Object, Array, RegExp, Date, Function 等对象都是由函数创建。函数创建了对象，函数属于对象，函数自己创建了自己。是时候该prototype上场了。

 ### 五、prototype原型
 > **每一个函数都有一个prototype属性，属性值是一个Object实例对象, 且该对象默认都有一个constructor属性,指向函数本身**
 
```
    function Foo() {};
    Foo.prototype instanceof Object // true
    Foo.prototype.constructor === Foo; // true
```
Object已经为我们证实了这一点

![](https://user-gold-cdn.xitu.io/2018/11/4/166de5fc2f135496?w=514&h=426&f=png&s=50569)

那么先来实现一下：

```
    function User(name) {
        this.id = 0;
        this.name = name;
    };
    User.prototype.getUserName = function() { 
        return this.name;
    };
    
    var user = new User('xm', 10);
    user.getUserName(); // xm
```
 上面的代码中，User是一个函数，user是通过对User函数使用new操作符创建出来的对象，并且能直接调用定义在User函数原型中的方法。可以把这个user打印出来看一下
 
![](https://user-gold-cdn.xitu.io/2018/11/4/166deacb878b7e08?w=319&h=221&f=png&s=15397)
发现这个对象下面有一个__proto__的属性。这个__proto__就是对象身上的隐式原型。

 ###  六、__proto__隐式原型
 > **每一个对象都有一个隐式原型__proto__ , 指向该对象构造函数的prototype的属性**
 
 
```
    //还是上面的代码
    user.__proto__ === User.prototype; // true
```
那么这里也就证实了定义在构造函数prototype原型中的方法和属性是被他的实例所共享的。
由于函数的prototype属性是一个对象，即Object的实例，所以，函数的prototype也有一个隐式原型__proto__，指向Object.prototype，此时就有一个特例，即：

```
    Object.prototype.__proto__ === null; // true
```
同时也就说明不能在沿着__proto__这条链往下走了，也就是原型链的终点。

 ### 七、原型链
 > **当试图得到一个对象的属性时，如果这个对象本身没有这个属性，那么会沿着这个对象的__proto__这条链去找，这就是原型链， 原型链的终点是null**
 
 如图所示:
 
![](https://user-gold-cdn.xitu.io/2018/11/4/166de6fe39ee8df1?w=1021&h=580&f=png&s=93342)


### 八、instanceof操作符
> instanceof操作符用来检测一个构造函数的prototype是否在一个对象的原型链上 

先来看看使用instanceof能返回那些引用类型的数据类型：

```
    (new String('123')) instanceof String; // true
    (new String('123')) instanceof Object; // true
    (new Number(1)) instanceof Number; // true
    (new Number(1) instanceof Object; // true
    (function() {}) instanceof Function; // true
    (function() {}) instanceof Object; // true
    (new Date()) instanceof Date; // true
    (new Date()) instanceof Object; // true
    (/\w/g) instanceof RegExp; // true
    (/\w/g) instanceof Object; // true
    [] instanceof Array; // true
    [] instanceif Object; // true
    ({}) instanceof Object; // true
    
    Object instanceof Function; // true
    Function instanceof Object; // true
    Function instanceof Function; // true
    // ...
```

根据instanceof操作符的检测规则，来分析一下后面3个：

```
    Object.prototype === Function.prototype.__proto__; // true
    Function.prototype.__proto__ === Object.prototype; // true
    Function.protoType === Function.__proto__; // true
```
了解了原型链，instanceof操作符的检测的过程也就知道了。

### 总结
* **所有函数都有一个prototype属性，属性值是一个Object实例对象，即该构造函数实例的原型。**
* **所有对象都有一个__proto__隐式属性，指向这个对象的构造函数的prototype。**
* **当试图得到一个对象的属性时，如果这个对象本身没有这个属性，那么会沿着它的__proto__这条链去找，这条链就是原型链。**
* **原型链的终点是null**
