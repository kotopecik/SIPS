import pprint

from rest_framework import serializers
from .models import Todo
from .models import UserModel


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    middle_name = serializers.CharField(max_length=150)
    organization = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, required=True)  # Добавлен атрибут required=True

    class Meta:
        model = UserModel
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'middle_name', 'organization')

    def create(self, validate_data):
        password = validate_data.pop("password")  # pop удаляет из словаря и возвращает значение элемента
        user = UserModel(**validate_data)  # распаковывает словарь и передает значение как именованные аргументы в конструктор класса User
        user.set_password(password)  # метод класса User set_password устанавливает пароль пользователя
        user.save()
        return user


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"


