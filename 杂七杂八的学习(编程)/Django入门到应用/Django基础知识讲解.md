## ORM

Object relational mapping



## 初始化工程

```
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```

这些目录和文件的用处是：

- 最外层的 `mysite/` 根目录只是你项目的容器， 根目录名称对Django没有影响，你可以将它重命名为任何你喜欢的名称。
- `manage.py`: 一个让你用各种方式**管理 Django 项目的命令行工具**。你可以阅读 [django-admin and manage.py](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/) 获取所有 `manage.py` 的细节。
- 里面一层的 `mysite/` 目录包含你的项目，它是一个纯 Python 包。它的名字就是当你引用它内部任何东西时需要用到的 Python 包名。 (比如 `mysite.urls`).
- `mysite/__init__.py`：一个空文件，告诉 Python 这个目录应该被认为是一个 Python 包。如果你是 Python 初学者，阅读官方文档中的 [更多关于包的知识](https://docs.python.org/3/tutorial/modules.html#tut-packages)。
- `mysite/settings.py`：Django 项目的配置文件。如果你想知道这个文件是如何工作的，请查看 [Django 配置](https://docs.djangoproject.com/zh-hans/3.1/topics/settings/) 了解细节。
- `mysite/urls.py`：Django 项目的 URL 声明，就像你网站的“目录”。阅读 [URL调度器](https://docs.djangoproject.com/zh-hans/3.1/topics/http/urls/) 文档来获取更多关于 URL 的内容。
- `mysite/asgi.py`：作为你的项目的运行在 ASGI 兼容的Web服务器上的入口。阅读 [如何使用 ASGI 来部署](https://docs.djangoproject.com/zh-hans/3.1/howto/deployment/asgi/) 了解更多细节。
- `mysite/wsgi.py`：作为你的项目的运行在 WSGI 兼容的Web服务器上的入口。阅读 [如何使用 WSGI 进行部署](https://docs.djangoproject.com/zh-hans/3.1/howto/deployment/wsgi/) 了解更多细节。

## 新建app，编写视图，添加URLconf

在manage.py目录下，运行以下命令创建一个应用

```
$ python manage.py startapp polls
```

打开 `polls/views.py`，把下面这些 Python 代码输入进去

```
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```

这是 Django 中最简单的视图。如果想看见效果，我们需要将一个 URL 映射到它——这就是我们需要 URLconf 的原因了。

为了创建 URLconf，请在 polls 目录里新建一个 `urls.py` 文件。

在 `polls/urls.py` 中，输入如下代码：

```
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

## 添加url到根 URLconf 文件中

下一步是要在根 URLconf 文件中指定我们创建的 `polls.urls` 模块。在 `mysite/urls.py` 文件的 `urlpatterns` 列表里插入一个 `include()`， 如下：

```
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

**函数 [`include()`](https://docs.djangoproject.com/zh-hans/3.1/ref/urls/#django.urls.include) 允许引用其它 URLconfs。**每当 Django 遇到 [`include()`](https://docs.djangoproject.com/zh-hans/3.1/ref/urls/#django.urls.include) 时，**它会截断与此项匹配的 URL 的部分**，并将**剩余的字符串发送到 URLconf 以供进一步处理**。

我们设计 [`include()`](https://docs.djangoproject.com/zh-hans/3.1/ref/urls/#django.urls.include) 的理念是使其可以即插即用。因为投票应用有它自己的 URLconf( `polls/urls.py` )，他们能够被放在 "/polls/" ， "/fun_polls/" ，"/content/polls/"，或者其他任何路径下，这个应用都能够正常工作。

**函数 [`path()`](https://docs.djangoproject.com/zh-hans/3.1/ref/urls/#django.urls.path) 具有四个参数，**两个必须参数：`route` 和 `view`，两个可选参数：`kwargs` 和 `name`。现在，是时候来研究这些参数的含义了。

**[`path()`](https://docs.djangoproject.com/zh-hans/3.1/ref/urls/#django.urls.path) 参数： `route`[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial01/#path-argument-route)**

`route` 是一个匹配 URL 的准则（类似正则表达式）。当 Django 响应一个请求时，它会从 `urlpatterns` 的第一项开始，按顺序依次匹配列表中的项，直到找到匹配的项。

这些准则不会匹配 GET 和 POST 参数或域名。例如，URLconf 在处理请求 `https://www.example.com/myapp/` 时，它会尝试匹配 `myapp/` 。处理请求 `https://www.example.com/myapp/?page=3` 时，也只会尝试匹配 `myapp/`。



**[`path()`](https://docs.djangoproject.com/zh-hans/3.1/ref/urls/#django.urls.path) 参数： `view`[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial01/#path-argument-view)**

当 Django 找到了一个匹配的准则，就会调用这个特定的视图函数，并传入一个 [`HttpRequest`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpRequest) 对象作为第一个参数，被“捕获”的参数以关键字参数的形式传入。稍后，我们会给出一个例子。



**[`path()`](https://docs.djangoproject.com/zh-hans/3.1/ref/urls/#django.urls.path) 参数： `kwargs`[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial01/#path-argument-kwargs)**

任意个关键字参数可以作为一个字典传递给目标视图函数。本教程中不会使用这一特性。



**[`path()`](https://docs.djangoproject.com/zh-hans/3.1/ref/urls/#django.urls.path) 参数： `name`[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial01/#path-argument-name)**

为你的 URL 取名能使你在 Django 的任意地方唯一地引用它，尤其是在模板中。这个有用的特性允许你只改一个文件就能全局地修改某个 URL 模式。

## 数据库配置

打开 `mysite/settings.py` 。这是个包含了 Django 项目设置的 Python 模块。可以看到默认使用的是SQLite数据库

```python
# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```



如果你想使用其他数据库，你需要安装合适的 [database bindings](https://docs.djangoproject.com/zh-hans/3.1/topics/install/#database-installation) ，然后改变设置文件中 [`DATABASES`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-DATABASES) `'default'` 项目中的一些键值：

- [`ENGINE`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-DATABASE-ENGINE) -- 可选值有 `'django.db.backends.sqlite3'`，`'django.db.backends.postgresql'`，`'django.db.backends.mysql'`，或 `'django.db.backends.oracle'`。其它 [可用后端](https://docs.djangoproject.com/zh-hans/3.1/ref/databases/#third-party-notes)。
- [`NAME`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-NAME) -- 数据库的名称。如果你使用 SQLite，数据库将是你电脑上的一个文件，在这种情况下，[`NAME`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-NAME) 应该是此文件完整的绝对路径，包括文件名。默认值 `BASE_DIR / 'db.sqlite3'` 将把数据库文件储存在项目的根目录。

如果你不使用 SQLite，则必须添加一些额外设置，比如 [`USER`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-USER) 、 [`PASSWORD`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-PASSWORD) 、 [`HOST`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-HOST) 等等。想了解更多数据库设置方面的内容，请看文档：[`DATABASES`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-DATABASES) 。

## INSTALLED_APPS

这里包括了会在你项目中启用的所有 Django 应用。应用能在多个项目中使用，你也可以打包并且发布应用，让别人使用它们。通常， [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-INSTALLED_APPS) 默认包括了以下 Django 的自带应用：

- [`django.contrib.admin`](https://docs.djangoproject.com/zh-hans/3.1/ref/contrib/admin/#module-django.contrib.admin) -- 管理员站点， 你很快就会使用它。
- [`django.contrib.auth`](https://docs.djangoproject.com/zh-hans/3.1/topics/auth/#module-django.contrib.auth) -- 认证授权系统。
- [`django.contrib.contenttypes`](https://docs.djangoproject.com/zh-hans/3.1/ref/contrib/contenttypes/#module-django.contrib.contenttypes) -- 内容类型框架。
- [`django.contrib.sessions`](https://docs.djangoproject.com/zh-hans/3.1/topics/http/sessions/#module-django.contrib.sessions) -- 会话框架。
- [`django.contrib.messages`](https://docs.djangoproject.com/zh-hans/3.1/ref/contrib/messages/#module-django.contrib.messages) -- 消息框架。
- [`django.contrib.staticfiles`](https://docs.djangoproject.com/zh-hans/3.1/ref/contrib/staticfiles/#module-django.contrib.staticfiles) -- 管理静态文件的框架。

默认开启的某些应用需要至少一个数据表，所以，在使用他们之前需要在数据库中创建一些表。请执行以下命令：

```
python manage.py migrate
```

这个 [`migrate`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-migrate) 命令检查 [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-INSTALLED_APPS) 设置，为其中的每个应用创建需要的数据表，至于具体会创建什么，这取决于你的 `mysite/settings.py` 设置文件和每个应用的数据库迁移文件（我们稍后会介绍这个）。这个命令所执行的每个迁移操作都会在终端中显示出来。如果你感兴趣的话，运行你数据库的命令行工具，并输入 `\dt` (PostgreSQL)， `SHOW TABLES;` (MariaDB,MySQL)， `.schema` (SQLite)或者 `SELECT TABLE_NAME FROM USER_TABLES;` (Oracle) 来看看 Django 到底创建了哪些表。



## 日期本地化

https://www.jianshu.com/p/f876fec012d5

- LANGUAGE_CODE = 'en-us'` 语言是美式英文，更改为中文汉字 `zh-hans
- TIME_ZONE = 'UTC'` 市区为国际标准时间（格林威治时间）。将其更改为亚洲/上海 `Asia/Shanghai
- `USE_I18N = True` 代表是否国际化，设置为 True 不动。
- `USE_TZ = True` 全称是 Use Time Zone，表示是否使用时区，如果设为False，前面的时区设定就没有意义。这里可以设置为`Tr`。



## 模型创建

在models.py文件夹下创建文件

```python
from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

**注意：您可能会想通过覆盖`__init__` 方法来定制模型。但是，如果这样做，请注意不要更改调用签名，因为任何更改都可能导致模型实例无法保存。不要覆盖`__init__`，而是尝试使用以下方法之一**

1. 在模型类上添加一个类方法：

   ```python
   from django.db import models
   
   class Book(models.Model):
       title = models.CharField(max_length=100)
   
       @classmethod
       def create(cls, title):
           book = cls(title=title)
           # do something with the book
           return book
   
   book = Book.create("Pride and Prejudice")
   ```

   

2. 在自定义管理器上添加方法（通常是首选方法）

   ```python
   class BookManager(models.Manager):
   	def create_book(self, title):
           book = self.create(title=title)
           # do something with the book
           return book
   
   class Book(models.Model):
       title = models.CharField(max_length=100)
   
       objects = BookManager()
   
   book = Book.objects.create_book("Pride and Prejudice")
   ```

## 模型的字段

每个**字段都是 [`Field`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/fields/#django.db.models.Field) 类的实例** - 比如，字符字段被表示为 [`CharField`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/fields/#django.db.models.CharField) ，日期时间字段被表示为 [`DateTimeField`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/fields/#django.db.models.DateTimeField) 。这将告诉 Django 每个字段要处理的数据类型。

**每个 [`Field`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/fields/#django.db.models.Field) 类实例变量的名字（例如 `question_text` 或 `pub_date` ）也是字段名**，所以最好使用对机器友好的格式。你将会在 Python 代码里使用它们，而数据库会将它们作为列名。

定义某些 [`Field`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/fields/#django.db.models.Field) 类实例需要参数。例如 [`CharField`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/fields/#django.db.models.CharField) 需要一个 [`max_length`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/fields/#django.db.models.CharField.max_length) 参数。这个参数的用处不止于用来定义数据库结构，也用于验证数据，我们稍后将会看到这方面的内容。

## 激活模型

首先得把 `polls` 应用安装到我们的项目里，这样在polls里面创建的模型才会被应用到整个项目中。

为了在我们的工程中包含这个应用，我们需要在配置类 [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-INSTALLED_APPS) 中添加设置。因为 `PollsConfig` 类写在文件 `polls/apps.py` 中，所以它的点式路径是 `'polls.apps.PollsConfig'`。在文件 `mysite/settings.py` 中 [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-INSTALLED_APPS) 子项添加点式路径后，它看起来像这样：

```
INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

现在你的 Django 项目会包含 `polls` 应用。接着运行下面的命令：

```
$ python manage.py makemigrations polls
```

你将会看到类似于下面这样的输出：

```
Migrations for 'polls':
  polls/migrations/0001_initial.py
    - Create model Question
    - Create model Choice
```

通过运行 `makemigrations` 命令，Django **会检测你对模型文件的修改**（在这种情况下，你已经取得了新的），并且**把修改的部分储存为一次 *迁移*。**

**迁移**是 Django 对于模型定义（也就是你的数据库结构）的变化的储存形式 - 它们其实也只是一些你磁盘上的文件。如果你想的话，你可以阅读一下你模型的迁移数据，它被储存在 `polls/migrations/0001_initial.py` 里。别担心，你不需要每次都阅读迁移文件，但是它们被设计成人类可读的形式，这是为了便于你手动调整Django的修改方式。

Django 有一个**自动执行数据库迁移并同步管理你的数据库结构的命令 - 这个命令是 [`migrate`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-migrate)**，我们马上就会接触它 - 但是首先，让我们看看迁移命令会执行哪些 SQL 语句。[`sqlmigrate`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-sqlmigrate) 命令接收一个迁移的名称，然后返回对应的 SQL：

```
python manage.py sqlmigrate polls 0001
```

注意以下几点：

- 输出的内容和你使用的数据库有关，上面的输出示例使用的是 PostgreSQL。
- 数据库的表名是由应用名(`polls`)和模型名的小写形式( `question` 和 `choice`)连接而来。（如果需要，你可以自定义此行为。）
- 主键(IDs)会被自动创建。(当然，你也可以自定义。)
- 默认的，Django 会在外键字段名后追加字符串 `"_id"` 。（同样，这也可以自定义。）
- 外键关系由 `FOREIGN KEY` 生成。你不用关心 `DEFERRABLE` 部分，它只是告诉 PostgreSQL，请在事务全都执行完之后再创建外键关系。
- 生成的 SQL 语句是为你所用的数据库定制的，所以那些和数据库有关的字段类型，比如 `auto_increment` (MySQL)、 `serial` (PostgreSQL)和 `integer primary key autoincrement` (SQLite)，Django 会帮你自动处理。那些和引号相关的事情 - 例如，是使用单引号还是双引号 - 也一样会被自动处理。
- 这个 [`sqlmigrate`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-sqlmigrate) 命令**并没有真正在你的数据库中的执行迁**移 - 相反，它只是把命令输出到屏幕上，让你看看 Django 认为需要执行哪些 SQL 语句。这在你想看看 Django 到底准备做什么，或者当你是数据库管理员，需要写脚本来批量处理数据库时会很有用。

现在，再次运行 [`migrate`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-migrate) 命令，在数据库里创建新定义的模型的数据表：

```
$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, polls, sessions
Running migrations:
  Rendering model states... DONE
  Applying polls.0001_initial... OK
```

这个 [`migrate`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-migrate) 命令选中所有**还没有执行过的迁移**（Django 通过在数据库中创建一个特殊的表 `django_migrations` 来跟踪执行过哪些迁移）并应用在数据库上 - 也就是将你对模型的更改同步到数据库结构上。

迁移是非常强大的功能，它能让你在开发过程中**持续的改变数据库结构而不需要重新删除和创建表** - 它专注于使数据库平滑升级而不会丢失数据。我们会在后面的教程中更加深入的学习这部分内容，现在，你只需要记住，改变模型**需要这三步：**

- **编辑 `models.py` 文件，改变模型。**
- **运行 [`python manage.py makemigrations`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-makemigrations) 为模型的改变生成迁移文件。**
- **运行 [`python manage.py migrate`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-migrate) 来应用数据库迁移。**

## 数据库API

使用命令行形式操纵数据库的数据

```
python manage.py shell
```

在进行数据库的修改之后，比如添加`__str__`，需要关闭命令行，重新启动，才会生效

 **导入刚才写进来的类**

```python
from polls.models import Choice, Question 
```

**依然还没有存入任何问题对象**

```python
>>> Question.objects.all()
<QuerySet []>
```

**创建问题对象**

注意，由于Django有日期的设置，因此使用自带模块中的`timezone`来获取当前时间是正确的，也就是`timezone.now()`，而python自带的`datetime.datetime.now()`是不太合适的。

```python
>>> from django.utils import timezone
>>> q = Question(question_text="What's new?", pub_date=timezone.now())
```

**保存对象的修改**

```python
q.save()
```

**通过Python属性访问模型字段值**

```python
>>> q.question_text
"What's new?"
>>> q.pub_date
datetime.datetime(2012, 2, 26, 13, 0, 0, 775217, tzinfo=<UTC>)
```

**执行查询**

```python
>>> Question.objects.filter(id=1)
<QuerySet [<Question: What's up?>]>
>>> Question.objects.filter(question_text__startswith='What')
<QuerySet [<Question: What's up?>]>
```

**保存时默认的主键**

```python
>>> Question.objects.get(pk=1)
<Question: What's up?>
```

**给Question创建几个Choices**

Django模型中的字段有个choices属性，这个属性可以提供被选数据。如果一个字段设置了这个属性,在模版中如果我要显示这个字段，那么django模版系统就会将它默认解析为一个下来菜单，这样对于一个静态的下拉菜单式很方便的。

在原来创建model的时候就定义choices的话，可以参考下面的语法

```python
from django.db import models

class Person(models.Model):
    SHIRT_SIZES = (
    ('S', 'Small'),
    ('M', 'Medium'),
    ('L', 'Large'),
    )
    name = models.CharField(max_length=60)
    shirt_size = models.CharField(max_length=1, choices=SHIRT_SIZES)
```

此时shirt_size保存了两个信息，一个为value，一个display_name，我要取value时直接用p.shirt_size即可。要获取一个choices所对应的值，可以使用`get_FOO_display()`方法，其中的FOO用字段名代替。对于下面的例子

```python
>>> p = Person(name="Fred Flintstone", shirt_size="L")
>>> p.save()
>>> p.shirt_size
'L'
>>> p.get_shirt_size_display()
'Large'
```

create指令创建了个Choice对象，并执行了INSERT操作，将choice插入到了可用的的choice**集合**中，并且返回新的Choice对象。Django中会创建 **set集合** 来表示外键（比如问题的choice）

```python
>>> q = Question.objects.get(pk=1)

# 显示相关对象集合中的任何choice  -- 现在还没有.
>>> q.choice_set.all()
<QuerySet []>

# 创建三个choice
>>> q.choice_set.create(choice_text='Not much', votes=0)
<Choice: Not much>
>>> q.choice_set.create(choice_text='The sky', votes=0)
<Choice: The sky>
>>> c = q.choice_set.create(choice_text='Just hacking again', votes=0)

# Choice 对象有访问 Question 对象的API权限.
>>> c.question
<Question: What's up?>

# 反之亦然: Question objects 能够访问 Choice objects.
>>> q.choice_set.all()
<QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>
>>> q.choice_set.count()
3

# API会根据您的需要自动遵循关系
# 使用双下划线分隔关系，类似.的用法，下面就要访问question.pub_date.year
# 这可以根据需要进行任意深度的工作。没有限制
# 查找所有年份为pub_date的问题的所有选项
# （重用我们上面创建的'current_year'变量）。
>>> from django.utils import timezone
>>> current_year = timezone.now().year
>>> Choice.objects.filter(question__pub_date__year=current_year)
<QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>

# 使用delete()删除一个元素
>>> c = q.choice_set.filter(choice_text__startswith='Just hacking')
>>> c.delete()
```

阅读 [访问关系对象](https://docs.djangoproject.com/zh-hans/3.1/ref/models/relations/) 文档可以获取关于数据库关系的更多内容。想知道关于双下划线的更多用法，参见 [查找字段](https://docs.djangoproject.com/zh-hans/3.1/topics/db/queries/#field-lookups-intro) 文档。数据库 API 的所有细节可以在 [数据库 API 参考](https://docs.djangoproject.com/zh-hans/3.1/topics/db/queries/) 文档中找到。

## FOREIGN KEY和UNIQUE KEY

一个表中的 FOREIGN KEY 指向另一个表中的 UNIQUE KEY(唯一约束的键)。

让我们通过一个实例来解释外键。请看下面两个表：

"Persons" 表：

| P_Id | LastName  | FirstName | Address      | City      |
| :--- | :-------- | :-------- | :----------- | :-------- |
| 1    | Hansen    | Ola       | Timoteivn 10 | Sandnes   |
| 2    | Svendson  | Tove      | Borgvn 23    | Sandnes   |
| 3    | Pettersen | Kari      | Storgt 20    | Stavanger |

"Orders" 表：

| O_Id | OrderNo | P_Id |
| :--- | :------ | :--- |
| 1    | 77895   | 3    |
| 2    | 44678   | 3    |
| 3    | 22456   | 2    |
| 4    | 24562   | 1    |

请注意，"Orders" 表中的 "P_Id" 列指向 "Persons" 表中的 "P_Id" 列。

"Persons" 表中的 "P_Id" 列是 "Persons" 表中的 PRIMARY KEY。

"Orders" 表中的 "P_Id" 列是 "Orders" 表中的 FOREIGN KEY。

FOREIGN KEY 约束用于预防破坏表之间连接的行为。

FOREIGN KEY 约束也能防止非法数据插入外键列，因为它必须是它指向的那个表中的值之一。

**下面的 SQL 在 "Orders" 表创建时在 "P_Id" 列上创建 FOREIGN KEY 约束：**

```mysql
CREATE TABLE Orders
(
O_Id int NOT NULL,
OrderNo int NOT NULL,
P_Id int,
PRIMARY KEY (O_Id),
FOREIGN KEY (P_Id) REFERENCES Persons(P_Id)
)
```

**当 "Orders" 表已被创建时，如需在 "P_Id" 列创建 FOREIGN KEY 约束，请使用下面的 SQL：**

```mysql
ALTER TABLE Orders
ADD FOREIGN KEY (P_Id)
REFERENCES Persons(P_Id)
```

**如需命名 FOREIGN KEY 约束，并定义多个列的 FOREIGN KEY 约束，请使用下面的 SQL 语法：**

```mysql
ALTER TABLE Orders
ADD CONSTRAINT fk_PerOrders
FOREIGN KEY (P_Id)
REFERENCES Persons(P_Id)
```

**如需撤销 FOREIGN KEY 约束，请使用下面的 SQL：**

```mysql
ALTER TABLE Orders
DROP FOREIGN KEY fk_PerOrders
```

## Django管理页面

**首先我们要创建一个管理者账号**

```
python manage.py createsuperuser
```

接着输入用户名和密码就能够登录

你将会看到几种可编辑的内容：组和用户。它们是由 [`django.contrib.auth`](https://docs.djangoproject.com/zh-hans/3.1/topics/auth/#module-django.contrib.auth) 提供的，这是 Django 开发的认证框架。

**向管理页面中加入投票应用[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial02/#make-the-poll-app-modifiable-in-the-admin)**

只需要再做一件事：我们得告诉管理员，问题 `Question` 对象需要一个后台接口。打开 `polls/admin.py` 文件，把它编辑成下面这样：

```python
from django.contrib import admin

from .models import Question

admin.site.register(Question)
```

点击 "Questions" 。现在看到是问题 "Questions" 对象的列表 "change list" 。这个界面会显示所有数据库里的问题 Question 对象，你可以选择一个来修改。这里现在有我们在上一部分中创建的 “What's new?” 问题。

- 这个**表单**是从**问题 `Question` 模型中自动生成的**
- 不同的字段类型（日期时间字段 [`DateTimeField`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/fields/#django.db.models.DateTimeField) 、字符字段 [`CharField`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/fields/#django.db.models.CharField)）会生成对应的 **HTML 输入控件**。每个类型的字段都知道它们该如何在管理页面里显示自己。
- 每个日期时间字段 [`DateTimeField`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/fields/#django.db.models.DateTimeField) 都有 JavaScript 写的快捷按钮。日期有转到今天（Today）的快捷按钮和一个弹出式日历界面。时间有设为现在（Now）的快捷按钮和一个列出常用时间的方便的弹出式列表。

页面的底部提供了几个选项：

- 保存（Save） - 保存改变，然后返回对象列表。
- 保存并继续编辑（Save and continue editing） - 保存改变，然后重新载入当前对象的修改界面。
- 保存并新增（Save and add another） - 保存改变，然后添加一个新的空对象并载入修改界面。
- 删除（Delete） - 显示一个确认删除页面。

通过点击 “今天(Today)” 和 “现在(Now)” 按钮改变 “发布日期(Date Published)”。然后点击 “**保存并继续编辑**(Save and add another)”按钮。然后点击右上角的 “**历史(History)**”按钮。你会看到一个**列出了所有通过 Django 管理页面对当前对象进行的改变的页面**，其中列出了时间戳和进行修改操作的用户名.

## 视图

在 Django 中，**网页和其他内容都是从视图派生而来**。每一个**视图表现为一个 Python 函数**（或者说方法，如果是在基于类的视图里的话）。Django 将会根据用户请求的 URL 来选择使用哪个视图（更准确的说，是根据 URL 中域名之后的部分）。

为了将 URL 和视图关联起来，Django 使用了 'URLconfs' 来配置。URLconf 将 URL 模式映射到视图。

本教程只会介绍 URLconf 的基础内容，你可以看看 [URL调度器](https://docs.djangoproject.com/zh-hans/3.1/topics/http/urls/) 以获取更多内容。

现在让我们向 `polls/views.py` 里添加更多视图。这些视图有一些不同，因为他们接收参数：

polls/views.py[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial03/#id2)

```
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
```

把这些新视图添加进 `polls.urls` 模块里，只要添加几个 [`url()`](https://docs.djangoproject.com/zh-hans/3.1/ref/urls/#django.conf.urls.url) 函数调用就行：

polls/urls.py[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial03/#id3)

```
from django.urls import path

from . import views

urlpatterns = [
    # ex: /polls/
    path('', views.index, name='index'),
    # ex: /polls/5/
    path('<int:question_id>/', views.detail, name='detail'),
    # ex: /polls/5/results/
    path('<int:question_id>/results/', views.results, name='results'),
    # ex: /polls/5/vote/
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```

然后看看你的浏览器，如果你转到 "/polls/34/" ，Django 将会运行 `detail()` 方法并且展示你在 URL 里提供的问题 ID。再试试 "/polls/34/vote/" 和 "/polls/34/vote/" ——你将会看到暂时用于占位的结果和投票页。

当某人请求你网站的某一页面时——比如说， "/polls/34/" ，**Django 将会载入 `mysite.urls` 模块**，因为这在配置项 [`ROOT_URLCONF`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-ROOT_URLCONF) 中设置了。**然后 Django 寻找名为 `urlpatterns` 变量并且按序匹配正则表达式**。在**找到匹配项 `'polls/'`**，它切掉了**匹配的文本（`"polls/"`），将剩余文本——`"34/"`，发送至 'polls.urls' URLconf 做进一步处理**。在这里**剩余文本匹配了 `'<int:question_id>/'`**，使得我们 Django 以如下形式调用 `detail()`:

```
detail(request=<HttpRequest object>, question_id=34)
```

`question_id=34` 由 `<int:question_id>` 匹配生成。使用尖括号“捕获”这部分 URL，且以关键字参数的形式发送给视图函数。上述字符串的 **`:question_id>` 部分定义了将被用于区分匹配模式的变量名**，而 **`int:` 则是一个转换器决定了应该以什么变量类型匹配这部分的 URL 路径**。

## 视图的返回

每个视图必须要做的只有两件事：**返回一个包含被请求页面内容的 [`HttpResponse`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpResponse) 对象**，或者抛出**一个异常，比如 [`Http404`](https://docs.djangoproject.com/zh-hans/3.1/topics/http/views/#django.http.Http404)** 。至于你还想干些什么，随便你。

## 模板

这里有个问题：**页面的设计写死在视图函数的代码里的**。如果你想改变页面的样子，你需要编辑 Python 代码。所以让我们使用 **Django 的模板系统**，只要创建一个视图，就可以将页面的设计从代码中分离出来。

你项目的setting.py中的 [`TEMPLATES`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-TEMPLATES) 配置项描述了 Django 如何载入和渲染模板。默认的设置文件设置了 `DjangoTemplates` 后端，并将 [`APP_DIRS`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-TEMPLATES-APP_DIRS) 设置成了 True。这一选项将会让 `DjangoTemplates` 在每个 [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-INSTALLED_APPS) 文件夹中寻找 "templates" 子目录。这就是为什么尽管我们没有像在**第二部分中修改数据库那样修改 DIRS 设置**，Django 也能正确找到 polls 的模板位置的原因。

**在你刚刚创建的 `templates` 目录里，再创建一个目录 `polls`，然后在其中新建一个文件 `index.html` 。**换句话说，你的模板文件的路径应该是 `polls/templates/polls/index.html` 。**因为``app_directories`` 模板加载器是通过上述描述的方法运行的，所以Django可以引用到 `polls/index.html` 这一模板了。**

> 虽然我们现在可以将模板文件直接放在 `polls/templates` 文件夹中（而不是再建立一个 `polls` 子文件夹），但是这样做不太好。Django 将会选择第一个匹配的模板文件，如果你有一个模板文件正好和另一个应用中的某个模板文件重名，Django 没有办法 *区分* 它们。我们需要帮助 Django 选择正确的模板，最好的方法就是把他们放入各自的 *命名空间* 中，也就是把这些模板放入一个和 *自身* 应用重名的子文件夹里。

将下面的代码输入到刚刚创建的模板文件中：

```
{% if latest_question_list %}
    <ul>
    {% for question in latest_question_list %}
        <li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
    {% endfor %}
    </ul>
{% else %}
    <p>No polls are available.</p>
{% endif %}
```

然后，让我们更新一下 `polls/views.py` 里的 `index` 视图来使用模板：

```python
from django.http import HttpResponse
from django.template import loader

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))
```

上述代码的作用是，

1. **载入 `polls/index.html` 模板文件**，
2. **向它传递一个上下文(context)。**这个上下文是一个字典，它将模板内的变量映射为 Python 对象。
3. 用你的浏览器访问 "/polls/" ，你将会看见一个无序列表，列出了我们在 [教程第 2 部分](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial02/) 中添加的 “What's up” 投票问题，链接指向这个投票的详情页。

## 快捷返回模板的函数 render()

「载入模板，填充上下文，再返回由它生成的 [`HttpResponse`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpResponse) 对象」是一个非常常用的操作流程。于是 Django 提供了一个快捷函数，我们用它来重写 `index()` 视图：

```python
from django.shortcuts import render

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'polls/index.html', context)
```

注意到，我们不再需要导入 [`loader`](https://docs.djangoproject.com/zh-hans/3.1/topics/templates/#module-django.template.loader) 和 [`HttpResponse`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpResponse) 。不过如果你还有其他函数（比如说 `detail`, `results`, 和 `vote` ）需要用到它的话，就需要保持 `HttpResponse` 的导入。

该[`render()`](https://docs.djangoproject.com/zh-hans/3.1/topics/http/shortcuts/#django.shortcuts.render)函数将请求对象作为其第一个参数，将模板名称作为其第二个参数，并将字典作为其可选的第三个参数。它返回使用[`HttpResponse`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpResponse) 给定上下文呈现的给定模板的对象。

## 404错误

现在，我们来处理投票详情视图——它会显示指定投票的问题标题。下面是这个视图的代码：

```python
from django.http import Http404
from django.shortcuts import render

from .models import Question
# ...
def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, 'polls/detail.html', {'question': question})
```

这里有个新原则。如果指定问题 ID 所对应的问题不存在，这个视图就会抛出一个 [`Http404`](https://docs.djangoproject.com/zh-hans/3.1/topics/http/views/#django.http.Http404) 异常。

尝试用 [`get()`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/querysets/#django.db.models.query.QuerySet.get) 函数获取一个对象，如果不存在就抛出 [`Http404`](https://docs.djangoproject.com/zh-hans/3.1/topics/http/views/#django.http.Http404) 错误也是一个普遍的流程。Django 也提供了一个快捷函数，下面是修改后的详情 `detail()` 视图代码：

polls/views.py[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial03/#id10)

```python
from django.shortcuts import get_object_or_404, render

from .models import Question
# ...
def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})
```

该[`get_object_or_404()`](https://docs.djangoproject.com/zh-hans/3.1/topics/http/shortcuts/#django.shortcuts.get_object_or_404)函数将Django模型作为其第一个参数，**并将任意数量的关键字参数作为参数传递给[`get()`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/querysets/#django.db.models.query.QuerySet.get)模型管理器的函数**。[`Http404`](https://docs.djangoproject.com/zh-hans/3.1/topics/http/views/#django.http.Http404)如果对象不存在，它将引发。

也有 [`get_list_or_404()`](https://docs.djangoproject.com/zh-hans/3.1/topics/http/shortcuts/#django.shortcuts.get_list_or_404) 函数，工作原理和 [`get_object_or_404()`](https://docs.djangoproject.com/zh-hans/3.1/topics/http/shortcuts/#django.shortcuts.get_object_or_404) 一样，**除了 [`get()`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/querysets/#django.db.models.query.QuerySet.get) 函数被换成了 [`filter()`](https://docs.djangoproject.com/zh-hans/3.1/ref/models/querysets/#django.db.models.query.QuerySet.filter) 函数**。如果列表为空的话会抛出 [`Http404`](https://docs.djangoproject.com/zh-hans/3.1/topics/http/views/#django.http.Http404) 异常。



## 使用模板系统

回过头去看看我们的 `detail()` 视图。它向模板传递了上下文变量 `question` 。下面是 `polls/detail.html` 模板里正式的代码：

```
<h1>{{ question.question_text }}</h1>
<ul>
{% for choice in question.choice_set.all %}
    <li>{{ choice.choice_text }}</li>
{% endfor %}
</ul>
```

模板系统统一使用**点符号来访问变量的属性**。在示例 `{{ question.question_text }}` 中，**首先 Django 尝试对 `question` 对象使用字典查找（也就是使用 obj.get(str) 操作），如果失败了就尝试属性查找（也就是 obj.str 操作），结果是成功了。如果这一操作也失败的话，将会尝试列表查找（也就是 obj[int] 操作）。**

在 [`{% for %}`](https://docs.djangoproject.com/zh-hans/3.1/ref/templates/builtins/#std:templatetag-for) 循环中发生的函数调用：`question.choice_set.all` 被解释为 Python 代码 `question.choice_set.all()` ，将会返回一个可迭代的 `Choice` 对象，这一对象可以在 [`{% for %}`](https://docs.djangoproject.com/zh-hans/3.1/ref/templates/builtins/#std:templatetag-for) 标签内部使用。

查看 [模板指南](https://docs.djangoproject.com/zh-hans/3.1/topics/templates/) 可以了解关于模板的更多信息。

## 去除硬编码URL

原来的投票页面 `polls/index.html` 中，链接是硬编码的

```
<li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
```

问题在于，**硬编码和强耦合的链接，对于一个包含很多应用的项目来说，修改起来是十分困难的。**然而，因为**你在 `polls.urls` 的 [`url()`](https://docs.djangoproject.com/zh-hans/3.1/ref/urls/#django.conf.urls.url) 函数中通过 name 参数为 URL 定义了名字**，你可以**使用 `{% url %}` 标签代替它**。这个标签的工作方式是在 `polls.urls` 模块的 URL 定义中**寻找具有指定名字的条目**。你可以回忆一下，具有名字 'detail' 的 URL 是在如下语句中定义的：

```html
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```

同理，你也可以替换成别的url名字，比如`results`，把URL的名字写进去，参数跟着在后面就可以了，不需要管他的顺序 。

如果你想改变投票详情视图的 URL，比如想改成 `polls/specifics/12/` ，你不用在模板里修改任何东西（包括其它模板），只要在 `polls/urls.py` 里稍微修改一下就行：

## URL的命名空间

教程项目只有一个应用，`polls` 。在一个真实的 Django 项目中，可能会有五个，十个，二十个，甚至更多应用。Django 如何分辨重名的 URL 呢？**举个例子，`polls` 应用有 `detail` 视图，可能另一个博客应用也有`detail` 视图**。Django **如何知道 `{% url %}` 标签到底对应哪一个应用的 URL 呢？**

答案是：在根 URLconf 中添加命名空间。在 `polls/urls.py` 文件中稍作修改，**加上 `app_name` 设置命名空间：**

```python
from django.urls import path

from . import views

app_name = 'polls'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```

现在，编辑 `polls/index.html` 文件，从：

```
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```

修改为指向具有命名空间的详细视图：

```
<li><a href="{% url 'polls:detail' question.id %}">{{ question.question_text }}</a></li>
```

## 简单的表单

让我们更新一下在上一个教程中编写的投票详细页面的模板 ("polls/detail.html") ，让它包含一个 HTML `<form>` 元素：

```html
{% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}

<form action="{% url 'polls:vote' question.id %}" method="post">
{% csrf_token %}
{% for choice in question.choice_set.all %}
    <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}">
    <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
{% endfor %}
<input type="submit" value="Vote">
</form>
```

- 上面的模板在 Question 的每个 Choice 前添加一个单选按钮。 **每个单选按钮的 `value` 属性是对应的各个 Choice 的 ID**。每个单选按钮的 `name` 是 `"choice"` 。这意味着，当有人选择一个单选按钮并提交表单提交时，**它将发送一个 POST 数据 `choice=#`** ，其中# 为选择的 Choice 的 ID。这是 HTML 表单的基本概念。
- 我们设置表单的 `action` 为 `{% url 'polls:vote' question.id %}` ，并设置 `method="post"` 。使用 `method="post"(与其相对的是 method="get")`是非常重要的，因为这个提交表单的行为会改变服务器端的数据。 **无论何时，当你需要创建一个改变服务器端数据的表单时，请使用 ``method="post"` 。这不是 Django 的特定技巧；这是优秀的网站开发技巧。**
- **`forloop.counter` 指示 [`for`](https://docs.djangoproject.com/zh-hans/3.1/ref/templates/builtins/#std:templatetag-for) 标签已经循环多少次。**
- 由于我们创建一个 POST 表单（它具有修改数据的作用），所以我们需要**小心跨站点请求伪造**。 谢天谢地，你不必太过担心，因为 Django 自带了一个非常有用的防御系统。 **简而言之，所有针对内部 URL 的 POST 表单都应该使用 [`{% csrf_token %}`](https://docs.djangoproject.com/zh-hans/3.1/ref/templates/builtins/#std:templatetag-csrf_token) 模板标签。**



对于vote方法进行实例化

```python
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse

from .models import Choice, Question
# ...
def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # 成功处理POST数据后，始终返回HttpResponseRedirect。
        # 如果用户单击“后退”按钮，这将防止数据两次发布。
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
```

- [`request.POST`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpRequest.POST) 是一个**类字典对象**，让你可以通过关键字的名字获取提交的数据。 这个例子中， `request.POST['choice']` 以字符串形式返回选择的 Choice 的 ID。 [`request.POST`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpRequest.POST) 的值永远是字符串。

  注意，Django 还以同样的方式提供 [`request.GET`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpRequest.GET) 用于访问 GET 数据 —— 但我们在代码中显式地使用 [`request.POST`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpRequest.POST) ，以保证数据只能通过 POST 调用改动。

- 如果在 `request.POST['choice']` 数据中没有提供 `choice` ， POST 将引发一个 [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError) 。上面的代码检查 [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError) ，如果没有给出 `choice` 将重新显示 Question 表单和一个错误信息。

- 在增加 Choice 的得票数之后，**代码返回一个 [`HttpResponseRedirect`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpResponseRedirect) 而不是常用的 [`HttpResponse`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpResponse)** 。 [`HttpResponseRedirect`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpResponseRedirect) 只接收一个参数：用户将要被重定向的 URL（请继续看下去，我们将会解释如何构造这个例子中的 URL）。

  正如上面的Python注释所指出的那样，在成功处理POST数据后，您应该始终返回[`HttpResponseRedirect`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpResponseRedirect)。本技巧不是特定于Django的。一般来说，这是良好的Web开发实践。

- 在这个例子中，我们在 [`HttpResponseRedirect`](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/#django.http.HttpResponseRedirect) 的构造函数中使用 **`reverse()` 函数。这个函数避免了我们在视图函数中硬编码 URL**。它需要我们给出我们想要跳转的视图的名字和该视图所对应的 URL 模式中需要给该视图提供的参数。 在本例中，使用在 [教程第 3 部分](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial03/) 中设定的 URLconf， **`reverse()` 调用将返回一个这样的字符串：**

```
'/polls/3/results/'
```

其中 `3` 是 `question.id` 的值。重定向的 URL 将调用 `'results'` 视图来显示最终的页面。

当有人对 Question 进行投票后， `vote()` 视图将请求重定向到 Question 的结果界面。让我们来编写这个视图：

```python
def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/results.html', {'question': question})
```

美中不足的是，它与 `detail()` 视图几乎一模一样。唯一的不同是模板的名字。 我们将在稍后解决这个冗余问题。

>我们的 `vote()` 视图代码有一个小问题。代码首先从数据库中获取了 `selected_choice` 对象，接着计算 `vote` 的新值，最后把值存回数据库。如果网站有两个方可同时投票在 *同一时间* ，可能会导致问题。同样的值，42，会被 `votes` 返回。然后，对于两个用户，新值43计算完毕，并被保存，但是期望值是44。

这个问题被称为 *竞争条件* 。如果你对此有兴趣，你可以阅读 [Avoiding race conditions using F()](https://docs.djangoproject.com/zh-hans/3.1/ref/models/expressions/#avoiding-race-conditions-using-f) 来学习如何解决这个问题。

## 使用通用视图：代码还是少点好

`detail()` （在 [教程第3部分](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial03/) 中）和 `results()` 视图都很精简 —— 并且，像上面提到的那样，存在冗余问题。用来显示一个投票列表的 `index()` 视图（也在 [教程第 3 部分](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial03/) 中）和它们类似。

这些视图反映基本的 Web 开发中的一个常见情况：根据 URL 中的参数从数据库中获取数据、载入模板文件然后返回渲染后的模板。 由于这种情况特别常见，**Django 提供一种快捷方式，叫做“通用视图”系统。**

通用视图将常见的模式抽象化，可以使你在编写应用时甚至不需要编写Python代码。

让我们将我们的投票应用转换成使用**通用视图**系统，这样我们可以删除许多我们的代码。我们仅仅需要做以下几步来完成转换，我们将：

1. 转换 URLconf。
2. 删除一些旧的、不再需要的视图。
3. 基于 Django 的通用视图引入新的视图。

### 改良URLconf

首先，打开 `polls/urls.py` 这个 URLconf 并将它修改成：

```python
from django.urls import path

from . import views

app_name = 'polls'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```

注意，第二个和第三个匹配准则中，**路径字符串中匹配模式的名称已经由 `<question_id>` 改为 `<pk>`。**

### 改良视图

下一步，我们将删除旧的 `index`, `detail`, 和 `results` 视图，并用 Django 的通用视图代替。打开 `polls/views.py` 文件，并将它修改成：

```
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic

from .models import Choice, Question


class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'


def vote(request, question_id):
    ... # same as above, no changes needed.
```

我们在这里使用**两个通用视图**： [`ListView`](https://docs.djangoproject.com/zh-hans/3.1/ref/class-based-views/generic-display/#django.views.generic.list.ListView) 和 [`DetailView`](https://docs.djangoproject.com/zh-hans/3.1/ref/class-based-views/generic-display/#django.views.generic.detail.DetailView) 。这两个视图分别抽象“**显示一个对象列表**”和“**显示一个特定类型对象的详细信息页面**”这两种概念。

- 每个通用视图需要知道它将作用于哪个模型。 **这由 `model` 属性提供。**
- [`DetailView`](https://docs.djangoproject.com/zh-hans/3.1/ref/class-based-views/generic-display/#django.views.generic.detail.DetailView) 期望从 URL 中捕获名为 `"pk"` 的主键值，所以我们为通用视图把 `question_id` 改成 `pk`

默认情况下，通用视图 [`DetailView`](https://docs.djangoproject.com/zh-hans/3.1/ref/class-based-views/generic-display/#django.views.generic.detail.DetailView) 使用一个叫做 **`<app name>/<model name>_detail.html` 的模板**。在我们的例子中，它将使用 `"polls/question_detail.html"` 模板。**`template_name` 属性是用来告诉 Django 使用一个指定的模板名字，而不是自动生成的默认名字。** 我们也为 `results` 列表视图指定了 `template_name` —— 这确保 results 视图和 detail 视图在渲染时具有不同的外观，即使它们在后台都是同一个 [`DetailView`](https://docs.djangoproject.com/zh-hans/3.1/ref/class-based-views/generic-display/#django.views.generic.detail.DetailView) 。

类似地，[`ListView`](https://docs.djangoproject.com/zh-hans/3.1/ref/class-based-views/generic-display/#django.views.generic.list.ListView) 使用一个叫做 `<app name>/<model name>_list.html` 的默认模板；**我们使用 `template_name` 来告诉 [`ListView`](https://docs.djangoproject.com/zh-hans/3.1/ref/class-based-views/generic-display/#django.views.generic.list.ListView) 使用我们创建的已经存在的 `"polls/index.html"` 模板。**

在之前的教程中，提供模板文件时都带有一个包含 `question` 和 `latest_question_list` 变量的 context。对于 `DetailView` ， `question` 变量会自动提供—— **因为我们使用 Django 的模型 (Question)， Django 能够为 context 变量决定一个合适的名字**。然而**对于 ListView， 自动生成的 context 变量是 `question_list`。**为了覆盖这个行为，我们提供 **`context_object_name` 属性，表示我们想使用 `latest_question_list`**。作为一种替换方案，你可以改变你的模板来匹配新的 context 变量 —— 这是一种更便捷的方法，告诉 Django 使用你想使用的变量名。

## Django的测试

我们的 `polls` 应用现在就有一个小 bug 需要被修复：我们的要求是如果 Question 是在一天之内发布的， `Question.was_published_recently()` 方法将会返回 `True` ，然而现在这个方法在 `Question` 的 `pub_date` 字段比当前时间还晚时也会返回 True（这是个 Bug）。

用djadmin:[`](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial05/#id1)shell`命令确认一下这个方法的日期bug

```python
>>> import datetime
>>> from django.utils import timezone
>>> from polls.models import Question
>>> # create a Question instance with pub_date 30 days in the future
>>> future_question = Question(pub_date=timezone.now() + datetime.timedelta(days=30))
>>> # was it published recently?
>>> future_question.was_published_recently()
True
```

### 创建一个测试来暴露这个 bug

Django 应用的测试应该写在应用的 `tests.py` 文件里。测试系统会自动的在所有以 `tests` 开头的文件里寻找并执行测试代码。

**将下面的代码写入 `polls` 应用里的 `tests.py` 文件内：**

```python
import datetime

from django.test import TestCase
from django.utils import timezone

from .models import Question


class QuestionModelTests(TestCase):

    def test_was_published_recently_with_future_question(self):
        """
        was_published_recently() returns False for questions whose pub_date
        is in the future.
        """
        time = timezone.now() + datetime.timedelta(days=30)
        future_question = Question(pub_date=time)
        self.assertIs(future_question.was_published_recently(), False)
```

我们创建了一个 [`django.test.TestCase`](https://docs.djangoproject.com/zh-hans/3.1/topics/testing/tools/#django.test.TestCase) 的子类，并添加了一个方法，此方法创建一个 `pub_date` 时未来某天的 `Question` 实例。然后检查它的 `was_published_recently()` 方法的返回值——它 *应该* 是 False。

### 运行测试

在终端中，我们通过输入以下代码运行测试:

```powershell
python manage.py test polls
```

发生了什么呢？以下是自动化测试的运行过程：

- `python manage.py test polls` 将会寻找 `polls` 应用里的测试代码
- 它找到了 [`django.test.TestCase`](https://docs.djangoproject.com/zh-hans/3.1/topics/testing/tools/#django.test.TestCase) 的一个子类
- 它创建一个特殊的数据库供测试使用
- 它在类中寻找测试方法——以 `test` 开头的方法。
- 在 `test_was_published_recently_with_future_question` 方法中，它创建了一个 `pub_date` 值为 30 天后的 `Question` 实例。
- 接着使用 `assertls()` 方法，发现 `was_published_recently()` 返回了 `True`，而我们期望它返回 `False`。

测试系统通知我们哪些测试样例失败了，和造成测试失败的代码所在的行号。

### 修复bug

我们早已知道，当 `pub_date` 为未来某天时， `Question.was_published_recently()` 应该返回 `False`。我们修改 `models.py` 里的方法，让它只在日期是过去式的时候才返回 `True`：

```python
def was_published_recently(self):
    now = timezone.now()
    return now - datetime.timedelta(days=1) <= self.pub_date <= now
```

然后重新运行测试:，发现正常了。

### 更全面的测试[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial05/#more-comprehensive-tests)

我们已经搞定一小部分了，现在可以考虑全面的测试 `was_published_recently()` 这个方法以确定它的安全性，然后就可以把这个方法稳定下来了。事实上，在修复一个 bug 时不小心引入另一个 bug 会是非常令人尴尬的。

我们在上次写的类里再增加两个测试，来更全面的测试这个方法：

```python
def test_was_published_recently_with_old_question(self):
    """
    was_published_recently() returns False for questions whose pub_date
    is older than 1 day.
    """
    time = timezone.now() - datetime.timedelta(days=1, seconds=1)
    old_question = Question(pub_date=time)
    self.assertIs(old_question.was_published_recently(), False)

def test_was_published_recently_with_recent_question(self):
    """
    was_published_recently() returns True for questions whose pub_date
    is within the last day.
    """
    time = timezone.now() - datetime.timedelta(hours=23, minutes=59, seconds=59)
    recent_question = Question(pub_date=time)
    self.assertIs(recent_question.was_published_recently(), True)
```

现在，我们有三个测试来确保 `Question.was_published_recently()` 方法对于过去，最近，和将来的三种情况都返回正确的值。

再次申明，尽管 `polls` 现在是个小型的应用，但是无论它以后变得到多么复杂，无论他和其他代码如何交互，我们可以在一定程度上保证我们为之编写测试的方法将按照预期的方式运行。



## 视图测试工具 Client

Django 提供了一个供测试使用的 [`Client`](https://docs.djangoproject.com/zh-hans/3.1/topics/testing/tools/#django.test.Client) 来模拟用户和视图层代码的交互。我们能在 `tests.py` 甚至是 [`shell`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-shell) 中使用它。

我们依照惯例从 [`shell`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-shell) 开始，首先我们要做一些在 `tests.py` 里不是必须的准备工作。第一步是在 [`shell`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-shell) 中配置测试环境:

```python
$ python manage.py shell
>>> from django.test.utils import setup_test_environment
>>> setup_test_environment()
```

**[`setup_test_environment()`](https://docs.djangoproject.com/zh-hans/3.1/topics/testing/advanced/#django.test.utils.setup_test_environment) 提供了一个模板渲染器**，允许我们**为 responses 添加一些额外的属性，例如 `response.context`，**未安装此 app 无法使用此功能。注意，**这个方法并 *不会* 配置测试数据库，所以接下来的代码将会在当前存在的数据库上运行**，输出的内容可能由于数据库内容的不同而不同。**如果你的 `settings.py` 中关于 `TIME_ZONE` 的设置不对，你可能无法获取到期望的结果**。如果你之前忘了设置，在继续之前检查一下。

然后我们需要导入 [`django.test.TestCase`](https://docs.djangoproject.com/zh-hans/3.1/topics/testing/tools/#django.test.TestCase) 类（在后续 `tests.py` 的实例中我们将会使用 [`django.test.TestCase`](https://docs.djangoproject.com/zh-hans/3.1/topics/testing/tools/#django.test.TestCase) 类，这个类里包含了自己的 client 实例，所以不需要这一步）:

```python
>>> from django.test import Client
>>> # create an instance of the client for our use
>>> client = Client()
```

搞定了之后，我们可以要求 client 为我们工作了:

```shell
>>> # get a response from '/'
>>> response = client.get('/')
Not Found: /
>>> # we should expect a 404 from that address; if you instead see an
>>> # "Invalid HTTP_HOST header" error and a 400 response, you probably
>>> # omitted the setup_test_environment() call described earlier.
>>> response.status_code
404
>>> # on the other hand we should expect to find something at '/polls/'
>>> # we'll use 'reverse()' rather than a hardcoded URL
>>> from django.urls import reverse
>>> response = client.get(reverse('polls:index'))
>>> response.status_code
200
>>> response.content
b'\n    <ul>\n    \n        <li><a href="/polls/1/">What&#x27;s up?</a></li>\n    \n    </ul>\n\n'
>>> response.context['latest_question_list']
<QuerySet [<Question: What's up?>]>
```

### 改善视图

现在的投票列表会显示将来的投票（ `pub_date` 值是未来的某天)。我们来修复这个问题。

在 [教程的第 4 部分](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial04/) 里，我们介绍了基于 [`ListView`](https://docs.djangoproject.com/zh-hans/3.1/ref/class-based-views/generic-display/#django.views.generic.list.ListView) 的视图类：

```python
class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by('-pub_date')[:5]
```

我们需要改进 `get_queryset()` 方法，让他它能通过将 Question 的 pub_data 属性与 `timezone.now()` 相比较来判断是否应该显示此 Question。首先我们需要一行 import 语句

```python
from django.utils import timezone
```

然后我们把 `get_queryset` 方法改写成下面这样：

```python
def get_queryset(self):
    """
    返回最近发布的五个问题（不包括计划在将来发布的问题）
    """
    return Question.objects.filter(
        pub_date__lte=timezone.now()
    ).order_by('-pub_date')[:5]
```

`Question.objects.filter(pub_date__lte=timezone.now())`返回包含`Question`s`pub_date`小于或等于-即早于-的的查询集`timezone.now`。

### 测试新视图

启动服务器、在浏览器中载入站点、创建一些发布时间在过去和将来的 `Questions` ，然后检验只有已经发布的 `Questions` 会展示出来，现在你可以对自己感到满意了。*你不想每次修改可能与这相关的代码时都重复这样做* —— 所以让我们基于以上 [`shell`](https://docs.djangoproject.com/zh-hans/3.1/ref/django-admin/#django-admin-shell) 会话中的内容，再编写一个测试。

将下面的代码添加到 `polls/tests.py` ：

民调/ tests.py中[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial05/#id7)

```
from django.urls import reverse
```

然后我们写一个公用的快捷函数用于创建投票问题，再为视图创建一个测试类：

民调/ tests.py中[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial05/#id8)

```python
def create_question(question_text, days):
    """
    Create a question with the given `question_text` and published the
    given number of `days` offset to now (negative for questions published
    in the past, positive for questions that have yet to be published).
    """
    time = timezone.now() + datetime.timedelta(days=days)
    return Question.objects.create(question_text=question_text, pub_date=time)


class QuestionIndexViewTests(TestCase):
    def test_no_questions(self):
        """
        没有创建任何投票，检查返回的网页上有没有 "No polls are available." 
        """
        response = self.client.get(reverse('polls:index'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No polls are available.")
        self.assertQuerysetEqual(response.context['latest_question_list'], [])

    def test_past_question(self):
        """
        创建了一个投票并检查它是否出现在列表中
        Questions with a pub_date in the past are displayed on the
        index page.
        """
        create_question(question_text="Past question.", days=-30)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_question_list'],
            ['<Question: Past question.>']
        )

    def test_future_question(self):
        """
        我们创建 pub_date 在未来某天的投票。数据库会在每次调用测试方法前被重置，
        所以第一个投票已经没了，所以主页中应该没有任何投票。
        Questions with a pub_date in the future aren't displayed on
        the index page.
        """
        create_question(question_text="Future question.", days=30)
        response = self.client.get(reverse('polls:index'))
        self.assertContains(response, "No polls are available.")
        self.assertQuerysetEqual(response.context['latest_question_list'], [])

    def test_future_question_and_past_question(self):
        """
        Even if both past and future questions exist, only past questions
        are displayed.
        """
        create_question(question_text="Past question.", days=-30)
        create_question(question_text="Future question.", days=30)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_question_list'],
            ['<Question: Past question.>']
        )

    def test_two_past_questions(self):
        """
        The questions index page may display multiple questions.
        """
        create_question(question_text="Past question 1.", days=-30)
        create_question(question_text="Past question 2.", days=-5)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_question_list'],
            ['<Question: Past question 2.>', '<Question: Past question 1.>']
        )
```

让我们更详细地看下以上这些内容。

首先是一个快捷函数 `create_question`，它封装了创建投票的流程，减少了重复代码。

`test_no_questions` 方法里没有创建任何投票，它检查返回的网页上有没有 "No polls are available." 这段消息和 `latest_question_list` 是否为空。注意到 [`django.test.TestCase`](https://docs.djangoproject.com/zh-hans/3.1/topics/testing/tools/#django.test.TestCase) 类提供了一些额外的 assertion 方法，在这个例子中，我们使用了 [`assertContains()`](https://docs.djangoproject.com/zh-hans/3.1/topics/testing/tools/#django.test.SimpleTestCase.assertContains) 和 [`assertQuerysetEqual()`](https://docs.djangoproject.com/zh-hans/3.1/topics/testing/tools/#django.test.TransactionTestCase.assertQuerysetEqual) 。

在 `test_past_question` 方法中，我们创建了一个投票并检查它是否出现在列表中。

在 `test_future_question` 中，我们创建 `pub_date` 在未来某天的投票。数据库会在每次调用测试方法前被重置，所以第一个投票已经没了，所以主页中应该没有任何投票。

剩下的那些也都差不多。实际上，测试就是假装一些管理员的输入，然后通过用户端的表现是否符合预期来判断新加入的改变是否破坏了原有的系统状态。

### 测试 `DetailView`[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial05/#testing-the-detailview)

我们的工作似乎已经很完美了？不，还有一个问题：就算在发布日期时未来的那些投票不会在目录页 *index* 里出现，但是如果用户知道或者猜到正确的 URL ，还是可以访问到它们。所以我们得在 `DetailView` 里增加一些约束：

```python
class DetailView(generic.DetailView):
    ...
    def get_queryset(self):
        """
        Excludes any questions that aren't published yet.
        """
        return Question.objects.filter(pub_date__lte=timezone.now())
```

然后，我们应该增加一些测试来检验 `pub_date` 在过去的 `Question` 能够被显示出来，而 `pub_date` 在未来的则不可以：

民调/ tests.py中[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial05/#id10)

```python
class QuestionDetailViewTests(TestCase):
    def test_future_question(self):
        """
        The detail view of a question with a pub_date in the future
        returns a 404 not found.
        """
        future_question = create_question(question_text='Future question.', days=5)
        url = reverse('polls:detail', args=(future_question.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_past_question(self):
        """
        The detail view of a question with a pub_date in the past
        displays the question's text.
        """
        past_question = create_question(question_text='Past Question.', days=-5)
        url = reverse('polls:detail', args=(past_question.id,))
        response = self.client.get(url)
        self.assertContains(response, past_question.question_text)
```

### 更多的测试思路[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial05/#ideas-for-more-tests)

我们应该给 `ResultsView` 也增加一个类似的 `get_queryset` 方法，并且为它创建测试。这和我们之前干的差不多，事实上，基本就是重复一遍。

我们还可以从各个方面改进投票应用，但是测试会一直伴随我们。比方说，在目录页上显示一个没有选项 `Choices` 的投票问题就没什么意义。我们可以检查并排除这样的投票题。测试可以创建一个没有选项的投票，然后检查它是否被显示在目录上。当然也要创建一个有选项的投票，然后确认它确实被显示了。

恩，也许你想让管理员能在目录上看见未被发布的那些投票，但是普通用户看不到。不管怎么说，如果你想要增加一个新功能，那么同时一定要为它编写测试。不过你是先写代码还是先写测试那就随你了。

## 静态文件

除了服务端生成的 HTML 以外，网络应用通常需要一些额外的文件——比如图片，脚本和样式表——来帮助渲染网络页面。在 Django 中，我们把这些文件统称为“静态文件”。

对于小项目来说，这个问题没什么大不了的，因为你可以把这些静态文件随便放在哪，只要服务程序能够找到它们就行。然而在大项目——特别是由好几个应用组成的大项目——中，处理不同应用所需要的静态文件的工作就显得有点麻烦了。

这就是 `django.contrib.staticfiles` 存在的意义：它将各个应用的静态文件（和一些你指明的目录里的文件）统一收集起来，这样一来，在生产环境中，这些文件就会集中在一个便于分发的地方。

### 创建static

首先，在你的 `polls` 目录下创建一个名为 `static` 的目录。Django 将在该目录下查找静态文件，这种方式和 Diango 在 `polls/templates/` 目录下查找 template 的方式类似。

**Django 的 [`STATICFILES_FINDERS`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-STATICFILES_FINDERS) 设置包含了一系列的查找器，它们知道去哪里找到 static 文件。**`AppDirectoriesFinder` 是默认查找器中的一个，它会在每个 [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/3.1/ref/settings/#std:setting-INSTALLED_APPS) 中指定的应用的子文件中寻找名称为 `static` 的特定文件夹，就像我们在 `polls` 中刚创建的那个一样。管理后台采用相同的目录结构管理它的静态文件。

**在你刚创建的 `static` 文件夹中创建一个名为 `polls` 的文件夹，再在 `polls` 文件夹中创建一个名为 `style.css` 的文件。**换句话说，你的样式表路径应是 `polls/static/polls/style.css`。因为 `AppDirectoriesFinder` 的存在，你可以在 Django 中以 `polls/style.css` 的形式引用此文件，类似你引用模板路径的方式。

> 虽然我们 *可以* 像管理模板文件一样，把 static 文件直接放入 `polls/static` （而不是创建另一个名为 `polls` 的子文件夹），不过这实际上是一个很蠢的做法。Django 只会使用第一个找到的静态文件。如果你在 *其它* 应用中有一个相同名字的静态文件，Django 将无法区分它们。我们需要指引 Django 选择正确的静态文件，而最好的方式就是把它们放入各自的 *命名空间* 。也就是把这些静态文件放入 *另一个* 与应用名相同的目录中。

写入样式

```css
li a {
    color: green;
}
```

在html文件的头部添加如下的内容

```html
{% load static %}

<link rel="stylesheet" type="text/css" href="{% static 'polls/style.css' %}">
```

`{% static %}` 模板标签会生成静态文件的绝对路径。

这就是你开发所需要做的所有事情了。

### 添加背景图

接着，我们会创建一个用于存在图像的目录。在 **`polls/static/polls` 目录下创建一个名为 `images` 的子目录**。在这个目录中，放一张名为 `background.gif` 的图片。换言之，在目录 `polls/static/polls/images/background.gif` 中放一张图片。

```css
body {
    background: white url("images/background.gif") no-repeat;
}
```

> `{% static %}` 模板标签在静态文件（例如样式表）中是不可用的，因为它们不是由 Django 生成的。你应该始终使用 **相对路径** 在你的静态文件之间相互引用，因为这样你可以更改 `STATIC_URL`（由 :ttag:`static` 模板标签使用来生成 URL），而无需修改大量的静态文件。



## 自定义后台表单

**通过 `admin.site.register(Question)` 注册 `Question` 模型**，Django 能够构建一个默认的表单用于展示。通常来说，你期望能**自定义表单的外观和工作方式**。你可以在注册模型时将这些设置告诉 Django。

让我们通过重排列表单上的字段来看看它是怎么工作的。用以下内容替换 `admin.site.register(Question)`：

polls/admin.py[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial07/#id1)

```python
from django.contrib import admin

from .models import Question


class QuestionAdmin(admin.ModelAdmin):
    fields = ['pub_date', 'question_text']

admin.site.register(Question, QuestionAdmin)
```

你需要遵循以下流程

- 创建一个模型后台类，接着将其作为第二个参数传给 `admin.site.register()` 
- 在你需要修改模型的后台管理选项时这么做。

以上修改使得 "Publication date" 字段显示在 "Question" 字段之前：

![image-20201114195201669](C:\Users\DAN\AppData\Roaming\Typora\typora-user-images\image-20201114195201669.png)

这在只有两个字段时显得没啥卵用，但对于拥有数十个字段的表单来说，为表单选择一个直观的排序方法就显得你的针很细了。

说到拥有数十个字段的表单，你可能更期望将表单分为几个字段集：

polls/admin.py[¶](https://docs.djangoproject.com/zh-hans/3.1/intro/tutorial07/#id2)

```python
from django.contrib import admin

from .models import Question


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date']}),
    ]

admin.site.register(Question, QuestionAdmin)
```

[`fieldsets`](https://docs.djangoproject.com/zh-hans/3.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.fieldsets) 元组中的第一个元素是字段集的标题。以下是我们的表单现在的样子：

![image-20201114195425533](C:\Users\DAN\AppData\Roaming\Typora\typora-user-images\image-20201114195425533.png)

好了，现在我们有了投票的后台页。不过，一个 `Question` 有多个 `Choice`，但后台页却没有显示多个选项。

有两个方法可以解决这个问题。

**第一个****就是仿照我们向后台注册 `Question` 一样注册 `Choice` ：**

```python
from django.contrib import admin

from .models import Choice, Question
# ...
admin.site.register(Choice)
```

![image-20201114195927857](C:\Users\DAN\AppData\Roaming\Typora\typora-user-images\image-20201114195927857.png)

同时也注意下 "Question" 旁边的“**添加**”按钮。每个使用 `ForeignKey` 关联到另一个对象的对象会自动获得这个功能。当你点击“添加”按钮时，你会见到一个包含“添加投票”的表单。如果你在这个弹出框中添加了一个投票，并点击了“保存”，Django 会将其保存至数据库，并动态地在你正在查看的“添加选项”表单中选中它。

不过，这是一种很低效地添加“选项”的方法。更好的办法是在你创建“投票”对象时直接添加好几个选项。让我们实现它。

移除调用 `register()` 注册 `Choice` 模型的代码。随后，像这样修改 `Question` 的注册代码：

```python
from django.contrib import admin

from .models import Choice, Question


class ChoiceInline(admin.StackedInline):
    model = Choice
    extra = 3


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline]

admin.site.register(Question, QuestionAdmin)
```

这会告诉 Django：“`Choice` 对象要在 `Question` 后台页面编辑。默认提供 3 个足够的选项字段。”

它看起来像这样：有三个关联的选项插槽——由 `extra` 定义，且每次你返回任意已创建的对象的“修改”页面时，你会见到三个新的插槽。

在三个插槽的末端，你会看到一个“添加新选项”的按钮。如果你单击它，一个新的插槽会被添加。如果你想移除已有的插槽，可以点击插槽右上角的X。注意，你不能移除原始的 3 个插槽。以下图片展示了一个已添加的插槽：

![image-20201114200317657](C:\Users\DAN\AppData\Roaming\Typora\typora-user-images\image-20201114200317657.png)

不过，仍然有点小问题。它占据了大量的屏幕区域来显示所有关联的 `Choice` 对象的字段。对于这个问题，Django 提供了一种表格式的单行显示关联对象的方法。要使用它，只需按如下形式修改 `ChoiceInline` 申明：

```
class ChoiceInline(admin.TabularInline):
    #...
```



![image-20201114200501815](C:\Users\DAN\AppData\Roaming\Typora\typora-user-images\image-20201114200501815.png)

请注意，还有一个额外的“DELETE?” 列，该列允许删除使用“添加其他选择”按钮添加的行以及已保存的行。

### 自定义管理员更改列表[¶](https://docs.djangoproject.com/en/3.1/intro/tutorial07/#customize-the-admin-change-list)

现在问题管理页面看起来不错，让我们对“更改列表（change list）”页面进行一些调整，该页面显示了系统中的所有问题。

这是现在的样子：

![image-20201114200644477](C:\Users\DAN\AppData\Roaming\Typora\typora-user-images\image-20201114200644477.png)

默认情况下，Django显示`str()`每个对象的。但是有时候，如果我们可以**显示单个字段**，那会更有帮助。为此，请使用 [`list_display`](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_display)admin选项，它是字段名称的元组，以列的形式在对象的更改列表页面上显示：

```python
class QuestionAdmin(admin.ModelAdmin):
    # ...
    list_display = ('question_text', 'pub_date')
```

为了达到良好的效果，我们还包括了[教程2中](https://docs.djangoproject.com/en/3.1/intro/tutorial02/)的`was_published_recently()`方法：

民调/ admin.py中[¶](https://docs.djangoproject.com/en/3.1/intro/tutorial07/#id7)

```python
class QuestionAdmin(admin.ModelAdmin):
    # ...
    list_display = ('question_text', 'pub_date', 'was_published_recently')
```

![image-20201114200830789](C:\Users\DAN\AppData\Roaming\Typora\typora-user-images\image-20201114200830789.png)

您可以单击列标题以这些值进行排序-标题除外`was_published_recently`，因为不支持按任意方法的输出进行排序。还要注意，`was_published_recently`默认情况下，for的列标题 是方法的名称（下划线用空格替换），并且每一行都包含输出的字符串表示形式。

您可以通过为该方法（中的`polls/models.py`）提供一些属性来改进它，如下所示：

```python
class Question(models.Model):
    # ...
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now
    was_published_recently.admin_order_field = 'pub_date'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published recently?'
```

有关这些**方法属性的更多信息，请参见 [`list_display`](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_display)。**

`polls/admin.py`再次编辑文件，并在`Question`更改列表页面中添加一个改进 ：使用进行过滤 [`list_filter`](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_filter)。将以下行添加到 `QuestionAdmin`：

```
list_filter = ['pub_date']
```

这会添加一个“过滤器”侧栏，使人们可以按`pub_date`字段过滤更改列表 ：

![image-20201114201101865](C:\Users\DAN\AppData\Roaming\Typora\typora-user-images\image-20201114201101865.png)

显示的过滤器类型取决于您要过滤的字段的类型。因为`pub_date`是[`DateTimeField`](https://docs.djangoproject.com/en/3.1/ref/models/fields/#django.db.models.DateTimeField)，Django知道提供适当的过滤器选项：“任何日期”，“今天”，“过去7天”，“本月”，“今年”。

这很好。让我们添加一些搜索功能：

```
search_fields = ['question_text']
```

![image-20201114201155551](C:\Users\DAN\AppData\Roaming\Typora\typora-user-images\image-20201114201155551.png)

这将在更改列表的顶部添加一个搜索框。当有人输入搜索词时，Django将搜索该`question_text`字段。您可以根据需要使用任意多个字段-尽管由于它`LIKE`在后台使用查询，所以将搜索字段的数量限制为合理的数量将使数据库更容易进行搜索。

现在也是注意更改列表为您提供免费分页的好时机。默认设置是每页显示100个项目。查看下面几个文档. [`Change list pagination`](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_per_page), [`search boxes`](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.search_fields), [`filters`](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_filter), [`date-hierarchies`](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.date_hierarchy), and [`column-header-ordering`](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_display)

## 自定义管理员的外观[¶](https://docs.djangoproject.com/en/3.1/intro/tutorial07/#customize-the-admin-look-and-feel)

显然，在每个管理页面的顶部都具有“ Django管理”是荒谬的。这只是占位文本。您可以使用Django的模板系统进行更改。Django管理员由Django本身提供支持，其界面使用Django自己的模板系统。

### 自定义*项目*模板[¶](https://docs.djangoproject.com/en/3.1/intro/tutorial07/#customizing-your-project-s-templates)

`templates`在您的项目目录中创建一个目录（包含的目录`manage.py`）。模板可以存放在Django可以访问的文件系统上的任何位置。（Django以服务器运行的任何用户身份运行。）但是，将模板保留在项目中是一个很好的习惯。

打开设置文件（`mysite/settings.py`，请记住），然后[`DIRS`](https://docs.djangoproject.com/en/3.1/ref/settings/#std:setting-TEMPLATES-DIRS)在[`TEMPLATES`](https://docs.djangoproject.com/en/3.1/ref/settings/#std:setting-TEMPLATES)设置中添加一个 选项：

mysite/的settings.py [¶](https://docs.djangoproject.com/en/3.1/intro/tutorial07/#id9)

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

[`DIRS`](https://docs.djangoproject.com/en/3.1/ref/settings/#std:setting-TEMPLATES-DIRS)是加载Django模板时要检查的文件系统目录的列表；这是一个搜索路径。

> 就像静态文件一样，我们*可以*将所有模板放在一起，放在一个大的模板目录中，并且可以很好地工作。但是，属于特定应用程序的模板应放置在该应用程序的模板目录（例如`polls/templates`）中，而不是项目的（`templates`）中。我们将在[可重用应用程序教程中](https://docs.djangoproject.com/en/3.1/intro/reusable-apps/) 详细讨论 *为什么*要这样做。

现在在`templates`里创建一个名为`admin`的目录，并将模板`admin/base_site.html`从Django本身（`django/contrib/admin/templates`）的源代码中的默认Django管理模板目录中复制到该目录中。

> **Django源文件在哪里？**
>
> 如果难以找到Django源文件在系统上的位置，请运行以下命令：
>
> ```python
> $ python -c "import django; print(django.__path__)"
> ```

然后，编辑文件，并根据需要用您自己的站点名称替换 （包括花括号）。您应该以如下代码结尾：`{{ site_header|default:_('Django administration') }}`