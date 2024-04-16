from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime


class Todo(models.Model):
    name = models.CharField(max_length=100, null=False)
    description = models.TextField(max_length=400, null=False)
    completed = models.BooleanField(default=False)
    date = models.DateTimeField(default=datetime.utcnow)

    def __str__(self) -> models.CharField:
        return self.name


class UserModel(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    middle_name = models.CharField(max_length=150)
    organization = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150)

    class Meta:
        db_table = "auth_user"
