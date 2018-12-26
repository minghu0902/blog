前言：<br>

看了<<JavaScript高级程序设计>>中的继承篇，总结的非常好，能让我明白为什么现在开发中 JavaScript 的继承大多都是这么实现，并能一步步理解每一种继承的实现方式及优缺点。最终通过了解每一种继承方式的优缺点来实现一个比较完美且常用的 JavaScript 继承模式。

## 正文

### 一、原型链继承
先简单回顾一下函数、原型、实例的关系：

* 每一个函数都有一个原型对象（prototype）。
* 原型对象都包含一个指向构造函数的指针（constructor）。
* 实例都包含一个指向原型对象的内部指针（\_\_proto__）。

看下面的代码：
```
    'use strict';
    
    //父类
    function SuperType() {
        this.superName = '我是父类';
    }
    
    SuperType.prototype.getSuperName = function() {
        return this.superName;
    }
    
    //子类
    function SubType() {
        this.subName = '我是子类';
    }
    
    //通过原型链继承 
    SubType.prototype = new SuperType();
    
    SubType.prototype.getSubName = function() {
        return this.subName;
    }
    
    var instance = new SubType();
    console.log(instance.getSuperName()); //我是父类
    console.log(instance.getSubName()); //我是子类
    
```

以上定义了两个类型，SuperType 和 SubType，SubType 构造函数将 prototype 属性指向了 SuperType 构造函数的实例，以此来实现继承，因为 SuperType 的 prototype 属性是 Object 的实例，所以：

```
    console.log(instance instanceof Object); //true
    console.log(instance instanceof SuperType); //true
    console.log(instance instanceof SubType); //true
    
    console.log(Object.prototype.isPrototypeOf(instance)); //true
    console.log(SuperType.prototype.isPrototypeOf(instance)); //true
    console.log(SubType.prototype.isPrototypeOf(instance)); //true
```

关系图如下所示：


![](https://user-gold-cdn.xitu.io/2018/11/21/16736af6ca716888?w=777&h=672&f=png&s=50733)

由于此时 SubType 的 prototype 属性指向的是 SuperType 的实例，所以会导致 SubType.prototype.constructor 指向 SuperType:

```
    SubType.prototype.constructor === SuperType; // true
```
原型链继承还会带来两个问题：

1、SubType（子类）的实例会共享 SuperType（父类）的引用类型属性，看下面的代码：

```
    'use strict';
    
    function SuperType() {
        this.ids = [0, 1, 2];
    }
    
    function SubType() {};
    
    //通过原型链继承
    SubType.prototype = new SuperType();
    
    var instance1 = new SubType();
    instance1.ids.push(3);
    console.log(instance1.ids); //[0, 1, 2, 3]
    
    var instance2 = new SubType();
    //因为ids属性在 SubType 的 prototype属性上，所以会被 SubType 所有实例共享
    console.log(instance2.ids); //[0, 1, 2, 3]
```
2、在创建 SubType（子类）的时候，不能向 SuperType（父类传参）。

### 二、借用构造函数
借用构造函数的思想比较简单，在子类函数中调用父类函数，将父类函数的执行上下文环境指向子类函数的执行上下文环境，利用了函数的 call 和 apply 方法实现，这样一来，就解决了原型链继承的两大问题。

看下面的代码：
```
    'use strict';
    
    function SuperType(name) {
        this.ids = [0, 1, 2];
        this.name = name;
    }
    
    function SubType(name, age) {
        SuperType.call(this, name);
        this.age = age;
    }
    
    var instance1 = new SubType('xiaoming', 10);
    instance1.ids.push(3);
    console.log(instance1.ids); // [0, 1, 2, 3]
    console.log(instance1.name); // xiaoming
    console.log(instance1.age); // 10
    
    var instance2 = new SubType('xiaohua', 10);
    console.log(instance2.ids); // [0, 1, 2]
    
```
上面的代码可以看出，instance1 和 instance2 都是 SubType 的实例，instance1 对引用类型 ids 属性进行了 push 操作，不会影响到 instance2 的 ids 属性，因为此时的 ids 属性已经挂在到了 实例身上，根据原型链的规则，当一个对象在自身没找到一个属性时，就会去原型上去找，如果在自身找到这个属性，就不会往下找了，所以此时 instance1 和 instance2 对引用类型属性 ids 的操作是不会互不影响的。另外，在继承的时候也是可以传递参数的。这也就解决了原型链继承的两大问题。

如果借用构造函数，也存在一个问题，就是子类的实例共享父类方法的问题，如果方法全部定义在父类构造函数内部，那么每次在实例化的时候就都需要创建一遍方法。因此函数复用就无从谈起了。考虑到这个问题，借用构造函数一般也是很少单独使用。

### 三、组合继承

组合继承是指将原型链继承和借用构造函数组合到一起，通过原型链实现对原型属性和方法的继承，借用构造函数实现对实例属性的继承。在原型链上定义的方法实现了函数复用，又能保证每个实例有自己的属性。

看下面的代码：
```
    'use strict';
    
    function SuperType(name) {
        this.ids = [0, 1, 2];
        this.name = name;
    }
    SuperType.prototype.getName = function() {
        return this.name;
    }
    
    function SubType(name, age) {
        SuperType.call(this, name);
        this.age = age;
    }
    SubType.prototype = new SuperType();
    SubType.prototype.getAge = function() {
        return this.age;
    }
    
    var instance1 = new SubType('xiaoming', 10);
    instance1.ids.push(3);
    console.log(instance1.ids); // [0, 1, 2, 3]
    console.log(instance1.getName()); // xiaoming
    console.log(instance1.getAge()); // 10
    
    var instance2 = new SubType('xiaohua', 10);
    console.log(instance2.ids); // [0, 1, 2]
    console.log(instance2.getName()); // xiaohua
    console.log(instance2.getAge()); // 10
    
```
上面的代码可以看出，instance1 和 instance2 都是 SubType 的实例，他们共享了 SuperType 原型中的 getName 方法，继承了 SuperType 实例的属性，且互不影响，完美融合了原型链继承和借用构造函数的优点。组合继承也是JavaScript中常用的继承模式。

组合继承也有一个缺点，就是无论什么情况下都会调用两次父类的构造函数，一次是在子类构造函数内部，一次是在创建子类原型的时候，这个问题会在寄生组合模式中得到解决。

### 四、原型式继承

原型式继承并没有使用严格意义上的构造函数，原理是借助原型和基于已有的对象创建新对象。与 ECMAScript5 中新增的 Object.create() 方法在传一个参数的情况下行为相同。

看下面的代码：

```
    'use strict';
    
    function createObj(obj) {
        function F() {};
        F.prototype = obj;
        return new F();
    }
    
    var person = {
        name: 'a',
        friends: ['0', '1', '2']
    }
    
    var person1 = createObj(person);
    person1.name = 'b';
    person1.friends.push('3');
    console.log(person1.name); // b
    console.log(person1.friends); // ['0', '1', '2', '3']
    
    var person2 = createObj(person);
    console.log(person2.name); // a
    console.log(person2.friends); // ['0', '1', '2', '3']
```
上面代码的关系图如下：

![](https://user-gold-cdn.xitu.io/2018/11/24/16743c5be9267b8a?w=800&h=603&f=png&s=37819)

在没必要创建构造函数，只想让一个对象共享另一个对象属性方法的时候，原型式继承是完全可以胜任的。但是也有一个和原型链继承一样的缺点，就是包含引用类型值的属性会被共享。就比如上面代码中的 friends 属性，由于是引用类型，所以会被 person1 、person2所共享。

### 五、寄生式继承

寄生式继承与原型式继承相似，也是基于某一个对象创建一个对象，然后创建一个仅用于封装继承过程的函数，该函数内部以某种方式来增强对象。


```
    'use strict';
    
    function createObj(obj) {
        var _obj = Object.create(obj);
        _obj.sayHi = function() {
            alert('Hi');
        }
        return _obj;
    }
```
使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率，即每次调用都会重新创建一遍方法，这一点与借用构造函数类似。在主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。

### 六、寄生组合式继承

组合继承是JavaScript最常用的继承模式，他的缺点在上面也有说过，会调用两次父类的构造函数，这样就会导致父类构造函数内部定义的属性会被子类继承两次，一次会继承在子类实例属性上，另一次会继承在子类原型上。寄生组合式继承就可以很好的解决这个问题，其大致思路和组合继承类似，只是在子类原型的继承上有所不同，我们想要的就只是父类原型的一个副本而已，所以没必要再一次调用父类的构造函数。

所以，先实现一个方法，为了得到父类原型的副本。代码如下：

```
    'use strict';
    
    function inheritPrototype(subType, superType) {
        // 获取父类原型的副本
        var prototype = Object.create(superType.prototype);
        // 为副本添加 constructor 属性，弥补因为重写原型而失去默认的 constructor 属性
        prototype.constructor = subType;
        // 将副本赋值给子类型的原型
        subType.prototype = prototype;
    }
```
完整的示例代码如下：

```
    'use strit';
    
    function SuperType(name) {
        this.name = name;
        this.ids = [0, 1, 2];
    }
    SuperType.prototype.getName = function() {
        return this.name;
    }
    
    function SubType(name, age) {
        SuperType.call(this, name);
        this.age = age;
    }
    
    inheritPrototype(SubType, SuperType);
    
    SubType.prototype.getAge = function() {
        return this.age;
    }
    
    var instance = new SubType('xiaoming', 10);
    
    console.log(SubType.prototype.constructor === SubType); // true
    console.log(instance instanceof SubType); // true
    console.log(instance instanceof SuperType); // true
    console.log(SubType.prototype.isPrototypeOf(instance)); // true
    console.log(SuperType.prototype.isPrototypeOf(instance)); // true
```

这个例子的高效率体现在实例化 SubType 的时候，只会调用一次 SuperType 构造函数。并且也避免了在 SubType.prototype 上创建不必要的属性（即 SuperType 构造函数内部定义的属性）。于此同时原型链保持不变，还能正常使用 instanceof 和 isPrototypeOf()。可以说是集寄生式继承和组合式继承的优点与一身，是实现基于类型继承最有效的方法。

### 总结：

* **原型链继承：**

    原理：将父类的实例直接赋值给子类构造函数的原型。<br>
    缺点：1.子类的实例会共享父类构造函数内部定义的引用类型属性<br>
    &emsp;&emsp;&emsp;2. 在创建子类的时候，无法向父类构造函数传参。
    
* **借用构造函数：**
    
    原理：在子类函数中调用父类函数，将父类函数的执行上下文环境指向子类函数的执行上下文环境，利用了函数的 call 和 apply 方法实现。<br>
    缺点：无法实现公用方法复用，即每次调用父类的构造函数都需要重新创建一遍方法函数。

* **组合继承：**

    原理： 融合了原型链继承与借用构造函数。<br>
    缺点：每次实例化子类的时候，都需要调用两次父类的构造函数，并且会将父类构造函数内部定义的属性挂载到子类的实例和原型两处，使子类的原型上产生了多余的属性。
    
* **原型式继承：**

    原理：在不必定义构造函数的情况下实现继承，实际上是执行对给定对象的浅复制。与Object.create() 在传一个参数的情况下行为相同。
    缺点：与原型链继承类似，包含引用类型值的属性会被共享。
    
* **寄生式继承：**
    
    原理： 与原型式继承类似，基于某个对象创建一个对象，然后为这个对象增加属性和方法来增强对象。
    缺点： 与借用构造函数类似，每次调用都会重新创建一遍方法函数。

* **寄生组合式继承：**

    原理：融合了组合继承与寄生式继承，解决了组合继承中的缺点。是实现基于类型继承最有效的方式。



