[toc]
- JavaScripy是什么
- 发展历史
- 原理
- 三个部分组成

## 1. 初识JavaScript

### 1.2 JavaScript是什么

- 运行在客户端的脚本语言
- 脚本语言，不用编译，需要js解释器逐行解释并且执行
-  Node.js服务端编程

### 1.3 HTML/CSS/JS的关系

- 人
- 衣服
- 动作

### 1.4 浏览器执行JS简介

浏览器分为两部分

- 渲染引擎：用来解析HTML与CSS，俗称内核，之前讲过
- JS引擎：JS解释器，用来读取网页中的JavaScript代码，对其处理后运行 

在逐行读取HTML的时候，读到JS代码，JS引擎就会将其转换成0101的机器语言。翻译一句执行一句。

### 1.5 JS的组成

- ECMAScript： JavaScript语法
  - JavaScript：网景公司
  - Jscript：微软公司 
- DOM： 页面文档对象模型。对各种**浏览器元素**进行操作。
- BOM： 浏览器对象模型。**浏览器发生变化的时候调用**

### 1.6 JS初体验

三种书写位置

- 行内
- 内嵌
- 外部

#### 1.6.1 行内式 JS

- 可以将单行或少量JS写在HTML标签的事件属性中（以on开头的属性），如onclick
- 注意单双引号，HTML->双引号， JS->单引号
- 可读性差，不方便阅读
- 引号多层匹配的时候，很容易弄混
- 特殊情况下使用

#### 1.6.2. 内嵌式 JS

```html
<script>
	alert('Hello World')
</script>
```



- 写在`<script>`标签中
- 内嵌JS是学习时经常用的方式

#### 1.6.3 外部JS

```html
<script src="my.js"><!-- 这里一定不准写代码 --></script>
```

- 利于HTML结构化，独立在HTML之外，美观，也方便复用
- 引用外部JS文件的script标签中间不可以写代码
- 适合于JS代码比较大的情况

### 1.7 JavaScrip注释

和java/C++的语法一样

- 单行注释 `ctri+/`
- 多行注释`shift + alt + a`

### 1.8 JavaScrip输入输出语句

| 方法             | 说明                               | 归属   |
| ---------------- | ---------------------------------- | ------ |
| prompt(info)     | 浏览器弹出**输入框**，用户可以输入 | 浏览器 |
| console.log(msg) | 浏览器控制台**打印输出**信息       | 浏览器 |
| alert(msg)       | 浏览器弹出**警示框**               | 浏览器 |



## 2. 变量

- 说出变量的主要作用
- 变量的初始化
- 说出变量的命名规范
- 画出变量如何在内存中存储的
- 交换变量案例



### 2.1 什么是变量

一个装东西的**盒子**，一个存放数据的 **容器**



### 2.2 变量在内存中的存储

变量是程序在内存中申请的一块用来存放数据的空间

### 2.2 变量的使用

1. 声明
2. 赋值

var是一个JS关键字，用来声明变量。（variable变量的意思）。使用该关键字声明变量后，计算机会自动为变量分配内存空间，不需要程序员接管。 

```javascript
// 声明变量
var age;
// 赋值
age = 18;
// 输出
console.log(age)
// 直接初始化
var age = 19;
```



弹出一个输入框，保存用户的输入

弹出对话框，输出用户输入的姓名

```javascript
// 1. 用户输入姓名
var myname = prompt('输入您的姓名');
// 2. 输出
alert(myname)
```

### 2.3 变量语法扩展

#### 2.3.1 变量更新

一个变量被重新赋值后，他**原有的值就会被覆盖**，变量值将**以最后一次赋值为准**

#### 2.3.2 声明多个变量

```javascript
var age = 18,
    name = "小明";
```

#### 2.3.3 特殊情况

| 情况                        | 说明                     | 结果                               |
| --------------------------- | ------------------------ | ---------------------------------- |
| var age; console.log(age);  | 只声明 不赋值            | undefined                          |
| console.log(age)            | 不声明，不赋值，直接使用 | 报错                               |
| age = 10; console.log(age); | 不声明，只赋值           | 10<br />**会变成全局变量，不推荐** |

上面要是出错后，下面就不会执行。因为是一条条编译执行的。



### 2.4 变量命名规范

- 字母，数字，下划线，美元符号组成
- 严格区分大小写
- 不能数字开头
- 不能是关键字
- 变量名要又意义
- 驼峰命名法。首字母小写，后面首字母大写





## 3. 数据类型

- 说出物种简单数据类型
- 用typeof获取变量类型
- 说出1~2种转换为数值型的方法
- 说出1~2种转换为字符型的方法
- 说出什么是隐式转换



### 3.1 为什么需要数据类型

不同数据占据的存储空间不同。为了充分利用存储空间，所以定义了不同数据类型



### 3.2 JS中的数据类型

js的变量数据类型是只有在程序在运行过程中，**根据等号右边的值来确定的，也因此可以随意变换**（跟python一样）

- 简单数据类型（Number， String， Boolean， Undefined， Null）

  | 简单数据类型 | 说明                                             | 默认值    |
  | ------------ | ------------------------------------------------ | --------- |
  | Number       | 数字型 包含**整形（8、10、16进制）**和**浮点型** | 0         |
  | Boolean      | 布尔值类型，代表0，1                             | false     |
  | String       | 字符串，带引号                                   | ""        |
  | Undefined    | var a; 没有赋值                                  | undefined |
  | Null         | var a = null; 为空值                             | null      |

  

- 复杂数据类型（Object）



#### 3.2.1 Number类型

##### 3.2.1.1 进制

- 0开头是8进制
- 0x开头16进制

```javascript
//1.八进制数字序列范围∶O~7
var numl = 07; // 对应十进制的7
var num2 = 019; // 对应十进制的19
var num3 = 08; // 对应十进制的8
//2.十六进制数字序列范围∶0~9以及A~F
var num = 0xA;
```

##### 3.2.1.2 数字类型范围

JavaScript中数值的最大和最小值

```javascript
alert(Number.MAx_VALUE); // l 1.7976931348623157e+308
alert (Number.MIN_VALUE); // 5e-324

```

##### 3.2.1.3 特殊值

JavaScript中数值的最大和最小值

```javascript
alert ( Infinity); // Infinity
alert(-Infinity); // -Infinity
alert(NaN); // NaN

```

- lnfinity ，代表无穷大，大于任何数值
- -Infinity ，代表无穷小，小于任何数值
- NaN ，Not a number，代表一个非数值

`isNaN()`用来判断非数字，返回一个值

```javascript
console.log(isNaN(12)); // false
console.log(isNaN('12')); // false
console.log(isNaN('?')); // true
```



#### 3.2.2 String类型

```javascript
var strMsg = "我爱北京天安门~"; //使用双引号表示字符串
var strMsg2 = '我爱吃猪蹄~'; //使用单引号表示字符串
//常见错误
var strMsg3 = 我爱大肘子;
//报错，没使用引号，会被认为是js代码，但js没有这些语法

```

- `字符串.length` = 字符串长度
- 字符串 + 任意类型 = 字符串
- 没有类似format的聪明方法

使用引号括起来。**由于HTML里标签使用双引号，JS里面推荐使用单引号**

**JS支持引号嵌套**（和python一样





#### 3.2.3 小案例

**undefined的相加**

```javascript
var variable = undefined;
console.log(variable + 'pink'); // undefinedpink
console.log(variable + 1); //NaN  undefined和数字相加最后的结果是NaN

```

**null的相加**

```javascript
var space = null;
console.log(space + 'pink '); //  nullpink
console.log(space + true); // 1

```



### 3.3 检测变量的数据类型

typeof可以用来获取检测变量的数据类型

```javascript
var num = 10;
console.log(typeof num); // number
var str = 'uncledong';
console.log(typeof(str)); // string
console.log(typeof null); // Object
```

**根据浏览器输出颜色看变量类型**

```javascript
console.log(18); // chrome: 蓝色, firefox: 绿色
console.log('18'); // 黑色
console.log(true); // chrome: 蓝色, firefox: 绿色
console.log(undefined); // 浅灰色
console.log(null); // 浅灰色
```

![image-20201004210105093](C:\Users\DAN\AppData\Roaming\Typora\typora-user-images\image-20201004210105093.png)



### 3.4 字面量

字面量是在源代码中的一个**固定值**的表示法。

### 3.5 数据类型转换

表单、prompt获得的数据**默认是字符串类型**的，此时不能直接简单的进行加法运算，需要进行 **类型转换**

- 转换为字符串类型

  | 方法             | 说明                       | 案例                                  |
  | ---------------- | -------------------------- | ------------------------------------- |
  | toString()       | 转换成字符串               | var num = 1; alert(numtoString());    |
  | String()强制转换 | 转换成字符串               | var num = 1; alert(String(num));      |
  | 加号拼接字符串   | 和字符串拼接好的都是字符串 | var num = 1; alert(String(num + '')); |

  

- 转换为数字型

  | 方法                   | 说明                         | 案例                                                         |
  | ---------------------- | ---------------------------- | ------------------------------------------------------------ |
  | parselnt(string)函数   | 将string类型转换成整数数值型 | parselnt('78.9') -> 78(被取整了，不会四舍五入)<br />parseInt('120px') -> 120(会去掉数字后面非数字的东西)<br />机制：先看是否有数字，如果没有数字的话就是NaN <br />parseInt('121a1a1a')) -> 121<br />parseInt('a21a1a1a')) -> NaN |
  | parseFloat(String)函数 | 转换成浮点数值               | parseFloat('78.1')                                           |
  | Number()强制转换       | 转换成数值型                 | Number(‘12’)                                                 |
  | js隐式转换( 加减乘除 ) | 利用算术运算隐式转换成数值型 | console.log('12' - 0)                                        |

  

- 转换为布尔型

  | 方法          | 说明                                                         | 案例            |
  | ------------- | ------------------------------------------------------------ | --------------- |
  | Boolean()函数 | 其他类型转换成布尔值<br />代表 **空或者否定**的值会被转换成false，如0, NaN, null, undefined | Boolean('true') |

```javascript
console.log (Boolean ( "')); // false
console.log (Boolean(o)); // false
console.log (Boolean (NaN)); // false
console.log (Boolean (null)); // false
console.log (Boolean (undefined)); // false
console.log (Boolean (小白')); // true
console.log (Boolean (12)); // true
```

### 3.6 额外扩展

- 能够知道解释性语言和编译型语言的特点
- 能够知道标识符不能是关键字或者保留字

#### 3.6.1 解释型语言和编译型语言

计算机不能直接理解机器语言之外的语言，因此需要把程序员的高级语言f安艺城机器语言才能执行。

翻译器翻译的方式有两种，区别在于**编译的时间点不同**

- 编译：**代码执行之前进行编译**，生成中间代码文件
- 解释：**运行时进行及时解释**，立即执行

#### 3.6.2 标识符、关键字、保留字

**标识符**：开发人员为变量、参数、属性、函数取的名字。

**关键字**：编程语言已经使用了的字，不能再用来当作变量名，方法名

**保留字**：预留的关键字。现在还不是关键字，以后有可能成为关键字

## 4. 数组

- 为什么要有数组
- 能够创建数组
- 能够获取数组中的元素
- 能够对数组进行遍历
- 能够给数组增添一个元素
- 能够独立完成冒泡排序的案例





### 4.1 数组创建

- new创建数组
- 利用数组 **字面量** 创建数组

```javascript
// new出来
var 数组名 = new Array();
// 字面量
var 数组名 = []
```



### 4.2 数组基本操作

- 数组名.length获取长度

- 通过索引号直接添加元素

  ```javascript
  var arr1 = [ 'red', 'green', 'blue'];
  arr1[3]= 'pink';
  console.log(arr1);
  
  ```

  



## 5. 函数

```javascript
// 声明方式1
function 函数名(形参1, 形参2){
    // 函数体
    
    return 返回值;
}

// 声明方式2，该函数没有名字，所以是匿名函数
var 变量名 = function(){};
```

如果实参和形参不匹配，未匹配的形参将会变成undefined

两种声明方式

1. 利用函数关键字`function`
2. 函数表达式。只有变量名没有函数名，因此称为 **匿名函数**





## 6. 作用域

- 两种作用域
- 区分全局变量和局部变量
- 说出如何在作用域链中查找变量的值



### 6.1 作用域概述

一段程序代码中所用到的名字并不总是有效和可用的，而限定这个名字的可用性的代码范围就是这个名字的作用域。作用域的使用提高了程序逻辑的局部性，增强了程序的可靠性，减少了名字冲突。

1. 全局作用域：整个script标签，或者是一个单独的js文件
2. 局部作用域：在函数内部就是局部作用域。



### 6.2 变量作用域

1. 全局变量：在全局作用域声明的、在函数内部，没有声明`var`直接声明的。
2. 局部变量：局部作用域声明的变量，函数参数
3. 执行效率
   1. 全局变量只有在浏览器关闭的时候才会销毁，比较占用内存资源
   2. 程序执行完毕就会销毁



### 6.3 JS没有块级作用域

块级作用域就是`{}`中包含的定义，以下代码在别的语言是不会通过的。

```javascript
if (3 < 5) {
    var num = 10;
}
console.log(num)
```





### 6.4 作用域链

```javascript
var num = 10;

// 作用域链 内部函数访问外部函数的变量，采取的是链式查找的
function fn() { // 外部函数
    var num = 20;
    
    function fun() { // 内部函数
        console.log(num)
    }
}
```

最里面输出num的时候，一层层的往上找，找到那个num就用哪个num



## 7. JS预解析

- 解析器运行JS分为哪两步
- 说出变量提升的步骤和运行过程
- 函数提升的步骤和运行过程

```javascript
// 例1
console.log(num); 
// 报错 Uncaught ReferenceError: num is not defined

// 例2
console.log(num); // undefined
var num = 10;

// 例3
fn(); // 输出11
function fn() {
    console.log(11);
}

// 例4
fun(); 
// 报错 Uncaught TypeError: fun is not a function
var fun = function {
    console.log(11);
}

```

JavaScript代码是由浏览器中的**JavaScript解析器(JS引擎)**来执行的。JavaScript解析器在运行JavaScript代码的时候分为两步 **预解析和代码执行**

- 预解析：js引擎会把js里面的**所有var和function**提升到**当前作用域**的**最前面**
  - 变量提升：把所有变量声明提升到**当前作用域**最前面，**不提升赋值操作**
  - 函数提升：把所有的**函数声明**提升到最前面，不调用函数。**赋值方式定义函数没法函数提升，因为有var，属于变量提升**
- 按照代码书写的顺序从上往下执行



### 7.1 案例1

```javascript
var num = 10;
fun();
function fun() {
    console.log (num);
    var num = 20;
}

// 变量提升后的结果
var num

function fun() {
    var num;
    console.log (num);
    num = 20;
}

num = 10;
fun(); // undefined
```



### 7.2 案例2

```javascript
var num = 10;

function fun() {
    console.log (num);
    var num = 20;
    console.log (num);
}
fun();// undefined, 20
```



### 7.3 案例3

```javascript
var a = 18;
fun(); // undefined, 9
function fun() {
    var b = 9;
    console.log (a);
    console.log (b);
    var a = '123';
}
fun();// undefined, 9
```


### 7.4 案例4

```javascript
f1();
console.log (c);
console.log (b);
console.log (a);

function f1() {
    var a = b = c = 9;
    console.log(a);
    console.log(b);
    console.log(c);
}

var a = b = c = 9; -> var = 9; b = 9; c = 9; // b和c前面没有var
// 集体声明如下
var a = 9, b = 9, c = 9;

// 以下为代码提升
function f1() {
    var a;
    a = b = c = 9;
    console.log(a); // 9
    console.log(b); // 9
    console.log(c); // 9
}
f1();
console.log (c); // 9
console.log (b); // 9
console.log (a); // undefined


```





## 8. JS对象

- 为什么需要对象
- 能够使用字面量创建对象
- 能够使用构造函数创建对象
- 能够说出new的执行过程
- 能够遍历对象



### 8.1 什么是对象

对象是一个**具体的事物**，由**属性**和**方法**组成。

- 属性是事物的**特征**
- 方法是事物的**行为**



### 8.2 创建对象的方式



#### 8.2.1 字面量创建对象

使用`{}`，采用键值对保存属性和值

```javascript
var obj = {} // 创建了一个空的对象
var obj = {
    username : '张三丰',
    age : '24', 
    sex: '男',
    sayHi : function() {
        console.log('hi~')
    }
}
```

两种调用方法

```javascript
// 方法1
console.log(obj.username);
// 方法2
console.log(obj['username']);
// 方法1调用函数
obj.sayHi();
// 方法2调用函数
obj.sayHi();
```





#### 8.2.2 new Object创建对象

直接新建后，赋值属性和方法

```javascript
// 新建对象
var obj = new Object();
// 属性赋值
obj.username = '张三丰';
obj.sayHi = function() {
        console.log('hi~')
    }
```





#### 8.2.3 构造函数创建对象

之前两种创建对象的方式一次只能创建一个对象，每次都要重新写所有的方法

```javascript
// 构造函数的语法格式
function 构造函数吗() {
    this.属性 = 值;
    this.方法 = function() {
        
    }
}
// 新建对象
new 构造函数名();

// 构造四大天王
function Star(uname, age, sex) {
    this.name = uname;
    this.age = age;
    this.sex = sex;
}
// 新建对象
var liudehua = new Star('刘德华', 18, '男')
console.log(liudehua)
/*
Star
age: 18
name: "刘德华"
sex: "男"
__proto__:
constructor: ƒ Star(uname, age, sex)
__proto__: Object
*/
```

1. 构造函数名字首字母要大写
2. 构造函数不需要return就能返回结果
3. 调用构造函数必须要用new
4. 调用之后就能得到一个对象
5. 属性和方法前面要有`this`



#### 8.2.4 调用new发生了啥

1. new在内存中创建了一个空的对象
2. this会指向刚才创建的空对象
3. 执行构造函数，给空对象添加属性和方法
4. 返回这个对象（new自动返回，不用写return）

#### 8.2.5 遍历对象所有属性

属性和方法都能遍历出来

```javascript
for (属性（key） in 对象){
    console.log(属性);
    console.log(对象[属性]);
}
```



## 9. JS内置对象

- JS分为三种对象：自定义对象，内置对象，浏览器对象

**推荐查阅文档 MDN**

https://developer.mozilla.org/zh-CN/

### 9.1 Math对象

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math

Math对象不是 **构造器（构造函数）**，里面的方法都是静态的。因此可以直接调用

不能出现字符串 -> NaN

**封装自己的数学对象**

```javascript
var myMath = {
	PI: 3.141592653, 
    // 使用argument接受所有参数
    max: function() {
        var max = arguments[0];
        for (var i = 1; i < arguments.length; i++){
            if (arguments[i] > max){
                max = arguments[i];
            }
        }
       return max;
    },
    // 使用argument接受所有参数
    min: function() {
        var min = arguments[0];
        for (var i = 1; i < arguments.length; i++){
            if (arguments[i] < min){
                min = arguments[i];
            }
        }
       return min;
    }

}
```

### 9.2 日期对象

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date

```javascript
var date = new Date();
console.log(date)

date2 = new Date(2019,0,1); // 下标从0开始，January
```



| 方法名        | 说明                    | 代码               |
| ------------- | ----------------------- | ------------------ |
| getFullYear() | 获得当前年              | dObj.getFullYear() |
| getMonth()    | 获取当前月(0-11)        |                    |
| getDate()     | 当前日期                |                    |
| getDay()      | 当前星期几(周日0-周六6) |                    |
| getHours()    | 当前小时                |                    |
| getMinutes()  | 当前分钟                |                    |
| getSeconds()  | 当前秒钟                |                    |

学方法四部曲

1. 方法是干什么的
2. 参数是什么
3. 结果是什么
4. demo测试

使用三元运算符让日期输出更加美观

```javascript
var time = new Date();
var h = time.getHours();
h = h < 10 ? '0' + h : h;
var m = time.getMinutes();
m = m < 10 ? '0' + m : m;
var s = time.getSeconds(;
s = s < 10 ? '0' + s : s;
return h +':'+m+ ':'+ s;
```



### 9.2.1 获取毫秒

Date对象基于**1970.1.1**的毫秒数开始计算的

```javascript
// 1. 普通方法
var date = new Date();
console.log(date.valueof()); // 现在时间距离1970.1.1的毫秒数
console.log(date.getTime()); // 跟上面一样

// 2. 最通用的方法
var date1 = +new Date(); // 直接返回总的毫秒数

//3. H5新增的方法
console.log(Date.now());
```

毫秒数是永远不会重复的，因此作为**时间戳**

**倒计时算法**

- d = parselnt(总秒数/60/60/24); // 计算天数
- h = parselnt(总秒数/60/60%24); // 计算小时
- m = parselnt(总秒数/60%60); // 计算分数
- s = parselnt(总秒数%60); // 计算当前秒数

```javascript
function countDown(time){
    // 返回当前时间总毫秒数
    var nowTime = +new Date();
    // 用户输入时间的总毫秒数
    var inputTime = +new Date(time);
    // 剩余时间毫秒数
    var times = (inputTime - nowTime) / 1000;
    
    d = parselnt(times/60/60/24); // 计算天数
	h = parselnt(times/60/60%24); // 计算小时
	m = parselnt(times/60%60); // 计算分数
	s = parselnt(times%60); // 计算当前秒数
    return d + '天:' + h + '时' + m + '分' + S + '秒'﹔

}
```

### 9.3 数组对象

```javascript
var arr1 = new Array(2); // 一个数组，两个空的位置
var arr1 = new Array(2, 3); // 一个数组，两个填充满的
```



#### 9.3.1 判断是否为数组

1. instanceof 运算符 可以检测是否为数组

   ```javascript
   var arr = [];
   console.log(arr instanceof Array);
   ```

2. Array.isArray(变量)

#### 9.3.2 数组元素增删

| 方法名             | 说明                                           | 返回值       |
| ------------------ | ---------------------------------------------- | ------------ |
| push(参数1...)     | 末尾添加一个或者多个<br />修改原数组           | 返回新的长度 |
| pop()              | 删除数组最后一个<br />无参数，对原数组进行修改 | 返回删除的值 |
| unshiift(参数1...) | 开头添加一个或多个<br />修改原数组             | 返回新长度   |
| shift()            | 删除数组第一个元素<br />修改原数组             | 返回删除的值 |

#### 9.3.3 数组索引

| 方法名        | 说明                           | 返回值                                 |
| ------------- | ------------------------------ | -------------------------------------- |
| indexOf()     | 数组中查找给定元素的第一个索引 | 存在：返回索引编号<br />不存在：返回-1 |
| lastIndexOf() | 数组中查找元素的最后一个索引   | 存在：返回索引编号<br />不存在：返回-1 |

#### 9.3.4 数组转换字符串

| 方法名         | 说明                               | 返回值     |
| -------------- | ---------------------------------- | ---------- |
| toString()     | 数组转换成字符串，逗号分隔开每一项 | 返回字符串 |
| join('分隔符') | 把所有元素转换成字符串             | 返回字符串 |

### 9.4 字符串对象

字符串可以直接调用方法，但字符串是基本数据类型，不是对象，这是咋回事？

```javascript
var str = 'andy';
console.log(str.length); // 不会报错
```



#### 9.4.1 基本包装类型

把简单数据类型包装成复杂数据类型,步骤如下

1. 新建复杂类型

   ```javascript
   var temp = new String('andy');
   ```

2. 把临时变量的值给str

   ```javascript
   str = temp;
   ```

3. 销毁这个临时变量

   ```javascript
   temp = null;
   ```

   

#### 9.4.2 字符串不可变

每次变换字符串的内容，都会新建一个字符串的空间存放数据。字符串所有的方法，都不会修改字符串本身。操作完成会返回一个新的字符串。

#### 9.4.3 根据字符返回位置

| 方法名                              | 说明                                               |
| ----------------------------------- | -------------------------------------------------- |
| indexOf('要查找的字符，开始的位置') | 返回指定内容在源字符串中的位置，如果找不到就返回-1 |
| lastIndexOf()                       | 从后往前，找到第一个匹配                           |

使用`charAt(下标)`的方法返回字符

### 10. 简单数据类型和复杂数据类型

简单数据类型：值类型

复杂数据类型：引用类型

#### 10.1 值类型

简单数据类型/基本数据类型，在存储时变量中存储的是值本身，因此叫做值类型`string, number, bollean, undefined, null`

**null返回的还是object类型，这是之前设计有误**

如果有变量，以后打算存储为对象，暂时没想好放啥，就可以赋值null

#### 10.2 引用类型

复杂数据类型。存储时变量中存储的仅仅是地址（引用），因此叫做引用数据类型。通过new关键字创建的对象（系统对象、自定义对象），如Object， Array， Date等。

#### 10.3 堆和栈

1. 栈（操作系统）：由系统自动分配释放存放函数的参数值、局部变量的值等等。其操作方式类似于数据结构中的栈。**简单数据类型存放到栈里面，存放的是值。**
2. 堆：存储复杂类型，一般由程序员分配释放。如果程序员不是放，则由垃圾回收机制回收。**复杂数据类型放到堆里面**