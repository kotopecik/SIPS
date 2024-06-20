from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime


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
