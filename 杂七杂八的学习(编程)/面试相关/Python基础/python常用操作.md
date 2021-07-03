[toc]





## List列表

### 1. list索引

- list[-1] 返回最后一个的索引，复数从后往前
- list[start: end :step]  使用step作为步长，输出
- list[::-1]反转
- nums = [14, 5, 4, 5, 7, 32]  ===》 list.index(5)  ===》 index = 1

### 2. list添加元素

- li.append("new")
- li.insert(2, "new") 在指定下标添加元素
- li.extend(["two", "elements"]) 将另一个列表合并到签名的列表里面

### 3. list搜索

- li.index(Object)返回元素的下标

### 4. list 删除

- li.remove(Object) 删除第一个出现的某元素，没有返回值
- li.pop() 删除最后一个元素，并返回值

### 5. list运算符

- li += ['two']   ---->  [ 'new', 'two']
- [1, 2] * 3      ---->    [1, 2, 1, 2, 1, 2]

### 6. list 分割字符串

- ",".join(list)

### 7. list 统计数量

- list.count(Object)

### 8. list 排序

reverse = False: 从低到高
reverse = True: 从高到低

- list.sort(reverse=True|False, key=myFunc)

## Dic字典

### 1. 字典合并

- dict1.update(dict2)

 ### 2. 返回所有的值

- dict.values()
- dict.items()
- dict.keys();

### 3. 取值，没有的话就返回默认值

- radiansdict.get(key, default=None)

### 4. 设置值，不存在设置默认值，存在就不设置。

- myDic.setdefault("score",100) 这个函数会返回值

### 5. 设置值，第一个放列表，第二个放所有的默认值

- dict.fromkeys(seq[, value])

## OS 模块

### 1. 返回所有目录名

- os.listdir(path)

### 2. 删除文件

- os.remove(path)

### 2. 新建文件

- os.mkdir("file") 创建目录
- os.mknod("test.txt") 创建空文件

### 3. 分割文件和扩展名

- os.path.splitext(path)

### 4. 链接目录和文件名

- os.path.join(path,name)

### 5. 判断是否是文件

- os.path.isdir(r"c:\python") --> True
- os.path.isfile(r"c:\python\hello.py") --> True
- os.path.islink(r"c:\python\hello.py") --> False  是否是快捷方式

### 6. 判断是否存在文件

- os.path.exists(path)

### 7. 操作系统命令 命令行

- os.system("command")

### 8. 删除文件夹

```python
import shutil
shutil.rmtree(path)  
```

## 字符串操作

```python
# 字符串的常用操作
# 1. 大小写转换
str1 = "hellopythonhelloworld"
str2 = "hello python 999, hello world"
str3 = "HELLOpython,HELLOWORLD"
 
print(str2.title())                 # 返回每个单词首字母大写，其他字母小写的字符串
print(str2.capitalize())        # 返回首字母大写，其他字母全部小写的新字符串
 
print(str1.upper())     # 将字符串中的每个字母大写
print(str3.lower())        # 将左右字母变小写
 
print(str3.swapcase())      # 将字符串中的字母大写转小写，小写转大写
 
# 2. .isxxx 的判断
str1 = "hellopythonhelloworld"
str2 = "hello python 999, hello world"
str3 = "23346546756535"
print(str1.isalpha())          # 判断字符串中是否全是字母（加一个标点符号会是False）
print(str2.isdecimal())      # 检测是否都是数字
print(str1.isdigit())           #检测字符串是否都是数字    (False)
print(str2.isdigit())           #(False)
print(str3.isdigit())           #(True)
print(str2.isnumeric())     # 检测是否都是数字          （这三种方法有区别，如需要，请详查）
 
str4 = "hellopythonhelloworld666"
print(str4.isalnum())       # 判断字符串是否是字母或数字 ，全是字母(True) 全是数字(True) 字母和数字(True)
 
str5 =  "                     "
print(str5.isspace())       # 判断是否都是空格
 
# 3. 查找
print(str4.find("h", 4, 9))       # 查找指定子串的位置，find从左到右查找， 下标(0),    (若找不到则返回-1)
print(str4.rfind("h"))      #rfind从右到左查找，下标 (11) ，也就是从最右边开始找到的子串，但是下标从左边开始，不能混淆
 
print(str4.index("e"))     # 找到则返回下标，找不到会报错
 
# 4. 替换
print(str4.replace("hello", "HELLO", 2))     # str.replace(old, new[, count])  count 是替换次数
 
# 5. 字符串的分割, 并生成一个列表
str5 = "星期一 | 星期二 | 星期三 | 星期四 | 星期五"
print(str5.split("|", 3))       # 可以指定分割次数
 
print(str5.rsplit("|"))     #rsplit()和split()是一样的，只不过是从右边向左边搜索。
 
# splitlines()用来专门用来分割换行符。虽然它有点像split('\n')或split('\r\n')
# splitlines()中可以指定各种换行符，常见的是\n、\r、\r\n。如果指定keepends为True，则保留所有的换行符。
str6 = "abc\n\ndef \rgh\nijk\r\n"
print(str6.splitlines())                                    # 结果：['abc', '', 'def ', 'gh', 'ijk']
print(str6.splitlines(keepends=True))       # 结果： ['abc\n', '\n', 'def \r', 'gh\n', 'ijk\r\n']
 
# 6. 去掉空白字符
str7 = "   abcdefghijkl    mn    "
print(str7.lstrip())        # 去掉左边（开始）的空白字符
print(str7.rstrip())        # 去掉右边（末尾）的空白字符
print(str7.strip())         # 去掉两边的空白字符
 
# 7. 字符串的切片  字符串[开始索引 ： 结束索引　：步长值]
# 指定的区间属于左闭右开[开始索引，结束索引)
str8 = "hello python, hello world"
print(str8[6 : 12])
print(str8[6 : : 3])        #ph,eood  步长值就是中间隔 （count-1）个字母再截取
 
print(str8[: : -1])  # 字符串的逆序
```

| 数字类型        | 函数                              | 能否判别         |
| --------------- | --------------------------------- | ---------------- |
| unicode（半角） | isdigit() isnumeric() isdecimal() | True True True   |
| 全角数字        | isdigit() isnumeric() isdecimal() | True True True   |
| bytes数字       | isdigit() isnumeric() isdecimal() | True False False |
| 阿拉伯数字      | isdigit() isnumeric() isdecimal() | False True False |
| 汉字数字        | isdigit() isnumeric() isdecimal() | False True False |

> https://blog.csdn.net/weixin_42764266/article/details/105392430



## 集合

创建集合的两种方式

```
parame = {value01,value02,...}
或者
set(value)
```

### 1. 添加元素

- s.add( x )  添加/去重  也可以添加另一个set，会合并

### 2. 去除元素

- s.remove(x)  如果不存在则会发生错误
- s.discard(x) 如果不存在不会发生错误
- s.pop() **随机**删除一个，有返回值

如果s是由字典和字符转换而来的，那就是随机删除

如果s是由列表和元组组成的时候，从左边删除

### 3. 计算

\>>> x & y # 交集
set(['a', 'm'])

\>>> x | y # 并集
set(['a', 'p', 's', 'h', 'm'])

\>>> x - y # 差集
set(['p', 's'])

### 4. 判断子集

x = {"f", "e", "d", "c", "b", "a"} 

y = {"a", "b", "c"}

- x.issuperset(y) 是超集
- y.issubset(x)是子集

## 没见过的操作

### 1. filter()过滤 

```
filter(function, iterable)

def is_odd(n):
    return n % 2 == 1
 
newlist = filter(is_odd, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
print(newlist)
>> [1, 3, 5, 7, 9]
```

### 2. **列表推导式、字典推导式、生成器**

```python
import random
td_list=[i for i in range(10)]
print("列表推导式",td_list,type(td_list))

ge_list=(i for i in range( 10))
print("生成器",ge_list)

dic={k:random.randint(4,9)for k in ["a" ,"b" ,"c","d"]]}print("字典推导式",dic,type(dic))

```

### 3. JSON保存

|    函数    |                   描述                   |
| :--------: | :--------------------------------------: |
| json.dumps |     将 Python 对象编码成 JSON 字符串     |
| json.loads | 将已编码的 JSON 字符串解码为 Python 对象 |

#### 格式化输出

json.dumps({'a': 'Runoob', 'b': 7}, sort_keys=True, indent=4, separators=(',', ': '))

- indent 格式化的类型

### 4. 命令行参数

```
import sys
print(str(sys.argv))
```

### 5. print相关

```
print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)
```

- objects -- 复数，表示可以一次输出多个对象。输出多个对象时，需要用 , 分隔。
- sep -- 用来间隔多个对象，默认值是一个空格。
- end -- 用来设定以什么结尾。默认值是换行符 \n，我们可以换成其他字符串。
- file -- 要写入的文件对象。
- flush -- 输出是否被缓存通常决定于 file，但如果 flush 关键字参数为 True，流会被强制刷新。

### 6. eval()和exec()区别

eval() 函数的语法格式为：
`eval(source, globals=None, locals=None, /)`

而 exec() 函数的语法格式如下：
`exec(source, globals=None, locals=None, /)`

- expression：这个参数是一个字符串，代表要执行的语句 。该语句受后面两个字典类型参数 globals 和 locals 的限制，只有在 globals 字典和 locals 字典作用域内的函数和变量才能被执行。
- globals：这个参数管控的是一个全局的命名空间，即 expression 可以使用全局命名空间中的函数。如果只是提供了 globals  参数，而没有提供自定义的 __builtins__，则系统会将当前环境中的 __builtins__ 复制到自己提供的 globals  中，然后才会进行计算；如果连 globals 这个参数都没有被提供，则使用 Python 的全局命名空间。
- locals：这个参数管控的是一个局部的命名空间，和 globals 类似，当它和 globals 中有重复或冲突时，**以 locals 的为准**。如果 locals 没有被提供，则默认为 globals。

```python
a=10
b=20
c=30
g={'a':6, 'b':8} #定义一个字典
t={'b':100, 'c':10} #定义一个字典
print(eval('a+b+c', g, t)) #定义一个字典 116
```

eval() 执行完会返回结果，而 exec() 执行完不返回结果。举个例子：

```python
    a = 1
    exec("a = 2") #相当于直接执行 a=2
    print(a)
    a = exec("2+3") #相当于直接执行 2+3，但是并没有返回值，a 应为 None
    print(a)
    a = eval('2+3') #执行 2+3，并把结果返回给 a
    print(a)
2
None
5
```

### 7. python的类型判断

- type(object)
- isinstance(object, type)

### 8. heapq的运用

heapq 模块有两个函数：`nlargest()` 和 `nsmallest()` 可以完美解决这个问题。

```
import heapq
nums = [1, 8, 2, 23, 7, -4, 18, 23, 42, 37, 2]
print(heapq.nlargest(3, nums)) # Prints [42, 37, 23]
print(heapq.nsmallest(3, nums)) # Prints [-4, 1, 2]
```

两个函数都能接受一个关键字参数，用于更复杂的数据结构中：

```
portfolio = [
    {'name': 'IBM', 'shares': 100, 'price': 91.1},
    {'name': 'AAPL', 'shares': 50, 'price': 543.22},
    {'name': 'FB', 'shares': 200, 'price': 21.09},
    {'name': 'HPQ', 'shares': 35, 'price': 31.75},
    {'name': 'YHOO', 'shares': 45, 'price': 16.35},
    {'name': 'ACME', 'shares': 75, 'price': 115.65}
]
cheap = heapq.nsmallest(3, portfolio, key=lambda s: s['price'])
expensive = heapq.nlargest(3, portfolio, key=lambda s: s['price'])
```

如果你想在一个集合中查找最小或最大的 N 个元素，并且 N 小于集合元素数量，那么这些函数提供了很好的性能。 因为在底层实现里面，首先会先将集合数据进行堆排序后放入一个列表中：

```
>>> nums = [1, 8, 2, 23, 7, -4, 18, 23, 42, 37, 2]
>>> import heapq
>>> heap = list(nums)
>>> heapq.heapify(heap)
>>> heap
[-4, 2, 1, 23, 7, 2, 18, 23, 42, 37, 8]
>>>
```

堆数据结构最重要的特征是 `heap[0]` 永远是最小的元素。并且剩余的元素可以很容易的通过调用 `heapq.heappop()` 方法得到， 该方法会先将第一个元素弹出来，然后用下一个最小的元素来取代被弹出元素（这种操作时间复杂度仅仅是 O(log N)，N 是堆大小）比如，如果想要查找最小的 3 个元素，你可以这样做：

```
>>> heapq.heappop(heap)
-4
>>> heapq.heappop(heap)
1
>>> heapq.heappop(heap)
2
```

def permute(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        def backtrack(first = 0):
            # 所有数都填完了
            if first == n:  
                res.append(nums[:])
            for i in range(first, n):
                # 动态维护数组
                nums[first], nums[i] = nums[i], nums[first]
                # 继续递归填下一个数
                backtrack(first + 1)
                # 撤销操作
                nums[first], nums[i] = nums[i], nums[first]
        
        n = len(nums)
        res = []
        backtrack()
        return res

## 生成器 迭代器 可迭代对象

**迭代器协议**

对象需要提供`next()`方法，它要么返回迭代中的下一项，要么就引起一个StopIteration异常，以终止迭代。

**可迭代对象**

实现了迭代器协议对象。list、tuple、dict都是Iterable（可迭代对象），但不是Iterator（迭代器对象）。但可以使用内建函数iter()，把这些都变成Iterable（可迭代器对象）。

**for item in Iterable 循环**

本质就是先通过iter()函数获取可迭代对象Iterable的迭代器，然后对获取到的迭代器不断调用next()方法来获取下一个值并将其赋值给item，当遇到StopIteration的异常后循环结束

### 迭代器

Python中一个实现了***_iter_\***方法和***_next_\***方法的类对象，就是迭代器，如下案例是计算菲波那切数列的案例

```python

class Fib(object):
    def __init__(self, max):
        super(Fib, self).__init__()
        self.max = max

    # 在for循环遍历时被iter()调用
    def __iter__(self):
        self.a = 0
        self.b = 1
        return self
	# 而逐个遍历的时候，也是使用内置的next(）函数
    # 通过调用对象的_next_(self)方法对迭代器对象进行遍历
    def __next__(self):
        fib = self.a
        if fib > self.max:
            raise StopIteration
        self.a, self.b = self.b, self.a + self.b
        return fib

# 定义一个main函数，循环遍历每一个菲波那切数
def main():
    # 20以内的数
    fib = Fib(20)
    for i in fib:
        print(i)

# 测试
if __name__ == '__main__':
    main()
```

> 在本类的实现中，定义了一个***_iter_\***(self)方法，这个方法是在for循环遍历时被iter()调用，返回一个迭代器。因为在遍历的时候，是直接调用的python内置函数iter()，由iter()通过调用***_iter_\***(self)获得对象的迭代器。有了迭代器，就可以逐个遍历元素了。而逐个遍历的时候，也是使用内置的next(）函数通过调用对象的***_next_\***(self)方法对迭代器对象进行遍历。所以要实现***_iter_\***(self)和***_next_\***(self)这两个方法。
>
> **而且因为实现了\**\*_next_\**\*(self)方法，所以在实现\**\*_iter_\**\*(self)的时候，直接返回self就可以。**
>
> 总结一句话就是： 
>  在循环遍历**自定义容器对象**时,会使用python内置函数iter()调用遍历对象的***_iter_\***(self)获得一个迭代器,之后再循环对这个迭代器使用next()调用迭代器对象的***_next_\***(self)。
>
> **注意点：`_iter_(self)`只会被调用一次,而`_next_(self)`会被调用 n 次，直到出现StopIteration异常。**

### 生成器

- 在需要的时候才产生结果，不是立即产生结果。
- 生成器是只能遍历一次的。
- 生成器是一类特殊的迭代器。

#### 1. 生成器函数

使用 def 定义函数，但是，使用yield而不是return语句返回结果。yield语句一次返回一个结果，在每个结果中间，挂起函数的状态，以便下次从它离开的地方继续执行。

```python
# 菲波那切数列
def Fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return '亲！没有数据了...'
# 调用方法，生成出10个数来
f=Fib(10)
# 使用一个循环捕获最后return 返回的值，保存在异常StopIteration的value中
while  True:
    try:
        x=next(f)
        print("f:",x)
    except StopIteration as e:
        print("生成器最后的返回值是：",e.value)
        break
```

### 2. 生成器表达式

类似于列表推导，只不过是把一对大括号[]变换为一对小括号()。但是，生成器表达式是按需产生一个生成器结果对象，要想拿到每一个元素，就需要循环遍历。

```python
# 一个列表
xiaoke=[2,3,4,5]
# 生成器generator，类似于list，但是是把[]改为()
gen=(a for a  in xiaoke)
for  i  in gen:
    print(i)
#结果是：
2
3
4
5

# 为什么要使用生成器？因为效率。
# 使用生成器表达式取代列表推导式可以同时节省 cpu 和 内存(RAM)。
# 如果你构造一个列表(list)的目的仅仅是传递给别的函数,
# 比如 传递给tuple()或者set(), 那就用生成器表达式替代吧!

# 本案例是直接把列表转化为元组
kk=tuple(a for a in xiaoke)
print(kk)
#结果是：
(2, 3, 4, 5)

# python内置的一些函数，可以识别这是生成器表达式，外面有一对小括号，就是生成器
result1=sum(a for a in range(3))
print(result1)
# 列表推导式
result2=sum([a for a in range(3)])
print(result2)
```

## 自省/反射

反射就是通过字符串的形式，导入模块；通过字符串的形式，去模块寻找指定函数，并执行。利用字符串的形式去对象（模块）中操作（查找/获取/删除/添加）成员，一种基于字符串的事件驱动！

```python
1. getattr()函数是Python自省的核心函数，具体使用大体如下：
class A: 
def __init__(self): 
self.name = 'zhangjing'
#self.age='24'
def method(self): 
print"method print"
  
Instance = A() 
print getattr(Instance , 'name, 'not find') #如果Instance 对象中有属性name则打印self.name的值，否则打印'not find'
print getattr(Instance , 'age', 'not find') #如果Instance 对象中有属性age则打印self.age的值，否则打印'not find'
print getattr(a, 'method', 'default') #如果有方法method，否则打印其地址，否则打印default 
print getattr(a, 'method', 'default')() #如果有方法method，运行函数并打印None否则打印default 

2. hasattr(object, name)

说明：判断对象object是否包含名为name的特性（hasattr是通过调用getattr(ojbect, name)是否抛出异常来实现的）

3. setattr(object, name, value)

这是相对应的getattr()。参数是一个对象,一个字符串和一个任意值。字符串可能会列出一个现有的属性或一个新的属性。这个函数将值赋给属性的。该对象允许它提供。例如,setattr(x,“foobar”,123)相当于x.foobar = 123。

4. delattr(object, name)

与setattr()相关的一组函数。参数是由一个对象(记住python中一切皆是对象)和一个字符串组成的。string参数必须是对象属性名之一。该函数删除该obj的一个由string指定的属性。delattr(x, 'foobar')=del x.foobar
```

## 类方法 静态方法

|          | 普通方法                                                     | 类方法                                                       | 静态方法                       |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------ |
| 所属方法 | 属于实例方法                                                 | 属于类方法                                                   | 类内部相对独立的方法           |
| 定义方式 | 无特殊情况，正常定义即可                                     | 需要使用classmethod装饰                                      | 需要用staticmethod装饰函数     |
| 传参方式 | 要求第一个参数是self，代表实例对象本身                       | 要求第一个参数是cls，表示类的本身                            | 没有传参要求，一般不传参数     |
| 访问情况 | 可以访问类内部所有的属性和方法，通过self可以获取到类内部的任何属性和方法 | 可以访问类内部的类属性和类方法，因为可以通过cls访问到类属性和类方法 | 无法访问类内部的任何属性和方法 |
| 调用情况 | 需要用实例对象去调用，并且会自动把实例对象转入函数           | 可以使用实例对象和类名去调用，推荐用类名调用                 | 可以用实例对象和类名调用       |

## 属性

Python中的属性其实是**普通方法**的变种。

对于属性，有以下三个知识点：

- 属性的基本使用
- 属性的两种定义方式

```python
# ############### 定义 ###############
class Foo:

    def func(self):
        pass

    # 定义属性
    @property
    def prop(self):
        pass
# ############### 调用 ###############
foo_obj = Foo()

foo_obj.func()
foo_obj.prop   #调用属性
```

- 定义时，在普通方法的基础上添加 **@property** 装饰器；
- 定义时，属性**仅有一个**self参数
- 调用时，无需**括号**
        方法：foo_obj.func()
        属性：foo_obj.prop

实例：对于主机列表页面，每次请求不可能把数据库中的所有内容都显示到页面上，而是通过分页的功能局部显示，所以在向数据库中请求数据时就要显示的指定获取从第m条到第n条的所有数据（即：limit m,n），这个分页的功能包括：

- 根据用户请求的当前页和总数据条数计算出 m 和 n
- 根据m 和 n 去数据库中请求数据 

![img](https://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif)

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
# ############### 定义 ###############
class Pager:
    
    def __init__(self, current_page):
        # 用户当前请求的页码（第一页、第二页...）
        self.current_page = current_page
        # 每页默认显示10条数据
        self.per_items = 10 


    @property
    def start(self):
        val = (self.current_page - 1) * self.per_items
        return val

    @property
    def end(self):
        val = self.current_page * self.per_items
        return val

# ############### 调用 ###############

p = Pager(1)
p.start 就是起始值，即：m
p.end   就是结束值，即：n
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

从上述可见，Python的属性的功能是：属性内部进行一系列的逻辑计算，最终将计算结果返回。





手机，电脑分类品牌，品牌分不同型号



好未来AI工程院，主要是产出算法模型的，需要到后端部署

评测算法的好坏，为算法模型提供

数据增强

算法

竞品平台，自己的模型和别的去评测

1. 赋能工具，和算法相关的
2. 主要还是后端
3. 主线是项目，辅线