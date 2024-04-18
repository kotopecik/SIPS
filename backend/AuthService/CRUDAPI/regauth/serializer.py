import pprint

from rest_framework import serializers
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

        # Валидация пароля
        if len(password) < 8:
            raise serializers.ValidationError("Пароль должен быть длиной не менее 8 символов.")
        special_chars = "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/~"
        if not any(char in special_chars for char in password):
            raise serializers.ValidationError("Пароль должен содержать хотя бы один специальный символ")

        if not any(char.isupper() for char in password):
            raise serializers.ValidationError("Пароль должен содержать хотя бы одну заглавную букву")

        if not any(char.islower() for char in password):
            raise serializers.ValidationError("Пароль должен содержать хотя бы одну строчную букву")

        if not any(char.isdigit() for char in password):
            raise serializers.ValidationError("Пароль должен содержать хотя бы одну цифру")

        raise serializers.ValidationError("Пароль валиден")

        user = UserModel(**validate_data)  # распаковывает словарь и передает значение как именованные аргументы в
        # конструктор класса User
        user.set_password(password)  # метод класса User set_password устанавливает пароль пользователя
        user.save()
        return user


