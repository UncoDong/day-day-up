## 1. 进程

### 1.1 多任务

**同一时间执行多个任务**，可以充分 **利用CPU资源，缩短执行时间**



### 1.2 并发

交替执行，每个执行0.1秒，切换到下一个任务

### 1.3 并行

多核计算机，每个核执行一个任务



## 2. 实现多任务

### 2.1 进程

进程是资源分配的最小单位，**是操作系统进行资源分配和调度运行的基本单位**

### 2.2 多进程的作用

程序运行，就创建一个 **<u>主进程</u>**

如果创建了 **子进程**，那就是多进程了





## 3. 创建进程

1. 导入进程包

   `import multiprocessing`

2. 使用进程类创建对象

   `进程对象 = multiprocessing.Process()`

3. 启动进程执行任务

   `进程对象.start()`



#### multiprocessing.Process(target=进程名)

| 参数名 | 说明                                 |
| ------ | ------------------------------------ |
| target | 执行的目标任务名，也就是方法、函数名 |
| name   | 进程名，一般不用设置                 |
| group  | 进程组，目前只能用None               |



```python
#创建子进程
sing_process = multiprocessing.Process (target=sing)
#创建子进程
dance_process = multiprocessing.Process (target=dance)
#启动进程
sing_process.start()
dance_process.start()
```



完整代码

```python
# 1 导入
import multiprocessing


import time
#唱歌
def sing( ):
    for i in range(3):
        print("唱歌...")
        time.sleep(0.5)
#跳舞
def dance( ):
    for i in range(3):
        print("跳舞...")
        time.sleep(0.5)

# 2. 使用进程类
sing_process = multiprocessing.Process (target=sing)
dance_process = multiprocessing.Process (target=dance)

if __name__ == '__main__':

    # 3. 启动进程
    sing_process.start()
    #sing_process.join()
    dance_process.start()
    #dance_process.join()

```





#### 进程传参

| 参数名 | 说明                     |
| ------ | ------------------------ |
| args   | 元祖的方式给执行任务传参 |
| kwargs | 字典的方式给执行任务传参 |
|        |                          |

```python
# target:进程执行的函数名
# args:表示以元组的方式给函数传参
sing_process = multiprocessing.Process(target=sing,args=(3, ))
sing_process.start()

#target:进程执行的函数名
#kwargs:表示以字典的方式给函数传参
dance_process = multiprocessing.Process (target=dance,kwargs= { "num": 3})
#启动进程
心
dance_process.start( )

```



完整代码

```python
# 1 导入
import multiprocessing


import time
#唱歌
def sing(num):
    for i in range(num):
        print("唱歌...")
        time.sleep(0.5)
#跳舞
def dance(num):
    for i in range(num):
        print("跳舞...")
        time.sleep(0.5)

# 2. 使用进程类 传递元祖参数
sing_process = multiprocessing.Process (target=sing, args=(5,))
dance_process = multiprocessing.Process (target=dance, kwargs={"num":10})

if __name__ == '__main__':

    # 3. 启动进程
    sing_process.start()
    dance_process.start()

```



### 获取进程编号

当程序中进程的数量越来越多时，如果没有办法区分主进程和子进程还有不同的子进程，那么就无法进行有效的进程管理，为了方便管理实际上每个进程都是有自己编号的.

1. 获取当前进程编号

   `os.getpis()`

2. 获取当前父进程编号

   `os.getppis()`





```python
import os
pid = os.getpid ( )
print(pid)


def work( ) :
#获取当前进程的编号
print ( "work进程编号:"，os.getpid () )
心
#获取父进程的编号
print ( "work父进程的编号:”，os.getppid( ) )

```

