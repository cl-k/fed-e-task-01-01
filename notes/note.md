# 函数式编程（Functional Programming）



## 为什么要学习函数式编程

- 随着 React 流行受到更多关注
- Vue 3 开始拥抱函数式编程
- 可以抛弃 this
- 打包过程中可以更好的利用 tree shaking 过滤无用代码
- 方便测试、方便并行处理
- 有很多库可以帮助进行函数式开发：lodash、underscore、ramda



## 什么是函数式编程

FP 与常见的面向过程编程、面向对象编程都是编程范式之一

- 面向对象编程思维：把显示世界中的事物抽象成程序世界中的类和对象，通过封装、继承和多态来演示事物事件的联系
- 函数式编程思维：把显示世界的事物和事物之间的联系抽象到程序世界（对运算过程进行抽象）
  - 程序的本质：根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多输入和输出的函数
  - x -> f(联系、映射) -> y, y = f(x) 
  - **函数式编程中的函数不是指程序中的函数（方法），而是数学中的函数映射关系**，e.g.: y = sin(x)
  - 相同的输入始终要得到相同的输出（纯函数）
  - 函数式编程用来描述数据（函数）之间的映射

```javascript
// 非函数式
let num1 = 2
let num2 = 3
let sum = num1 + num2

// 函数式
function add (n1, n2) {
	return n1 + n2;
}
let sum = add(2, 3)
```



## 函数是一等公民

### 前置知识

- 函数是一等公民
- 高阶函数
- 闭包

### 函数是一等公民

MDN First-class Function

- 函数可以存储在变量中
- 函数作为参数
- 函数作为返回值

在 JavaScript 中函数就是一个普通的对象（可以通过 new Function()）,可以把函数存储到变量/数组中，还可以作为另一个函数的参数和返回值，甚至可以在程序运行时通过 new Function() 来构造一个新的函数

- 把函数赋值给变量

```js
// 把函数赋值给变量
let fn = function() {
	console.log('First-class Function')
}
fn

// example
const BlogController = {
	index (posts) { return Views.index(posts) },
	show (posts) { return Views.show(posts) }
}

// 优化 example
const BlogController = {
	index: Views.index,
	show: Views.show
}
```



## 高阶函数

### 什么是高阶函数

- 高阶函数（Higher-order function）
  - 可以把函数作为参数传递给另一个函数
  - 可以把函数作为另一个函数的返回结果
- 函数作为参数

```js
// forEach
function forEach(array, fn) {
	for (let i = 0; i < array.length; i++) {
    	fn(array[i]);
  	}
}


// filter
function filter(array, fn) {
  	let res = [];

  	for (let i = 0; i < array.length; i++) {
    	if (fn(array[i])) {
      		res.push(array[i]);
    	}
  	}

  	return res;
}
```

- 函数作为返回值

```javascript
function makeFn() {
  let msg = 'Haha function';

  return function () {
    console.log(msg);
  }
}

// const fn = makeFn();
// fn();

// makeFn()();

// once 函数，对一个函数只执行一次
function once(fn) {
  let done = false; // fn 未执行标记

  return function() {
    if (!done) {
      done = true;

      return fn.apply(this, arguments)
    }
  }
}

// 测试 once
let pay = once(function(money) {
  console.log(`支付：${money}`)
});

pay(5);
pay(5);
pay(5);
pay(5);
```

###  高阶函数的意义

- 抽象可以帮助屏蔽细节，只需关注目标
- 高阶函数是用来抽象通用的问题
- 代码更简洁

```js
// 面向过程的方式
let arr = [1, 3, 4, 6]
for (let i = 0; i < arr.length; i++) {
	console.log(arr[i])
}

// 高阶函数
forEach(arr, item => {
	console.log(item)
})
```



## 闭包（Closure）

- 闭包：函数和其周围的状态（词法环境）的引用捆绑在一起形成闭包
  - 可以在另一个作用域中调用一个函数的内部函数并访问该函数的作用域中的成员

```js
function makeFn() {
  let msg = 'Haha function';

  return function () {
    console.log(msg);
  }
}

// const fn = makeFn();
// fn();
```

- 闭包的本质：函数在执行的时候会放到一个执行栈上，当函数执行完毕后会从执行栈上移除，但是堆上的作用域成员因为被外部引用不能释放，因此内部函数依然可以访问外部函数的成员

## 纯函数

### 纯函数概念

- 纯函数：**相同的输入永远会得到相同的输出**，而且没有任何可观察的副作用
  - 纯函数类似数学中的函数（用来描述输入和输出之间的关系），y = f(x)
- lodash 是一个纯函数的功能库，提供了对数组、数字、对象、字符串、函数等操作的一些方法
- 数组的 slice 是纯函数，splice 是非纯函数
  - slice 返回函数中的指定部分，不会改变原数组
  - splice 对数组进行操作返回该数组，会改变原数组
- 函数式编程不会保留计算中间的结果，所以变量是不可变的（无状态的）
- 可以把一个函数的执行结果交给另一个函数去处理

### 纯函数的好处

- 可缓存
  - 因为纯函数对相同的输入始终有相同的结果，所以可以把纯函数的结果缓存起来
- 可测试
  - 纯函数让测试更方便
- 并行处理
  - 在多线程环境下并行操作共享的内存数据很可能会出现意外情况
  - 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数（Web Worker）

### 函数的副作用

```js
// 不纯的
let mini = 18
function checkAge(age) {
	return age >= mini
}

// 纯的（有硬编码，后续可以通过柯里化解决）
function checkAge(age) {
	let mini = 18
	return age >= mini
}
```

副作用让一个函数变得不纯（如上），根据纯函数相同的输入返回相同的输出，若**函数依赖于外部的状态**则无法保证输出相同，因此带来副作用

副作用的来源：

- 配置文件
- 数据库
- 获取用户的输入
- 其他...

所有外部交互都有可能带来副作用，副作用也会使方法通用性下降不适合扩展和可重用，同时副作用会给程序带来安全隐患（跨站脚本共攻击...）给程序带来不确定性，但副作用不可能完全禁止，尽可能控制它们在可控范围内发生。

## 柯里化

```js
// function checkAge(age) {
//   let min = 18;
//   return age >= min;
// }

// 普通的纯函数
// function checkAge(min, age) {
//   return age >= min;
// }

// console.log(checkAge(18, 20));
// console.log(checkAge(18, 24));
// console.log(checkAge(22, 24));

// 函数的柯里化
// function checkAge(min) {
//   return function (age) {
//     return age >= min
//   }
// }

// ES6 写法
let checkAge = min => (age => age >= min);

let checkAge18 = checkAge(18);
let checkAge20 = checkAge(20);

console.log(checkAge18(20));
console.log(checkAge18(24));
```

- 柯里化（Currying）

  - 当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变）
  - 然后返回一个新的函数接收剩余的参数，返回结果

- lodash 中的柯里化函数

  - _.curry(func)

    - 功能：创建一个函数，该函数接受一个或多个 func 的参数，如果 func 所需要的参数都被提供则执行 func 并返回执行的结果，否则继续返回该函数并等待接收剩余的参数
    - 参数：需要柯里化的函数
    - 返回值：柯里化后的函数

    ```js
    const _ = require('lodash');
    // 要柯里化的函数
    function getSum(a, b, c) {
      return a + b + c;
    }
    // 柯里化后的函数
    const curried = _.curry(getSum);
    
    console.log(curried(1, 2, 3))
    
    console.log(curried(1)(2, 3))
    
    console.log(curried(1, 2)(3))
    ```

- 总结
  - 柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
  - 这是一种对函数参数的缓存（使用了闭包）
  - 让函数变得更灵活，让函数的粒度更小
  - 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能

## 函数组合（Compose）

- 纯函数和柯里化很容易写出洋葱代码： h(g(f(x)))
  - 例子：获取数组的最后一个元素再转换成大写字母：_.toUpper(_.first(_.reverse(array)))
- 函数组合可以把细粒度的函数重新组成一个新的函数

### 管道

- a -> fn -> b ，fn 函数输入参数啊， 返回b
- a -> f3 -> f2 -> f1 -> b, 把fn 拆分成多个小函数

```
fn = compose(f1, f2, f3)
b = fn(a)
```

### 函数组合

- 函数组合（compose）：如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数

  - 函数就像是数据的管道，函数组合九十八这些管道连接起来，让数据通过多个管道形成最终结果
  - 函数组合默认是**从右到左**执行。

- lodash 中的组合函数

  - flow() 或者 flowRight(), 都可以组合多个函数
  - flow() 是从左到右运行
  - flowRight() 是从右到左运行，使用的更多一些

- 函数的组合要满足结合律（associativity)

  - 既可以把 g 和 h 组合，也可以把 f 和 g 组合，结果都是一样的

  ```js
  // 组合率
  let f = compose(f, g, h)
  let associative = compose(compose(f, g), h) == compose(f, compose(g, h)) // ture
  ```

- 如何调试组合函数

  - 写一个trace 去进行跟踪

## Point Free

Point Free: 可以把数据处理的过程定义成与数据无关的合成运算，不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起，在使用这种模式之前需要定义一些辅助的基本运算函数

- 不需要指明处理的数据
- **只需要合成运算过程**
- 需要定义一些辅助的基本运算函数

```js
const f = fp.flowRight(fp.join('-'), fp.map(_.toLower), fp.split(' '));
```

- 案例

```js
// 非 Point Free 模式
// Hello World => hello_world
function f (word) {
	reutrn word.toLowerCase().replace(/\s+/g, '_')
}

// Point Free 模式
const fp  = require('lodash/fp');
const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)

console.log(f('Hello       World'))
```

point free 的实现方式其实就是函数的组合

## 函子（Functor）

### 为什么要学函子

函子可以把函数式编程中的副作用控制在可控范围内，也可以进行异常处理，异步操作等

### 什么是 Functor

- 容器：包含值和值的变形关系（这个变形关系就是函数）
- 函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有 map 方法，map 方法可以运行一个函数对值进行处理（变形关系）

### 总结

- 函数式编程的运算不直接操作值，而是有函子完成
- 函子就是一个实现了 map 契约的对象
- 可以把函子想象成一个盒子，这个盒子里封装了一个值
- 想要处理盒子中的值，需要给盒子的 map 方法传递一个处理值的函数（纯函数），由这个函数对值进行处理
- 最终 map 方法返回一个包含新值的盒子（函子）

### MayBe 函子

- 在编程过程中可能会遇到很多错误，需要对这些错误做相应的处理
- MayBe 函子的作用就是可以对外部的空值情况做处理（控制副作用在允许的范围）
- 弊端：但并不知道是具体在哪一步出现了空值

### Either 函子

- Either 两者中的任何一个，类似于 if...else... 的处理
- 异常会让函数变得不纯，Either 函子可以用来做异常处理，会给出有效的提示信息

### IO 函子

- IO 函子中的 _value 是一个函数，这里是把函数作为值来处理
- IO 函子可以把不纯的动作存储到 _value 中，延迟执行这个不纯的操作（惰性执行），包装当前的纯操作
- 把不纯的操作交给调用者来处理

### Task异步执行

- 异步任务的实现过于复杂，使用 folktale 中的 Task 来演示
- folktale 一个标准的函数式编程库
  - 和 lodash、ramda 不同的是它没有提供很多功能函数
  - 只提供了一些函数式处理的操作，如：compose、curry等，一些函子 Task、Either、MayBe 等

### Pointed 函子

- pointed 函子是实现了 of 静态方法的函子
- of 方法是为了避免使用 new 来创建对象，更深层的含义是 of 方法用来把值放到上下文 Context (把值放到容器中，使用 map 来处理值)

### Monad （单子）函子

- 可以来解决 IO 函子调用嵌套函子不方便的问题
- Monad 函子是可以边扁的 Pointed 函子，IO(IO(x))
- 一个函子如果具有 join 和 of 两个方法并遵守一些定律就是一个 Monad

