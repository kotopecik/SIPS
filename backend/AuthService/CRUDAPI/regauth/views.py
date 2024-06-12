from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializer import UserSerializer
from .models import UserModel
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated


class UserCreate(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )


class UserDetail(generics.RetrieveAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        # Возвращаем текущего авторизованного пользователя
        return self.request.user
