[toc]
> 参考[https://www.jikexueyuan.com/course/971.html](https://www.jikexueyuan.com/course/971.html)

## 认识函数

### 什么是函数

function -> 功能

函数就说实现功能的意思

- 系统自带函数
- 自定义函数

### 函数的功能

没啥好说的

### Python里函数的定义

- 声明指定的部分是函数，而不是别的对象（def
- 编写函数的功能

## 形参实参

### 函数参数

括号里的就是参数，定义的时候声明的

### 形参

形参就是参数的名称，不是参数的值

### 实参

实参就是值

```python
def dunction(a,b):# 形参
    print(a,b)# 实参
```



> 以下参考https://blog.csdn.net/luckytanggu/article/details/51714757

### 位置参数 positional argument

调用函数时根据函数定义的参数位置来传递参数。

### 关键字参数 keyword argument

通过参数名字直接赋值，不用管顺序。但是不能冲突，比如下面这样

```def function(a,b,c)```

```function(b=1,c=2,4)```

**也就是说，位置参数必须在关键字参数的前面。但是关键字参数是不需要顺序的**

如果位置参数在关键字参数后面，就会有下面的报错

SyntaxError:  positional argument follows keyword argument

### 默认参数

用于定义函数，为参数提供默认值，调用函数时可传可不传该默认参数的值（注意：所有位置参数必须出现在默认参数前，包括函数定义和调用）

```python
# 正确的默认参数定义方式--> 位置参数在前，默认参数在后
def print_hello(name, sex=1):
    pass

# 错误的定义方式
def print_hello(sex=1, name):
    pass
```



### 可变参数

#### *args

*args收集所有不匹配的位置参数组成一个tuple对象（局部变量名args指向此tuple对象）

#### **kwargs

**参数收集所有不匹配的关键字参数组成一个dict对象（局部变量kwargs指向此dict对象）

#### 解包传递

```python
1、在传递元组时，让元组的每一个元素对应一个位置参数
def print_hello(name, sex):
    print name, sex

# args = ('tanggu', '男')
# print_hello(*args)
# tanggu 男

2、在传递词典字典时，让词典的每个键值对作为一个关键字参数传递给函数
def print_hello(kargs):
    print kargs

# kargs = {'name': 'tanggu', 'sex', u'男'}
# print_hello(**kargs)
# {'name': 'tanggu', 'sex', u'男'}
```



### 混合使用:star:

基本原则是：位置参数，默认参数，包裹位置（args），包裹关键字（kwargs）

**<u>定义和调用都应遵循上述原则</u>**

```python
def func(name, age, sex=1, *args, **kargs):
	print (name, age, sex, args, kargs)
	

# func('tanggu', 25, 2, 'music', 'sport', classes=2)
# tanggu 25 1 ('music', 'sport') {'class'=2}

```

**<u>如果使用了args，就没法用关键字参数了，会报错SyntaxError: positional argument follows keyword argument</u>**

### 参数传递

- 普通传递：和平常的使用方式一样，按照顺序放入参数
- 赋值传递：是特性，传递的是对象。**<u>如果对象可变，其改变时，所有指向这个对象的变量都会改变。如果不可改变，赋值的话只是改变函数中变量的值，其余变量不会改变。</u>**
  - 动态变量：列表，字典
  - 静态变量：字符串，数值，元组

#### 深拷贝浅拷贝

> 参考https://www.cnblogs.com/sxzwj/p/7967418.html，https://www.runoob.com/w3cnote/python-variable-references-and-copies.html

- a=b，b变了a也变了，就是浅拷贝：修改堆内存中的同一个值
- a=b，b变了a没变，就是深拷贝：修改堆内存中不同的值

动态对象有.copy()功能来完成深拷贝

Python自带一个深copy的方法

```python
import copy
dict = {'a':[1,2,3,4,5],'b':2}
x = copy.deepcopy(dict['a'])
for i in range(5):
    x[i] = 0
print(dict['a'])
```

但是这个copy只能copy父对象的数据，如果是父对象下面的子对象，就依然会变成原本的复制方法，也就是静态变量不变，动态变量会变

```python
import copy
a = ['111', '222', ['333', '444']]
b = copy.copy(a)
 
b[2][0] = '555'
 
print(a, b)
# ['111', '222', ['555', '444']] ['111', '222', ['555', '444']]
```

手动深拷贝，就是用遍历方法递归

```python
def deep_copy(copy_list):
    b = list()
    for i in copy_list:
        if isinstance(i, list):
            i = deep_copy(i)
        b.append(i)
    return b
```



如果用自带函数的话，则可以轻松拷贝

```python
b = copy.deepcopy(a)
```

**总结：动态变量的`copy()`和`copy.copy()`的效果是一样的**



## 全局变量和局部变量

### 作用域

在一定范围内而不是全局都起作用的变量，称之为局部变量，默认都是局部变量。

### 局部变量

```python
def fun():
    i = 7
    print(i)
i = 10
fun() # 7
print(i) # 10
```

### 全局变量

#### global

```python
def fun():
    global i # 首先在这里就生命是全局了
    i = 7
    print(i)
    
fun() # 7
i = 10
print(i) # 10
fun() # 7
print(i) # 7
```

##### 如果函数内不修改全局变量，可以不用global

```python
gcount = 100
 
def global_test():
    print (gcount)
global_test() # 100
```

##### 如果不声明global，在函数内修改全局变量，会报错

```python
gcount = 0

def global_test():
    print (gcount)
    gcount+=1
global_test() 
# UnboundLocalError: local variable 'gcount' referenced before assignment
```

##### 声明global后，就可以随意造作了

```python
gcount = 0

def global_test():
    global gcount
    gcount+=1
    print (gcount)
global_test()  # 101
```

#### nonlocal

nonlocal是函数内的全局变量

```python
def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter
        
def make_counter_test():
  mc = make_counter()
  print(mc())
  print(mc())
  print(mc())
  
make_counter_test()
```



## 函数的使用和返回值

- 有返回值
  - 一个值
  - 多个值
- 无返回值

```python
def fun():
    return 1,2,3# 等同于 return (1,2,3)

a = fun()
a,b,c = fun()
```



## 文档字符串 DocStrings

每个函数开头的时候写一段说明文字，就是文档字符串，是函数内的注释。

函数定义的时候第一行出现

规律

1. 紧挨着函数冒号出现
2. 三引号引起来
3. 第二行空开
4. 句末使用句号
5. 英文的话，第一行第一个字母必须是大写

```python
def function(num1,num2):
        ''' 首行简述功能 第二行为空行
        
        第三行为函数的具体描述。
        '''
        pass
 
print (function.__doc__) # 调用 doc
help(function) # 输出参数+文档字符串
```

