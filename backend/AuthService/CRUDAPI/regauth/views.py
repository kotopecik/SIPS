from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializer import UserSerializer
from .models import UserModel
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly


class UserCreate(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


