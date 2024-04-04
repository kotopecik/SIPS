from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Todo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

        def create(self, validate_data):
            password = validate_data.pop("password")  # pop удаляет из словаря и возвращает значение элемента
            user = User(**validate_data) # ** распаковывает словарь и передает значение как именованные аргументы в конструктор класса User
            user.set_password(password) # метод класса User set_password устанавливает пароль пользователя
            user.save()
            return {
                "msg": "User successfully created.",
                "username": user.username,
                "email": user.email
            }

        #3
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"
