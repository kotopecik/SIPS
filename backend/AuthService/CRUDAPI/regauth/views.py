from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializer import UserSerializer, TodoSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly # класс AllowAny представляет разрешение, которое позволяет неаутентифицированным пользователям выполнять запросы
from .models import Todo


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all() # мы хотим получить все объекты модели User из бд
    serializer_class = UserSerializer
    permission_classes =(AllowAny, ) # любой юзер аут\нотаут может выполнять запросы

  #3
class TodosListCreateView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

  #3
class TodosRetrievUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )