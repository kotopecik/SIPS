from rest_framework import serializers
from .models import UserModel
from rest_framework.validators import UniqueValidator


class PasswordValidator:
    def __call__(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Пароль должен быть длиной не менее 8 символов.")
        special_chars = "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/~"
        if not any(char in special_chars for char in value):
            raise serializers.ValidationError("Пароль должен содержать хотя бы один специальный символ")
        if not any(char.isupper() for char in value):
            raise serializers.ValidationError("Пароль должен содержать хотя бы одну заглавную букву")
        if not any(char.islower() for char in value):
            raise serializers.ValidationError("Пароль должен содержать хотя бы одну строчную букву")
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError("Пароль должен содержать хотя бы одну цифру")


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    middle_name = serializers.CharField(max_length=150)
    organization = serializers.CharField(max_length=150)
    email = serializers.EmailField(validators=[UniqueValidator(queryset=UserModel.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[PasswordValidator()])

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'middle_name', 'organization')

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = UserModel(**validated_data)
        user.set_password(password)
        user.save()
        return user
