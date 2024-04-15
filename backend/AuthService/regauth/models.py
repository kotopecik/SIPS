from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractUser, Group, Permission


# 3
class Todo(models.Model):
    name = models.CharField(max_length=100, null=False)
    description = models.TextField(max_length=400, null=False)
    completed = models.BooleanField(default=False)
    date = models.DateTimeField(default=datetime.utcnow)

    def __str__(self) -> str:
        return self.name

class UserReg(AbstractUser):
    first_name = models.CharField(max_length=255)
    second_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255, blank=True)
    organization = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups'),
        blank=True,
        related_name='user_reg_set',
        related_query_name='user_reg',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=('user permissions'),
        blank=True,
        related_name='user_reg_set',
        related_query_name='user_reg',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []