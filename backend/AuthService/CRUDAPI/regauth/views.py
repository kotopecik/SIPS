from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializer import UserSerializer, TodoSerializer
from .models import UserModel
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .models import Todo


class UserCreate(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class TodosListCreateView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class TodosRetrievUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

