from django.db import models

# Create your models here.


class UserInfo(models.Model):
    user_type_choices = (
        (1, '普通公户'),
        (2, 'VIP'),
        (3, 'SVIP')

    )
    user_type = models.ImageField(choices=user_type_choices)
    username = models.CharField(max_length=32)
    password = models.CharField(max_length=13)


class UserToken(models.Model):
    user = models.OneToOneField(to='UserInfo')
    token = models.CharField(max_length=64)
