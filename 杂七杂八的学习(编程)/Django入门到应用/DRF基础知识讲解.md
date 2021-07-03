## 新建工程

首先新建名为tutorial的工程

```shell
django-admin startproject tutorial 
```

然后在该工程中启动一个名为quickstart的app

```
django-admin startapp quickstart
```

第一次构建

```
python manage.py migrate
```

新建管理员用户，名为admin，密码是password123

```
python manage.py createsuperuser --email admin@example.com --username admin
```

## 序列化器

首先，我们将定义一些序列化器。让我们创建一个名为的新模块`tutorial/quickstart/serializers.py`，该模块将用于数据表示。

```python
from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
```

请注意，在这种情况下，我们使用的超链接关系`HyperlinkedModelSerializer`。您也可以使用主键和各种其他关系，但是超链接是一种很好的RESTful设计。

## 视图

然后我们可以在view里面写视图了

```python
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from tutorial.quickstart.serializers import UserSerializer, GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
```



我们将所有常见行为分组，称为类`ViewSets`，而不是编写多个视图

## URLS

好的，现在让我们连接API URL。继续`tutorial/urls.py`...

```python
from django.urls import include, path
from rest_framework import routers
from tutorial.quickstart import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
```

因为我们使用的是视图集而不是视图，所以我们只需为路由器类注册视图集即可自动为我们的API生成URL conf。

同样，如果我们需要对API URL的更多控制，我们可以简单地使用常规的基于类的视图，并显式地编写URL conf。

最后，我们包括用于可浏览API的默认登录和注销视图。这是可选的，但在您的API需要身份验证并且您想使用可浏览的API时很有用。

## [分页](https://www.django-rest-framework.org/tutorial/quickstart/#pagination)

分页允许您控制每页返回多少个对象。要启用它，请将以下行添加到`tutorial/settings.py`

```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}
```

## [设定值](https://www.django-rest-framework.org/tutorial/quickstart/#settings)

添加`'rest_framework'`到`INSTALLED_APPS`。设置模块将位于`tutorial/settings.py`

```
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```