#### 通用爬虫

搜索引擎抓取系统的重要组成成分。抓取的是一整张页面数据

#### 聚焦爬虫

是建立在通用爬虫的基础之上，抓取的是页面中指定的局部内容

#### 增量式爬虫

检测网站数据更新的情况，只会爬取网站最新更新出来的数据

#### 爬虫的矛与盾



##### 反爬虫机制

门户网站可以通过制定相应的策略挥着技术手段，防止爬虫进行网站数据的爬取

##### 反反爬策略



### HTTP和HTTPS

- http协议

  交互协议

- 常用请求头信息

  User-Agent : 表示请求载体的身份标识

  Connection：请求完毕之后是断开连接还是保持连接

- 常用响应头信息

  Content-Type：服务器响应回客户端的数据类型

- https协议

  安全的超文本传输协议 数据加密

- 加密方式

  对称秘钥加密

  费对称秘钥加密

  证书秘钥加密√



#### Request模块

python中原生的网络请求模块，功能强大，简单便捷，效率极高。

作用：模拟浏览器发送请求

- 指定url
- 对url发出http请求，get or post
- 获取响应数据
- 持久化存储

##### urllib模块



##### requests模块



#### 数据解析

- 正则
- bs4
- xpath 重点学习，使用广，scrapy中也常用



### 高性能异步爬虫



## 数据解析之xpath
xpath是最便捷高效的一种解析方式，并且不同语言都可以使用xpath来寻找元素

- xpath解析原理
  1. 实例化一个etree对象，且需要将被解析的页面源码数据加载到该对象中
  2. 调用etree对象中的xpath方法，结合xpath表达式，实现标签的定位和内容的捕获。
  
- 环境安装`pip install lxml`(解析器)

- 实例化rtree对象：`from lxml import etree`
  - 将本地html文档中的源码数据加载到etree中
    - etree.parse('文件名')
  - 互联网上的源码数据加载到该对象中
    - etree.HTML('url路径')
  - 调用xpath方法`xpath('xpath表达式')`
  
- xpath表达式
  
  - /: 放最开始表示的是从根节点开始定位。以后表示的是一个层级
  
  - 两个斜杠表示的是跨越多个层级
  
  - 属性定位：固定格式：`tag[@attrName="attrValue"]`。以下示例为定位到class=song的div`//div[@class="song"]`

  - 索引定位：`//div[@class="song"]/p[3]`说明p是前面的直系子节点。返回的列表，下标从1开始，不是从0开始
  
  - 获得文本：
  
    -  `//div[@class="tang"i//li[5]/a/text()` 使用`/text()`返回标签**直系内容**的文本列表，使用`//text()`返回所有的文本内容
  
  - 获得属性：
  
    直接`/属性名`获得属性的值
  
  - **注意**：使用`/`一定代表着从最开始的**根标签**开始。如果想从当前元素开始往下找的话，应该使用`./`作为当前的标签路径。
  
  - 解析的时候可以使用`|`或运算，同时解析好几个xpath
  
  
  
  
  

## 验证码识别

验证码是反爬机制

识别验证码的方式

- 人工肉眼识别
- 第三方自动识别



## Cookie登录

http/https协议特性：**无状态**

用户发送请求后，并不会记住用户的状态

因此登陆后，第二次发起个人页面的请求的时候，服务器是不知道此请求是在登录状态下发送的

cookie：用来让服务器端记录用户的登陆状态

#### 手动处理

把cookie复制，封装到header中

```python
header = {
	'Cookie' : 'xxx',
}
```

上述方法通用性不强，因为cookie是有时间的

#### 自动处理

要知道cookie是从哪里来的

寻找post请求，查看返回头

**使用session模块**

1. 进行请求的放松
2. 如果请求过程中产生了cookie，则cookie会被自动保存在session里面

- 使用session对象进行模拟登录post请求的发送
- 使用session对象再发送get请求

```python
session = requests.Session()
response = session.post(url=,headers=, data=)

得到返回后，再用session去get
page_text = session.get(url, headers).text
```

## 代理

当发起请求的次数太多的时候，会导致ip被封锁。

- 破解IP这种反爬机制

代理的作用

1. 可以突破自身ip访问的限制
2. 可以防止自身ip被封锁

代理相关网站

- 快代理
- 自此代理
- http://www.data5u.com/
- http://www.goubanjia.com/

代理类型

- http：只能应用到http协议对应的url中
- https：只能对应到https的url中

代理ip的匿名成都

- 透明：服务器知道你使用了代理，也知道你本机的ip
- 匿名：知道使用了代理，但是不知道真是的ip
- 高匿名：不知道使用了代理，更不知道真是的ip

```python
import requests
from lxml import etree
url = "https://www.baidu.com/s?wd=ip"

headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'
}

page_text = requests.hget(ur=url,headers=headers,proxies={"https":"183.247.152.98:8888"} )
                                                          
tree = etree.HTML(page_text)
tree.xpath('/html/body/div[1]/div[3]/div[1]/div[3]/div[1]/div[1]/div[1]/div[2]/table/tbody/tr/td/span')
```

