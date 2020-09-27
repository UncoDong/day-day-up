[toc]



## 2 Redis

### 2.1 Redis简介和常用场景

Redis：高性能，基于键值对的，数据库

C语言开发，很适合C语言学习者解析

lua拓展：lua编写脚本，上传到lua，脚本加入后变成原子操作，不会被打断



#### 字符串类型

- 缓存二进制数据，比如图片，序列化对象
- 计数器，文章访问量统计
- 位运算，节约内存

100w个 ID，以iD为索引，位运算1/0存储

#### List类型

- 获取最新的N条数据
- 双向列表，生产者消费者的消息队列
- 实时分析系统



#### Hash类型

存储具有多个属性的对象，比如用户的年龄，姓名，性别，积分等

#### Set类型

共同关注，共同好友

- 关注set，好友set

存储无序不重复数据，比如文章



### 2.2 安装

```shell
wget http://download.redis.io/releases/redis-4.0.1.tar.gz
tar -xzvf redis-4.0.1.tar.gz
cd redis-4.0.1
make
make install
which redis-server
```



安装完成后看都有哪些redis的指令`ls /usr/local/bin/redis-*`

启动redis `redis-server`

现在用的是默认配置

![image-20200925090848590](C:\Users\UncleDong\AppData\Roaming\Typora\typora-user-images\image-20200925090848590.png)



![image-20200925090907693](C:\Users\UncleDong\AppData\Roaming\Typora\typora-user-images\image-20200925090907693.png)



`grep '^[^#]' redis.conf >6379.conf`

- Redis服务器启动配置文件

  `redis-server 6379.conf`

- 查看redis服务器所有配置选项

  `redis-cli config get '*'`

- 查看redis服务器某个配置选项

  `redis-cli config get bind`



#### 常用选项

##### --daemonize

- 含义：是否以守护进程的形式启动
- 用法：daemonize yes|no
- 默认值 ：no
- 示例：daemonize yes



##### --bind

- 含义：redis监听的ip地址
- 用法：bind ip 地址
- 默认值 ：127.0.0.1
- 示例：bind 0.0.0.0

内网地址 

##### --dir

- 含义：redis持久化文件存放目录
- 用法：dir 文件路径
- 默认值 ：./
- 示例：dir/mnt/redis/data

##### --dbfilename

- 含义：redis持久化文件名
- 用法：dbfilename文件名
- 默认值 ：dump.rdb
- 示例：dbfilname jkxy.jdb

##### --unixsocket

- 含义：redis监听的unix套接字地址
- 用法：unixsocket文件地址
- 默认值 ：空
- 示例：unixsocket/tmp/redis.sock

## 

### 2.3 Redis操作和命令

#### Redis命令行客户端简介

- 工具
- redis-cli
- 功能：Redis自带的基于命令行的Redis客户端
- 帮助：redis-cli --help

#### Redis命令行客户端使用方法

- 将命令作为redis-cli的参数执行

  redis-cli set a foo

- 进入交互式模块执行

  redis-cli -h 127.0.0.1 -p 6379

- redis命令不区分大小写

#### Redis常用命令

- 测试客户端与服务器的连接是否正常：PING
- 获得符合规则的键名列表：KEYS pattern
- 判断一个键是否存在：EXISTS key
- 删除一个键：DEL key
- 获取键的类型：TYPE key
- 清空当前数据库所有数据：FLUSHDB
- 返回一个键的剩余生存事件：TTL key
- 设置一个键的剩余生存时间



```shell
kesy * # 没有键值
set foo bar # 把foo设置成bar 
exists k # 不存在k
del foo # 删除foo
type foo # 类型
FLUSHDB # 删除所有键
keys * # 查看所有，发现没了

# 剩余生存时间
set foo bar
keys *
EXPIRE foo 60 # 设置为60秒
ttl foo # 查看剩余生存时间
```



##### String类型

- SET 赋值
- GET 取值
- INCR 如果存储的是整数字符串，这个命令可以递增
- MSET 多个键赋值
- MEGT 取多个键的值

```shell
set foo barstring # 设置为barstring
get foo # 查看值
get ffo # 查看不存在的值，返回空
MSET foo1 v1 foo2 v2 foo3 v3 # 设置多个键的值
keys *
MGET foo1 foo2 foo3 # 依次返回值

set num 1
get num
incr num
```



##### Hash类型

- HSET 赋值
- HGET 取值
- HMSET 多个键赋值
- HMGET 多个键取值
- HGETALL 获取全部
- HDEL 删除

```shell
hset user name dan # 一个键值对
hset user sex man #另一个键值对
hget user name # 只获取一个键值对
hgetall user # 返回所有属性的值

hdel user name # 用来删除某一个属性
hgetall user
del user
EXISTS user
```





##### List类型

- LPUSH 左放入
- RPUSH 右放入
- LPOP 左端取出
- RPOP 右端取出
- BRPOP block的意思，如果有数据就返回数据，如果是空就等待
- LLEN 返回整个列表的长度
- LRANGE 索引层Start->stop的所有元素
- RPOPLPUSH 首先Rpop，再Lpush

```shell
lpush list0 a # a元素添加到list0当中
lpush list0 b c d # 顺序放入很多
lrange list0 0 -1 # start为0， stop为-1
llen list0

rpoplpush list0 list1 # 把list0中右边的p到list1的左边
# 如果全部都设置为list0

```



##### Set类型

- SADD 添加
- SREM 删除
- SMEMBERS 获得集合中所有元素
- SISMEMBER 是否在集合中
- SDIFF  计算集合的差集
- SINTER 交集运算
- SUNION 多个集合并集
- SCARD 集合中元素的个数

```shell
SADD letters a b c # 添加
SMEMBERS letters # 查看元素
SISMEMBER letters d # 是否在集合中

SADD setA 1 2 3 # 添加
SADD setB 2 3 4 # 添加
SDIFF setA setB
SINTER setA setB
SUNION setA setB
SCARD setA
```



##### Sorted Set类型

- ZADD 有序集合加入元素:分数 如果已经存在，会用新的替换原有的
- ZACORE  获得某个元素的分数
- ZRANGE  排名在某个范围的元素列表
- ZRANGEBYSCORE 按照元素的分数从小到大返回分数在 min 和 max
- ZINCRBY 增加一个的分数

```shell
SCARD setA # 创建有序集合
ZADD scoreboard 10 x 20 y 30 z 15 a # 创建集合
zscore scoreboard y # 查看分数
zrange scoreboard 2 3 # 返回排名2 3的元素
ZRANGEBYSCORE scoreboard 15 25 # 返回在15~25的分数
ZINCRBY scoreboard x 90
```





### Python 消息队列开发

![image-20200926163900791](C:\Users\UncleDong\AppData\Roaming\Typora\typora-user-images\image-20200926163900791.png)



#### 消息队列

生产者

```python
import redis
import names
import time

# 创建好了全部的参数 0号数据库
r = redis.StrictRedis(host='localhost',port=6379, db=0)

while True:
    time.sleep(2)
    name = names.get_full_name()
    x = r.lpush('names', name)
    print (x, name)
```

消费者			

```python
import redis
import names
import time

# 创建好了全部的参数 0号数据库
r = redis.StrictRedis(host='localhost',port=6379, db=0)

# 不断返回队列中新的元素
def consume(key):
    while True:
        value = r.brpop(key)
        yield value

for v in consume('names'):
    print(v)

```



#### 发布订阅

生产者

```python
import redis
import names
import time

# 创建好了全部的参数 0号数据库
r = redis.StrictRedis(host='localhost',port=6379, db=0)

while True:
    time.sleep(2)
    name = names.get_full_name()
    # 换成publish方法
    x = r.publish('names', name)
    print (x, name)
```

SUBSCRIBE消费者

```python

import redis

# 创建好了全部的参数 0号数据库
r = redis.StrictRedis(host='localhost',port=6379, db=0)

# 订阅特定的频道
ps = r.pubsub()
ps.subscribe('names')
# # 也是一个生成器
for item in ps.listen():
    print(item)


```

